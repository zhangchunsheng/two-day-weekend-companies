/**
 * 双休企业数据加载。
 *
 * 数据存放在 data/<省份>/<城市>.md（无城市归属的全国性企业在 data/company.md），
 * 构建时通过 Vite 的 import.meta.glob 全部打包进来，无需后端。
 */
import { parseFrontmatter, parseCompanies } from './parser.js'

const files = import.meta.glob('../../data/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const locations = []
export const companies = Object.entries(files).flatMap(([path, raw]) => {
  const { meta, body } = parseFrontmatter(raw)
  if (meta.province && meta.city) {
    locations.push({ province: meta.province, city: meta.city })
  }
  return parseCompanies(body, meta, path.replace(/^.*\/data\//, 'data/'))
})

// 省市列表来自所有数据文件（包括还没有收录企业的城市）
export const provinces = [...new Set(locations.map((l) => l.province))].sort()

export function citiesOf(province) {
  return [
    ...new Set(
      locations.filter((l) => !province || l.province === province).map((l) => l.city),
    ),
  ].sort()
}
