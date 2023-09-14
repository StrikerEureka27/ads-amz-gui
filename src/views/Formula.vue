<script setup lang="ts" >

import { onMounted } from 'vue';
import ProgressiveConfigurationModal from '@/components/ProgressiveConfigurationModal.vue';
import { useFormulaStore } from '@/stores/formula';
import FormulaCreate from '@/components/FormulaCreate.vue';
import FormulaEdit from '@/components/FormulaEdit.vue';
const formulaStore = useFormulaStore();

onMounted(() => {
    formulaStore.getFormulas();
});

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>Formulas</span>
            <v-btn color="error" variant="text"  icon="mdi-close-thick" size="x-small"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2" v-for="formula in formulaStore.formulas" :key="formula.id" :value="formula" border>
                    <v-list-item-title>
                     {{ formula.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Header: {{ formula.header }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Pattern: {{ formula.pattern }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small">id: {{ formula.id }}</v-chip>
                        <v-chip class="mx-1" color="info" size="small">level: {{ formula.level }}</v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <formula-edit :formula="formula" ></formula-edit>
                        <v-btn icon="mdi-delete" size="small" variant="tonal" @Click="formulaStore.deleteFormula(formula.id)" color="error"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <formula-create></formula-create>
        </v-card-actions>
    </v-card>
</template>
<style scoped></style>