<script setup lang="ts" >

import { ref, onMounted } from 'vue';
import { useFormulaStore } from '@/stores/formula';
import FormulaCreate from '@/components/FormulaCreate.vue';
import FormulaEdit from '@/components/FormulaEdit.vue';
import Reference from '@/views/Reference.vue';
import type { IAccount } from '@/data/account.model';
import router from '@/router';

const props = defineProps(['account']);
const formulaStore = useFormulaStore();
const showCleanView = ref<boolean>(true);
const account = ref<IAccount>(props.account);
const parameterVisibility: ParameterVisibility = {};



onMounted(() => {
    //formulaStore.getFormulas();
    changeView();
});

const isAccountFormula = (): boolean => {
    return router.currentRoute.value.fullPath == '/home/formula' ? true : false;
}

const showAccountFormulas = (): boolean => {
    return showCleanView.value == true && isAccountFormula() == false;
};

const changeView = (): void => {
    if (showCleanView.value == true && isAccountFormula() == false) {
        console.log
        formulaStore.getAccountFormulasByAccountId(account.value.id);
        formulaStore.getAccountFormulas(account.value.id);
    } else {
        formulaStore.getFormulas();
    }
};

const changeToCleanView = (): void => {
    showCleanView.value = !showCleanView.value;
    changeView();
};


type ParameterVisibility = {
    [key: number]: boolean;
};

const toggleParameterVisibility = (filterId: number) => {
    parameterVisibility[filterId] = !parameterVisibility[filterId];
};

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between">
            <span>{{ showAccountFormulas() ? 'Formulas assigned' : 'Formulas' }}</span>
            <v-btn v-if="account != null" icon="mdi-eye" size="x-small" variant="tonal" color="secondary"
                @Click="changeToCleanView()"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-if="formulaStore.isLoading" :indeterminate="formulaStore.isLoading"></v-progress-linear>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2"
                    v-for="formula in showAccountFormulas() ? formulaStore.account?.formulas : formulaStore.formulas"
                    :key="formula.id" :value="formula" border>
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
                    <reference v-if="parameterVisibility[formula.id]" class="mt-2"
                        :show_references_assigned="parameterVisibility[formula.id]" :formula="formula" ></reference>
                    <template v-slot:append>
                        <div v-if="account == null">
                            <formula-edit :formula="formula"></formula-edit>
                            <v-btn icon="mdi-delete" size="small" variant="tonal"
                                @Click="formulaStore.deleteFormula(formula.id)" color="error"></v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="!showAccountFormulas()" class="mx-2" icon="mdi-check-bold" size="small"
                                variant="tonal" color="secondary"
                                @Click="formulaStore.createAccountFormula(account.id, formula.id); showCleanView = true"></v-btn>
                            <v-btn v-if="showAccountFormulas()" class="mx-2" icon="mdi-close-thick" size="small"
                                variant="tonal" color="secondary"
                                @Click="formulaStore.deleteAccountFormula(account.id, formula.id)"></v-btn>
                            <v-btn v-if="showAccountFormulas()" class="mx-2" icon="mdi-chevron-down" size="small"
                                variant="tonal" color="secondary" @Click="toggleParameterVisibility(formula.id)"></v-btn>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <formula-create v-if="!showAccountFormulas()" ></formula-create>
        </v-card-actions>
    </v-card>
</template>
<style scoped></style>