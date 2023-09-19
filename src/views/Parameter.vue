<script setup lang="ts" >

import { ref, onMounted, watch } from 'vue';
import { useParameterStore } from '@/stores/parameter';
import ParameterCreate from '@/components/ParameterCreate.vue';
import ParameterEdit from '@/components/ParameterEdit.vue';
import type { IFilter } from '@/data/filter.model';
import router from '@/router';

const props = defineProps(['filter']);
const parameterStore = useParameterStore();
const filter = ref<IFilter>(props.filter);
const showCleanView = ref<boolean>(true);

onMounted(() => {
    parameterStore.getParameterTypes();
    watch(() => props.filter, (newFilter) => {
        filter.value = newFilter;
    });
    parameterStore.getParameters();
    changeView();
});

const isFilterParameter = (): boolean => {
    return router.currentRoute.value.fullPath == '/home/parameter' ? true : false;
}

const showFilterParameters = (): boolean => {
    return showCleanView.value == true && isFilterParameter() == false;
};

const changeView = (): void => {
    if (showCleanView.value == true && isFilterParameter() == false) {
        //parameterStore.parameters = filter.value.parameters;
        // filterStore.getAccountFilters(account.value.id);
    } else {
        parameterStore.getParameters();
    }
};

const changeToCleanView = (): void => {
    showCleanView.value = !showCleanView.value;
    changeView();
}

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between align-center">
            <span>Parameters</span>
            <v-btn v-if="filter != null" icon="mdi-eye" size="x-small" variant="tonal" color="secondary"
                @Click="changeToCleanView()"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2"
                    v-for="parameter in showFilterParameters() ? filter.parameters : parameterStore.parameters"
                    :key="parameter.id" :value="parameter" border>
                    <v-list-item-title>
                        {{ parameter.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Value: {{ parameter.value }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Type: {{ parameter.paramterType.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small"> id: {{ parameter.id }} </v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <parameter-edit :parameter="parameter"></parameter-edit>
                        <v-btn icon="mdi-delete" size="small" variant="tonal" color="error"
                            @Click="parameterStore.deleteParameter(parameter.id)"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <parameter-create></parameter-create>
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