<script setup lang="ts" >

import { onMounted } from 'vue';
import AccountEdit from '@/components/AccountEdit.vue';
import ProgressiveConfigurationModal from '@/components/ProgressiveConfigurationModal.vue';
import { useAccountStore } from '@/stores/account';
import AccountCreate from '@/components/AccountCreate.vue';

const accountStore = useAccountStore();


onMounted(() => {
    accountStore.getAccounts();
});

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

const getColor =(flag: boolean) =>{
    return flag ? 'green' : 'red';
}

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>Accounts</span>
            <v-btn color="error" variant="text"  icon="mdi-close-thick" size="x-small"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2" v-for="account in accountStore.accounts" :key="account.id" :value="account" border>
                    <v-list-item-title>
                     {{ account.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        CreatedAt: {{ parseDate(account.createdAt) }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        CreatedBy: {{ account.createdBy }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small">id: {{ account.id }}</v-chip>
                        <v-chip class="mx-1" :color="getColor(account.active)" size="small" > {{ account.active ? 'active' : 'inactive'  }} </v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <progressive-configuration-modal></progressive-configuration-modal>
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