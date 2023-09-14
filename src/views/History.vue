<script setup lang="ts" >

import { useLogStore } from '@/stores/adslog';
const logStore = useLogStore();

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

const changeAlertColor = (message: string = 'error'): string => {
    return message.includes("deleted") ? 'info' : 'secondary';
};

</script>
<template>
    <v-card class="flex-fill flex-xl-grow-0 flex-lg-grow-1 flex-md-grow-1 flex-sm-grow-1 ma-1">
        <v-card-title>History</v-card-title>
        <v-divider></v-divider>
        <v-card-text>View last history operations</v-card-text>
        <v-list>
            <v-list-item v-for="log in logStore.sortAndFilterLogs()" :key="log.id">
                <v-alert icon="mdi-cog" density="compact" variant="tonal" :color="changeAlertColor(log.message)"
                    border="top">
                    <v-list-item-title>{{ log.message }}</v-list-item-title>
                    <v-list-item-subtitle>{{ parseDate(log.createdAt) }}</v-list-item-subtitle>
                </v-alert>
            </v-list-item>
        </v-list>
    </v-card>
</template>
<style scoped ></style>