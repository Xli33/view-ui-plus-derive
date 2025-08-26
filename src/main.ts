import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './iview-mods/input-number'
// import { i18n } from './i18n'

import App from './App.vue'

// import { $i18n } from './locale/i18n'
// $i18n.i18n = i18n
// $i18n.prefix = 'q'

const APP = createApp(App)
  // .use(i18n)
  .use(ViewUIPlus)
// window.iview = ViewUIPlus

APP.mount('#app')
