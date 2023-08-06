<script setup lang="ts">

import NavigationBar from '@/components/NavigationBar.vue'

</script>

<template>
    <v-app>
        <NavigationBar></NavigationBar>
        <v-main>
            <RouterView></RouterView>
        </v-main>
    </v-app>
</template>

<style scoped></style>
