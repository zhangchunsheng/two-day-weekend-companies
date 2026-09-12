import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { parseFrontmatter, parseCompanies } from './src/lib/parser.js'

const SITE_URL = 'https://tdwc.luomor.com'

function loadCompanies() {
  const files = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry)
      if (statSync(p).isDirectory()) walk(p)
      else if (entry.endsWith('.md')) files.push(p)
    }
  }
  walk(new URL('./data', import.meta.url).pathname)
  return files.flatMap((f) => {
    const raw = readFileSync(f, 'utf8')
    const { meta, body } = parseFrontmatter(raw)
    return parseCompanies(body, meta, f)
  })
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * SEO 预渲染：把企业名录以静态 HTML 注入 #app（Vue 挂载后替换），
 * 并在 <head> 注入 ItemList 结构化数据，保证无 JS 的爬虫也能读到全部内容。
 */
function seoPrerender() {
  return {
    name: 'seo-prerender',
    transformIndexHtml(html) {
      const companies = loadCompanies()
      if (companies.length === 0) return html

      // 按省市分组生成静态名录
      const groups = new Map()
      for (const c of companies) {
        const key = c.province && c.city ? `${c.province} · ${c.city}` : '全国性企业'
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key).push(c)
      }
      const listHtml = [...groups.entries()]
        .map(
          ([location, items]) => `
    <section>
      <h2 style="font-size:18px;font-weight:700;margin:16px 0 8px">${escapeHtml(location)}</h2>
      <ul style="list-style:disc;padding-left:24px">
        ${items
          .map(
            (c) =>
              `<li style="margin:4px 0"><strong>${escapeHtml(c.name)}</strong>（${escapeHtml(c.schedule || '双休')}）${c.industry ? ` — ${escapeHtml(c.industry)}` : ''}${c.note ? `：${escapeHtml(c.note)}` : ''}</li>`,
          )
          .join('\n        ')}
      </ul>
    </section>`,
        )
        .join('')

      const prerender = `
  <main style="max-width:720px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;color:#1e293b">
    <h1 style="font-size:24px;font-weight:800">双休企业名录</h1>
    <p style="margin:8px 0 16px;color:#475569">双休是老百姓的基本权利。本名录由社区共同维护，收录支持双休的企业，可按省份、城市、企业名称查询。共收录 ${companies.length} 家企业。</p>
    ${listHtml}
  </main>`

      const itemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: '双休企业名录',
        description: '支持双休的企业名单，由社区共同维护',
        url: SITE_URL,
        numberOfItems: companies.length,
        itemListElement: companies.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Organization',
            name: c.name,
            ...(c.industry ? { description: `${c.industry}，${c.schedule || '双休'}` } : {}),
            ...(c.province && c.city
              ? { address: { '@type': 'PostalAddress', addressRegion: c.province, addressLocality: c.city } }
              : {}),
          },
        })),
      }

      return html
        .replace('<div id="app"></div>', `<div id="app">${prerender}</div>`)
        .replace(
          '</head>',
          `    <script type="application/ld+json">${JSON.stringify(itemList)}</script>\n  </head>`,
        )
    },
  }
}

// 自定义域名部署在根路径；若改用 <用户名>.github.io/<仓库名> 则传入 VITE_BASE=/<仓库名>/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [vue(), tailwindcss(), seoPrerender()],
})
