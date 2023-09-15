<script setup lang="ts" >

import { ref, onMounted } from 'vue';
import { useReferenceStore } from '@/stores/reference';
import ReferenceEdit from '@/components/ReferenceEdit.vue';
import ReferenceCreate from '@/components/ReferenceCreate.vue';
import type { IReference } from '@/data/reference.model';
import type { IAccount } from '@/data/account.model';

const props = defineProps(['account', 'load_from_account']);
const referenceStore = useReferenceStore();
let references = ref<IReference[]>();
let account = ref<IAccount>();
let loadFromAccount = ref<boolean>(false);
account = props.account;
loadFromAccount = props.load_from_account;


onMounted(() => {
    referenceStore.getReferencesTypes();
    referenceStore.getReferences();
    //console.log(account.value);
    //let references = loadFromAccount ? account.references : referenceStore.references;
});


</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>References</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list>
                {{ account }}
                {{  loadFromAccount }}
                <v-list-item class="mt-2 pa-2" v-for="reference in referenceStore.references" :key="reference.id" border>
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
                        <reference-edit :reference="reference"></reference-edit>
                        <v-btn class="mx-2" icon="mdi-delete" size="small" variant="tonal"
                            @Click="referenceStore.deleteReference(reference.id)" color="error"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <reference-create></reference-create>
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