<script setup>
const template = `---
province: 浙江省
city: 杭州市
updated: 2026-09-01
---

## 示例科技有限公司
- 行业：互联网 / 软件
- 制度：标准双休
- 来源：https://example.com/信息出处
- 备注：可补充工作时间、是否加班文化等说明

## 另一家企业
- 行业：制造业
- 制度：标准双休
- 来源：
- 备注：
`
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold">提交双休企业数据</h1>
    <p class="mt-3 text-slate-600 leading-relaxed">
      本站不设后端，所有数据都是仓库里的 Markdown 文件。你只需要会写 Markdown，就能通过 GitHub Pull Request 贡献数据。
    </p>

    <ol class="mt-8 space-y-6">
      <li class="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 class="font-bold text-lg">第一步：找到或新建城市文件</h2>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">
          每个城市对应一个 Markdown 文件，路径为
          <code class="bg-slate-100 rounded px-1.5 py-0.5 text-emerald-700">data/&lt;省份&gt;/&lt;城市&gt;.md</code>。
          例如杭州的企业都在 <code class="bg-slate-100 rounded px-1.5 py-0.5 text-emerald-700">data/浙江省/杭州市.md</code>。
          如果你的城市还没有文件，新建一个即可。
        </p>
        <a
          href="https://github.com/luomor/two-day-weekend-companies/new/main/data"
          target="_blank"
          rel="noopener"
          class="inline-block mt-3 rounded-lg bg-emerald-600 text-white text-sm px-4 py-2 hover:bg-emerald-700 transition-colors"
        >在 GitHub 上新建文件 ↗</a>
      </li>

      <li class="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 class="font-bold text-lg">第二步：按格式填写</h2>
        <p class="mt-2 text-sm text-slate-600">
          文件开头用 frontmatter 标明省市，然后每家企业一个 <code class="bg-slate-100 rounded px-1.5 py-0.5 text-emerald-700">## 企业名称</code> 小节：
        </p>
        <pre class="mt-3 bg-slate-900 text-slate-100 text-sm rounded-xl p-4 overflow-x-auto leading-relaxed">{{ template }}</pre>
        <ul class="mt-3 text-sm text-slate-600 list-disc list-inside space-y-1">
          <li><b>行业</b>：企业所属行业，便于检索</li>
          <li><b>制度</b>：如「标准双休」「双休 + 弹性工作」等</li>
          <li><b>来源</b>：招聘信息、官网、员工评价等可查证链接（强烈建议填写）</li>
          <li><b>备注</b>：补充说明，可留空</li>
        </ul>
      </li>

      <li class="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 class="font-bold text-lg">第三步：提交 Pull Request</h2>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">
          提交后 GitHub 会自动引导你创建 PR。合并后 GitHub Actions 会自动重新构建并部署网站，几分钟后即可在页面上看到你的数据。
        </p>
      </li>
    </ol>

    <div class="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 leading-relaxed">
      <b>🙏 提交前请确认：</b>信息尽量来自公开渠道（招聘公告、企业官网、公开报道等），并附来源链接。
      本站内容仅供参考，不构成对任何企业的评价或指控；如有失实信息，欢迎提交 PR 或 Issue 修正。
    </div>
  </div>
</template>
