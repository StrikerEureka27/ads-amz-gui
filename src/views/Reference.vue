<script setup lang="ts" >

import { ref, onMounted, watch } from 'vue';
import { useReferenceStore } from '@/stores/reference';
import ReferenceEdit from '@/components/ReferenceEdit.vue';
import ReferenceCreate from '@/components/ReferenceCreate.vue';
import type { IAccount } from '@/data/account.model';
import router from '@/router';

const props = defineProps(['account']);
const referenceStore = useReferenceStore();
const showCleanView = ref<boolean>(true);
const account = ref<IAccount>(props.account);

onMounted(() => {
    referenceStore.getReferencesTypes();
    changeView();
});

const isAccountReference = (): boolean => {
    return router.currentRoute.value.fullPath == '/home/reference' ? true : false;
}

const showAccountReference = (): boolean => {
    return showCleanView.value == true && isAccountReference() == false;
};

const changeView = (): void => {
    if (showCleanView.value == true && isAccountReference() == false) {
        referenceStore.getAccountReferenceByAccountId(account.value.id);
        referenceStore.getAccountReferences(account.value.id);
    } else {
        referenceStore.getReferences();
    }
};

const changeToCleanView = (): void => {
    showCleanView.value = !showCleanView.value;
    changeView();
}

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>{{ showAccountReference() ?  `References assigned`  :  `References` }}</span>
            <v-btn v-if="account != null" icon="mdi-eye" size="x-small" variant="tonal" color="secondary"
                @Click="changeToCleanView()"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-if="referenceStore.isloading" :indeterminate="referenceStore.isloading"></v-progress-linear>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2"
                    v-for="reference in showAccountReference() ? referenceStore.account?.references : referenceStore.references"
                    :key="reference.id" border>
                    <template v-slot:prepend>
                        <v-list-item-title class="text-h5 mr-3">
                            <v-chip class="chip-custom text-h6">{{ reference.header }}</v-chip>
                        </v-list-item-title>
                    </template>
                    <v-list-item-title>
                        {{ reference.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="reference.value != null">
                        Value: {{ reference.value }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Type: {{ reference.referenceType.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small"> id: {{ reference.id }} </v-chip>
                        <v-chip class="mx-1" color="info" size="small"> level: {{ reference.level }} </v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <div v-if="account == null">
                            <reference-edit :reference="reference"></reference-edit>
                            <v-btn class="mx-2" icon="mdi-delete" size="small" variant="tonal"
                                @Click="referenceStore.deleteReference(reference.id)" color="error"></v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="!showAccountReference()" class="mx-2" icon="mdi-check-bold" size="small" variant="tonal"
                                color="secondary"
                                @Click="referenceStore.createAccountReference(account.id, reference.id); showCleanView = true"></v-btn>
                            <v-btn v-if="showAccountReference()" class="mx-2" icon="mdi-close-thick" size="small" variant="tonal"
                                color="secondary"
                                @Click="referenceStore.deleteAccountReferences(account.id, reference.id)"></v-btn>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <reference-create
                v-if="!showAccountReference()"></reference-create>
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.chip-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
}
</style>