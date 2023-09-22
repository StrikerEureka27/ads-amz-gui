<script setup lang="ts">


import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Actions from '@/views/Actions.vue';
import History from '@/views/History.vue';
import router from '@/router';

onMounted(()=>{
    console.log(router.currentRoute.value.fullPath);
});


const {  isAuthenticated } = useAuth0();

</script>
<template>
    <v-container v-if="isAuthenticated" class="d-flex justify-center flex-wrap">
        <actions></actions>
        <router-view></router-view>
        <history></history>
    </v-container>
    <v-container v-else class="d-flex justify-center flex-wrap" fluid >
        <v-progress-circular color="secondary" indeterminate :size="128" :width="12">
            <span class="text-subtitle-1">Loading</span>
            </v-progress-circular>
    </v-container>
</template>
<style scoped></style>