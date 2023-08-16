<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue';
import FotterBar from '@/components/FotterBar.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRoute } from 'vue-router';
import AccessDenied from './components/AccessDenied.vue';

const route = useRoute();

const { isAuthenticated } = useAuth0();

const validateAuthenticated = (): boolean => {
    if (route.path == "/Welcome" && !isAuthenticated.value) {
        return true;
    } else {
        return isAuthenticated.value;
    }
}

</script>

<template>
    <v-app>
        <v-layout v-if="validateAuthenticated()" class="test">
            <NavigationBar></NavigationBar>
            <v-main class="d-flex align-center">
                <RouterView></RouterView>
            </v-main>
            <FotterBar></FotterBar>
        </v-layout>
        <div v-else>
            <AccessDenied></AccessDenied>
        </div>
    </v-app>
</template>

<style scoped></style>
