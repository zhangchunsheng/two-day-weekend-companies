<script setup>
import { computed, ref } from 'vue'
import { companies, provinces, citiesOf } from '../lib/data.js'

const keyword = ref('')
const province = ref('')
const city = ref('')

const cities = computed(() => citiesOf(province.value))

function onProvinceChange() {
  city.value = ''
}

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return companies.filter((c) => {
    if (province.value && c.province !== province.value) return false
    if (city.value && c.city !== city.value) return false
    if (!kw) return true
    return [c.name, c.industry, c.schedule, c.note, c.province, c.city]
      .some((field) => field.toLowerCase().includes(kw))
  })
})

const stats = computed(() => ({
  companies: companies.length,
  provinces: new Set(companies.map((c) => c.province)).size,
  cities: new Set(companies.map((c) => `${c.province}/${c.city}`)).size,
}))
</script>

<template>
  <!-- 顶部标语 -->
  <section class="bg-gradient-to-b from-emerald-600 to-emerald-500 text-white">
    <div class="max-w-6xl mx-auto px-4 py-14 text-center">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-wide">双休是老百姓的基本权利</h1>
      <p class="mt-4 text-emerald-100 max-w-2xl mx-auto">
        这里收录由社区共同维护的支持双休的企业名单。用脚投票，选择尊重劳动者的企业。
      </p>
      <div class="mt-8 flex justify-center gap-8 text-center">
        <div>
          <div class="text-3xl font-bold">{{ stats.companies }}</div>
          <div class="text-emerald-100 text-sm mt-1">收录企业</div>
        </div>
        <div>
          <div class="text-3xl font-bold">{{ stats.provinces }}</div>
          <div class="text-emerald-100 text-sm mt-1">覆盖省份</div>
        </div>
        <div>
          <div class="text-3xl font-bold">{{ stats.cities }}</div>
          <div class="text-emerald-100 text-sm mt-1">覆盖城市</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 查询区 -->
  <section class="max-w-6xl mx-auto px-4 -mt-8">
    <div class="bg-white rounded-2xl shadow-lg shadow-slate-200/60 p-4 sm:p-6">
      <div class="grid gap-3 sm:grid-cols-[1fr_180px_180px]">
        <input
          v-model="keyword"
          type="search"
          placeholder="搜索企业名称、行业、备注……"
          class="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <select
          v-model="province"
          @change="onProvinceChange"
          class="rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">全部省份</option>
          <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
        </select>
        <select
          v-model="city"
          class="rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">全部城市</option>
          <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>
  </section>

  <!-- 结果列表 -->
  <section class="max-w-6xl mx-auto px-4 py-8">
    <p class="text-sm text-slate-500 mb-4">
      共 {{ filtered.length }} 家企业
      <template v-if="filtered.length !== companies.length">（已按条件筛选，全库 {{ companies.length }} 家）</template>
    </p>

    <div v-if="filtered.length === 0" class="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
      <p class="text-lg">没有找到符合条件的企业</p>
      <p class="mt-2 text-sm">
        知道符合条件的双休企业？
        <RouterLink to="/contribute" class="text-emerald-600 hover:underline">提交一条数据</RouterLink>
        帮大家一起避坑。
      </p>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="c in filtered"
        :key="`${c._file}#${c.name}`"
        class="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-emerald-300 transition-all"
      >
        <div class="flex items-start justify-between gap-2">
          <h2 class="font-bold text-lg leading-snug">{{ c.name }}</h2>
          <span class="shrink-0 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1">
            {{ c.schedule || '双休' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-slate-500">{{ c.province }} · {{ c.city }}<template v-if="c.industry"> · {{ c.industry }}</template></p>
        <p v-if="c.note" class="mt-3 text-sm text-slate-600 leading-relaxed">{{ c.note }}</p>
        <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
          <a
            v-if="c.source"
            :href="c.source"
            target="_blank"
            rel="noopener"
            class="text-emerald-600 hover:underline truncate max-w-[70%]"
          >信息来源 ↗</a>
          <span v-else></span>
          <a
            :href="`https://github.com/zhangchunsheng/two-day-weekend-companies/edit/main/${c._file}`"
            target="_blank"
            rel="noopener"
            class="hover:text-slate-600"
            title="在 GitHub 上编辑这条数据"
          >纠错 ✎</a>
        </div>
      </article>
    </div>
  </section>
</template>
