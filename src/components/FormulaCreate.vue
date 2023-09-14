<script setup lang="ts" >
import { ref } from 'vue';
import { useFormulaStore } from '@/stores/formula';
import  type { IFormula, IFormulaCreateDto } from '@/data/formula.model';


const formulaStore = useFormulaStore();
const showFormulaCreate = ref<boolean>(false);
const formula = ref<IFormulaCreateDto>({
    name: '',
    header: '',
    pattern: '',
    level: 1,
});
const levels = ref<number[]>([1, 2]);

</script>
<template>
    <v-dialog width="auto" v-model="showFormulaCreate">
        <template v-slot:activator="{ props }">
            <v-btn color="info" variant="tonal" @click="showFormulaCreate = true" block>ADD</v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Create formula
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showFormulaCreate = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="formula.name" label="Name" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <v-text-field v-model="formula.header" label="Header" variant="solo-filled" density="compact"  clearable required></v-text-field>
                    <v-text-field v-model="formula.pattern" label="Pattern" variant="solo-filled" density="compact"  clearable required></v-text-field>
                    <v-select v-model="formula.level" :items="levels" label="Level" variant="solo-filled" density="compact" required></v-select>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal" @click="formulaStore.createFormula(formula); showFormulaCreate = false" block>Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>