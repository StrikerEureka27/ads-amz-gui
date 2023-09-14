<script setup lang="ts" >
import { ref } from 'vue';
import type { IAccountCreateDto} from '@/data/account.model';
import { useAccountStore } from '@/stores/account';


const accountStore = useAccountStore();
const account = ref<IAccountCreateDto>({
    name: '',
    sheet: 1,
    active: true, 
    createdBy: 'pcaceros'
});

</script>
<template>
    <v-dialog width="auto" v-model="accountStore.showAccountCreateModal">
        <template v-slot:activator="{ props }">
            <v-btn color="info" variant="tonal" @click="accountStore.showAccountCreateModal = true" block>ADD</v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Create account
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="accountStore.showAccountCreateModal = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="account.name" label="Name" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <v-text-field v-model="account.sheet" label="Sheet number" variant="solo-filled" density="compact" type="number" clearable required></v-text-field>
                    <v-checkbox v-model="account.active" label="Active?" required></v-checkbox>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal" @click="accountStore.createAccount(account)" block>Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>