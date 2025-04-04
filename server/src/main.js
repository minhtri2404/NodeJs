import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'     // import store để sử dụng state management
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')       // thêm .use(store)
