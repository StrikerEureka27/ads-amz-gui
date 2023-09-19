<script setup lang="ts" >

import { onMounted } from 'vue';
import AccountEdit from '@/components/AccountEdit.vue';
import { useAccountStore } from '@/stores/account';
import AccountCreate from '@/components/AccountCreate.vue';
import router from '@/router';
import AccountConfiguration from '@/components/AccountConfiguration.vue';
const accountStore = useAccountStore();

onMounted(() => {
    accountStore.getAccounts();
});

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

const getColor =(flag: boolean) =>{
    return flag ? 'green' : 'red';
};

const navigation = (toPath: string):void =>{
    router.push( { path: '/home/account' + toPath + '/1' } );
};

</script>
<template>
    <v-card class="d-flex flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>Accounts</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-if="accountStore.isLoading" :indeterminate="accountStore.isLoading"></v-progress-linear>
        <v-card-item>
            <v-list>
                <v-list-item class="pa-2" v-for="account in accountStore.accounts" :key="account.id"  border>
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
                    <template v-slot:append>
                        <account-configuration :account="account"></account-configuration>
                        <account-edit :account="account" ></account-edit>
                        <v-btn icon="mdi-upload" size="small" variant="tonal" color="secondary"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <account-create></account-create>
        </v-card-actions>
    </v-card>
</template>
<style scoped></style>