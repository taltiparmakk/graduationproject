import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/style.css";
import "bootstrap"

import appNavbar from "@/components/appNavbar";
import appItems from "@/components/Items/appItems"
import { appAxios } from './utils/appAxios';

const app = createApp(App);
app.component("appNavbar", appNavbar);
app.component("appItems", appItems);
app.use(store);
app.use(router);
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app')

