<script setup lang="ts" >

import { ref } from 'vue';
import type { AccountconfigurationStep } from '@/data/account.model';


const dialog = ref<boolean>(false);
import { useRouter } from 'vue-router';
const router = useRouter();



const accountConfiguration = ref<AccountconfigurationStep[]>([
    { id: 1, name: 'References', path: '/AccountReference' },
    { id: 2, name: 'Filters' , path: '/AccountFilter'},
    { id: 3, name: 'Parameters', path: '/parameters' },
    { id: 4, name: 'Formulas', path: '/formulas' }
]);

const navigation = (navigationPath: string): void => {
    console.log(navigationPath);
    router.push( { path: navigationPath})
}

</script>
<template>
    <v-dialog min-width="1200" min-height="600" width="auto" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-cog" size="small" variant="tonal" color="info" @click="dialog = true"></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Account configuration
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="dialog = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <v-list lines="one">
                    <v-list-item>
                        <v-list-item-title>
                            Account One
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Created By: pcaceros
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card-item>
            <v-divider></v-divider>
            <v-card-item>
                <v-container class="d-flex justify-center" fluid>
                    <v-tabs show-arrows slider-color="secondary">
                        <v-tab v-for="i in accountConfiguration" :key="i.id" :value="'tab-' + i.name" @click="navigation(i.path)">
                            <v-chip class="ma-1" size="x-small">
                                {{ i.id }}
                            </v-chip>
                            {{ i.name }}
                        </v-tab>
                    </v-tabs>
                </v-container>
                <router-view></router-view>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style></style>