# 双休企业名录（Two-Day Weekend Companies）

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

**贡献流程**：Fork 仓库 → 新增/编辑 `data/` 下的 Markdown 文件 → 提 Pull Request。合并后 GitHub Actions 会自动部署更新。也可以直接在网页端点击「提交数据」页里的按钮在 GitHub 上新建文件。

> ⚠️ 请确保信息来自公开渠道并附来源链接。本站内容仅供参考，不构成对任何企业的评价或指控；如有失实信息，欢迎提交 PR 或 Issue 修正。

## 部署到 GitHub Pages

1. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
2. 推送到 `main` 分支，工作流会自动构建并部署
3. 站点地址为 `https://<用户名>.github.io/<仓库名>/`

如果你的仓库名不同，无需修改任何配置——工作流会自动使用仓库名作为 base 路径。

## License

[MIT](LICENSE)
