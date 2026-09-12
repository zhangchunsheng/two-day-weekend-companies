/**
 * 双休企业数据加载与解析。
 *
 * 数据存放在 data/<省份>/<城市>.md，构建时通过 Vite 的 import.meta.glob 全部打包进来，
 * 无需后端。每个文件的格式见 README「数据格式」一节。
 */

// 解析 markdown 顶部的 YAML frontmatter（仅支持简单的 key: value）
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { meta: {}, body: text }
  const meta = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([^:#]+?)\s*[:：]\s*(.*)$/)
    if (kv) meta[kv[1].trim()] = kv[2].trim()
  }
  return { meta, body: text.slice(match[0].length) }
}

// 解析正文：每个 `## 企业名称` 一节，下面用 `- 字段：值` 描述
function parseCompanies(body, meta, file) {
  const companies = []
  let current = null

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim()
    const heading = line.match(/^##\s+(.+)$/)
    if (heading) {
      if (current) companies.push(current)
      current = {
        name: heading[1].trim(),
        province: meta.province || '',
        city: meta.city || '',
        industry: '',
        schedule: '',
        source: '',
        note: '',
        _file: file,
      }
      continue
    }
    const item = line.match(/^[-*]\s*([^:：]+?)\s*[:：]\s*(.*)$/)
    if (item && current) {
      const key = item[1].trim()
      const value = item[2].trim()
      if (key === '行业') current.industry = value
      else if (key === '制度') current.schedule = value
      else if (key === '来源') current.source = value
      else if (key === '备注') current.note = value
    }
  }
  if (current) companies.push(current)
  return companies
}

const files = import.meta.glob('../../data/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const companies = Object.entries(files).flatMap(([path, raw]) => {
  const { meta, body } = parseFrontmatter(raw)
  return parseCompanies(body, meta, path.replace(/^.*\/data\//, 'data/'))
})

export const provinces = [...new Set(companies.map((c) => c.province))].sort()

export function citiesOf(province) {
  return [
    ...new Set(
      companies.filter((c) => !province || c.province === province).map((c) => c.city),
    ),
  ].sort()
}
