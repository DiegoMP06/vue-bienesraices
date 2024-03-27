import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createVuetify} from 'vuetify'
import {VueFire, VueFireAuth} from 'vuefire'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import {firebaseApp} from './config/firebase'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
});

app.use(VueFire, {
    firebaseApp,
    modules: [
        VueFireAuth()
    ],
});

app.use(createPinia())
app.use(router)
app.use(vuetify);

app.mount('#app')