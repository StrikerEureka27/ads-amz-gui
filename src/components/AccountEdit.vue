<script setup lang="ts" >

import { ref, onMounted } from 'vue';
import type { IAccountUpdateDto} from '@/data/account.model';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const props = defineProps(['account']);
const showAccountEdit = ref<boolean>(false);
let account = ref<IAccountUpdateDto>({
    id: 0,
    name: '',
    sheet: 1,
    active: false,
});

account = props.account;

</script>
<template>
    <v-dialog width="auto" v-model="showAccountEdit">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-pencil" size="small" variant="tonal" color="info" @click="showAccountEdit = true"></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Edit account
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showAccountEdit = false"
                    size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="account.name" label="Name" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <v-text-field v-model="account.sheet" label="Sheet number" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <v-checkbox v-model="account.active" label="Active?" required></v-checkbox>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal" block @click="accountStore.updateAccount(account); showAccountEdit = false" >UPDATE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style></style>


