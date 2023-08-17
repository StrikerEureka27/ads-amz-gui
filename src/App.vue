<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue';
import FooterBar from '@/components/FooterBar.vue';

</script>

<template>
    <v-app>
        <navigation-bar></navigation-bar>
        <v-main class="d-flex justify-center align-center">
            <router-view></router-view>
        </v-main>
        <footer-bar></footer-bar>
    </v-app>
</template>

<style scoped></style>
