<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-2xl">🌴</span>
          <div>
            <div class="font-bold text-lg leading-tight">双休企业名录</div>
            <div class="text-xs text-slate-500 leading-tight">双休是老百姓的基本权利</div>
          </div>
        </RouterLink>
        <nav class="flex items-center gap-4 text-sm">
          <RouterLink to="/" class="hover:text-emerald-600 transition-colors">企业查询</RouterLink>
          <RouterLink to="/contribute" class="hover:text-emerald-600 transition-colors">提交数据</RouterLink>
          <a
            href="https://github.com/luomor/two-day-weekend-companies"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1 rounded-lg bg-slate-900 text-white px-3 py-1.5 hover:bg-slate-700 transition-colors"
          >
            <svg viewBox="0 0 16 16" class="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <RouterView />
    </main>

    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>数据由社区共同维护，仅供参考 · 如有错误欢迎提交 PR 修正</p>
        <p>
          <a
            href="https://github.com/luomor/two-day-weekend-companies/blob/main/LICENSE"
            target="_blank"
            rel="noopener"
            class="hover:text-emerald-600"
          >MIT License</a>
        </p>
      </div>
    </footer>
  </div>
</template>
