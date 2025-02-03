// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'
import '@/assets/scss/style.scss'
import '@/assets/scss/variables.scss'

const app = createApp(App)
// const pinia = createPinia()

registerPlugins(app)

// app.use(pinia)
app.mount('#app')
