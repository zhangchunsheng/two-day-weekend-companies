import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ContributeView from './views/ContributeView.vue'
import './style.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/contribute', name: 'contribute', component: ContributeView },
    // 兜底：未匹配的路径（如 Google AdSense 广告的 #/google_vignette 锚点）回到首页，避免空白页
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

createApp(App).use(router).mount('#app')
