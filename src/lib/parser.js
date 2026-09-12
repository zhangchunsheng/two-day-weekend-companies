/**
 * 双休企业 Markdown 解析（纯函数，浏览器与 Node 构建脚本共用）。
 * 数据格式见 README「数据格式」一节。
 */

// 解析 markdown 顶部的 YAML frontmatter（仅支持简单的 key: value）
export function parseFrontmatter(text) {
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
export function parseCompanies(body, meta, file) {
  // 先剔除 HTML 注释（空模板里的填写示例写在注释中，不应被解析）
  const content = body.replace(/<!--[\s\S]*?-->/g, '')
  const companies = []
  let current = null

  for (const rawLine of content.split(/\r?\n/)) {
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
