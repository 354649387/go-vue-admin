import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import {createRouter,createWebHashHistory} from 'vue-router'
import routes from './route/index.js'
import axios from 'axios'

const router = createRouter({
  history:createWebHashHistory(),
  routes,
})
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
installElementPlus(app)
app.mount('#app')