<script setup lang="ts" >

import { ref } from 'vue';
import type { AccountconfigurationStep, IAccount } from '@/data/account.model';


const dialog = ref<boolean>(false);
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps(['account']);

let account = ref<IAccount>();
account = props.account;

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

const getColor =(flag: boolean) =>{
    return flag ? 'green' : 'red';
}

const accountConfiguration = ref<AccountconfigurationStep[]>([
    { id: 1, name: 'References', path: '/account_reference' },
    { id: 2, name: 'Filters', path: '/account_filter' },
    { id: 3, name: 'Parameters', path: '/filter_parameter' },
    { id: 4, name: 'Formulas', path: '/account_formula' }
]);

const navigation = (navigationPath: string): void => {
    router.push({ path: navigationPath })
}

</script>
<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-cog" size="small" variant="tonal" color="info" @click="dialog = true" ></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between">
                <span >Configuration</span>
                <v-btn color="error" variant="text"  icon="mdi-close-thick" size="x-small" @click="dialog = false" ></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <v-list>
                    {{ account }}
                <v-list-item class="pa-2" border>
                    <v-list-item-title>
                     {{ account.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        CreatedBy: {{ account.createdBy }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        CreatedAt: {{ parseDate(account.createdAt) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mr-1" size="small">id: {{ account.id }}</v-chip>
                        <v-chip class="mr-1" :color="getColor(account.active)" size="small" > {{ account.active ? 'active' : 'inactive'  }} </v-chip>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
            </v-card-item>
            <v-card-item>
                <v-container class="d-flex justify-center" fluid>
                    <v-tabs show-arrows slider-color="secondary" density="compact">
                        <v-tab v-for="i in accountConfiguration" :key="i.id" :value="'tab-' + i.name"
                            @click="navigation(i.path)">
                            <v-chip class="ma-1" size="x-small">
                                {{ i.id }}
                            </v-chip>
                            {{ i.name }}
                        </v-tab>
                    </v-tabs>
                </v-container>
                <router-view :account="account" :load_from_account="true" ></router-view>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style></style>