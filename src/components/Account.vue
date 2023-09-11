<script setup lang="ts" >

import { ref } from 'vue';
import AccountEdit from '@/components/AccountEdit.vue';
import ProgressiveConfigurationModal from '@/components/ProgressiveConfigurationModal.vue';

const dialog = ref<boolean>(false);

</script>
<template>
    <v-dialog width="auto" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="dialog = true">
                Accounts
            </v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Accounts
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
                        <template v-slot:append>
                            <progressive-configuration-modal></progressive-configuration-modal>
                            <account-edit></account-edit>
                            <v-btn icon="mdi-upload" size="small" variant="tonal" color="secondary"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="info" @click="dialog = false" variant="tonal" block>ADD</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped></style>