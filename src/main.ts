import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import './iview-mods/input-number'

import App from './App.vue'

const APP = createApp(App).use(ViewUIPlus)
// window.iview = ViewUIPlus

APP.mount('#app')
