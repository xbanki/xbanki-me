import { createApp } from 'vue'

import RootComponent from './components/root/root.vue'
import store from './store'

// Create, mount & use VueX store for state.
createApp(RootComponent).use(store).mount('#app')
