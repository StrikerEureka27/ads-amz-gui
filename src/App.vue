<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue';
import FotterBar from '@/components/FotterBar.vue';

</script>

<template>
    <v-app>
        <v-layout>
            <NavigationBar></NavigationBar>
        <v-main class="d-flex align-center">
            <RouterView></RouterView>
        </v-main>
        <FotterBar></FotterBar>
        </v-layout>
    </v-app>
</template>

<style scoped></style>
