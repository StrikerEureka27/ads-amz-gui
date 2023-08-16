import './assets/main.css';

// Pinia implementation
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify implementation
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Auth0 implementation
import { createAuth0 } from '@auth0/auth0-vue';

const vuetify = createVuetify({
    ssr: true,
    theme: {
        defaultTheme: 'dark'
    },
    components,
    directives,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.use(
    createAuth0({
        domain: import.meta.env.VITE_AMZ_DOMAIN,
        clientId: import.meta.env.VITE_AMZ_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AMZ_AUDIENCE,
        }
    })
);

app.mount('#app');
