import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Auth0
import { createAuth0 } from '@auth0/auth0-vue';

const vuetify = createVuetify({
    ssr: true,
    theme: {
        defaultTheme: 'dark'
    },
    components,
    directives,
})

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

console.log(window.location.origin)

app.use(
    createAuth0({
        domain: "dev-a81sge7e.us.auth0.com",
        clientId: "66SG7fZxXj6lgyybID4HjwoAr1fnx31w",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
);

app.mount('#app')
