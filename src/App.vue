<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue';
import FotterBar from '@/components/FotterBar.vue';
import { useAuth0 } from '@auth0/auth0-vue';

</script>

<template>
    <v-app>
        <v-layout class="test">
            <NavigationBar></NavigationBar>
        <v-main class="d-flex align-center">
            <RouterView :auth="useAuth0"></RouterView>
        </v-main>
        <FotterBar></FotterBar>
        </v-layout>
    </v-app>
</template>

<style scoped>

</style>
