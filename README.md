# 双休购，双休企业名录（Two-Day Weekend Companies）

> 双休是老百姓的基本权利。

一个采集和展示支持双休的企业的开源网站

- 数据全部由社区通过 Markdown 文件共同维护，**没有后端**
- 支持按**省份、城市、企业名称、行业、备注**查询
- 通过 GitHub Actions 自动构建并部署到 GitHub Pages

## 技术栈

- Vue 3 + Vite
- Tailwind CSS 4
- 数据：Markdown 文件（构建时打包，无运行时请求）
- 部署：GitHub Pages（`.github/workflows/deploy.yml`）

## 本地开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 构建到 dist/
npm run preview  # 预览构建产物
```

## 数据格式与贡献方式

每个城市一个 Markdown 文件，路径为 `data/<省份>/<城市>.md`，例如 `data/浙江省/杭州市.md`：

```markdown
---
province: 浙江省
city: 杭州市
updated: 2026-09-01
---

## 某科技有限公司
- 行业：互联网 / 软件
- 制度：标准双休
- 来源：https://example.com/信息出处
- 备注：可补充工作时间、是否加班文化等说明
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| frontmatter `province` / `city` | 必填，用于省市筛选 |
| `## 企业名称` | 每家企业一个二级标题 |
| `行业` | 便于检索 |
| `制度` | 如「标准双休」「双休 + 弹性工作」 |
| `来源` | 可查证链接（招聘公告、官网、公开报道等），强烈建议填写 |
| `备注` | 补充说明，可留空 |

**归档规则**：明确了省市的企业写入对应城市的文件；未注明城市（如全国性企业）写入 `data/company.md`。同一家企业只保留一个条目——已写入城市文件的不要在 `company.md` 重复收录，多城市经营的企业以总部所在城市为准，其他城市在「备注」中说明。

**贡献流程**：Fork 仓库 → 新增/编辑 `data/` 下的 Markdown 文件 → 提 Pull Request。合并后 GitHub Actions 会自动部署更新。也可以直接在网页端点击「提交数据」页里的按钮在 GitHub 上新建文件。

> ⚠️ 请确保信息来自公开渠道并附来源链接。本站内容仅供参考，不构成对任何企业的评价或指控；如有失实信息，欢迎提交 PR 或 Issue 修正。

## 部署到 GitHub Pages

1. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**（工作流中的 `enablement: true` 也可自动启用）
2. 推送到 `main` 分支，工作流会自动构建并部署
3. 默认使用自定义域名 `tdwc.luomor.com`（见 `public/CNAME`），构建 base 为 `/`

如果改用 `<用户名>.github.io/<仓库名>` 访问：删除 `public/CNAME`，并把工作流里的 `VITE_BASE` 改为 `/${{ github.event.repository.name }}/`。

## License

[MIT](LICENSE)
