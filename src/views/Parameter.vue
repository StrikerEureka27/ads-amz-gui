<script setup lang="ts" >

import { ref, onMounted, watch, onBeforeMount } from 'vue';
import { useParameterStore } from '@/stores/parameter';
import ParameterCreate from '@/components/ParameterCreate.vue';
import ParameterEdit from '@/components/ParameterEdit.vue';
import type { IFilter } from '@/data/filter.model';
import router from '@/router';

const props = defineProps(['filter', 'show_parameters_assigned', 'account_id']);
const parameterStore = useParameterStore();
const filter = ref<IFilter>(props.filter);
const accountId = ref<number>(props.account_id);
const showCleanView = ref<boolean>(true);

onMounted(() => {
    parameterStore.getParameterTypes();
    watch(() => props.filter, (newFilter) => {
        filter.value = newFilter;
    }, { deep: true });
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
        parameterStore.getFilterParameters(filter.value.id);
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
            <span> {{ showFilterParameters() ? 'Parameters assigned' : 'Parameters' }}</span>
            <v-btn v-if="filter != null" icon="mdi-eye" size="x-small" variant="tonal" color="secondary"
                @Click="changeToCleanView()"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list density="compact">
                <v-list-item class="mt-2 pa-2"
                    v-for="parameter in showFilterParameters() ? filter.parameters : parameterStore.parameters"
                    :key="parameter.id" :value="parameter" border>
                    <v-list-item-title>
                        {{ parameter.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="parameter.value != null">
                        Value: {{ parameter.value }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Type: {{ parameter.paramterType.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small"> id: {{ parameter.id }} </v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <div v-if="filter == null">
                            <parameter-edit :parameter="parameter"></parameter-edit>
                            <v-btn icon="mdi-delete" size="small" variant="tonal" color="error"
                                @Click="parameterStore.deleteParameter(parameter.id)"></v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="!showFilterParameters()" class="mx-2" icon="mdi-check-bold" size="small"
                                variant="tonal" color="secondary"
                                @Click="parameterStore.createFilterParameter(filter.id, parameter.id, accountId); showCleanView = true"></v-btn>
                            <v-btn v-if="showFilterParameters()" class="mx-2" icon="mdi-close-thick" size="small"
                                variant="tonal" color="secondary"
                                @Click="parameterStore.deleteFilterParameters(filter.id, parameter.id, accountId)"></v-btn>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <parameter-create v-if="!showFilterParameters()"></parameter-create>
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