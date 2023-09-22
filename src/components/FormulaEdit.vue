<script setup lang="ts" >
import { ref } from 'vue';
import { useFormulaStore } from '@/stores/formula';
import type { IFormula } from '@/data/formula.model';

const formulaStore = useFormulaStore();

const showFormulaEdit = ref<boolean>(false);
const props = defineProps(['formula']);
let formula = ref<IFormula>({
    id: 0,
    name: '',
    header: '',
    pattern: '',
    level: 1,
});
formula = props.formula;

const levels = ref<number[]>([1, 2]);

</script>
<template>
    <v-dialog width="auto" v-model="showFormulaEdit">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-pencil" size="small" variant="tonal" color="info"
                @click="showFormulaEdit = true"></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Edit formula
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showFormulaEdit = false"
                    size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="formula.name" label="Name" variant="solo-filled" density="compact" clearable
                        required></v-text-field>
                    <v-text-field v-model="formula.header" class="mr-2" label="Header name" variant="solo-filled"
                        density="compact" clearable required></v-text-field>
                    <v-text-field v-model="formula.pattern" label="Pattern" variant="solo-filled" density="compact"
                        clearable required></v-text-field>
                    <v-select :items="levels" v-model="formula.level" label="Level" variant="solo-filled" density="compact"
                        required></v-select>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" @click="formulaStore.updateFormula(formula); showFormulaEdit = false" variant="tonal"
                    block>UPDATE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>