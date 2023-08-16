<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';

const route = useRoute();

function showFotter(): boolean {
    return route.path != "/Welcome";
}


</script>
<template>
    <v-footer v-if="showFotter()" class="d-flex justify-center" app><span class="font-weight-light">
            Made with ❤️ in LATAM.
        </span></v-footer>
</template>
<style scoped></style>