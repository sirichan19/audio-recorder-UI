import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';

console.log(router.history);

createApp(App).use(router).mount('#app');