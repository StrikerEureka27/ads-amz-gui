<script setup lang="ts" >

import { onMounted } from 'vue';
import { useParameterStore } from '@/stores/parameter';
import ParameterCreate from '@/components/ParameterCreate.vue';
import ParameterEdit from '@/components/ParameterEdit.vue';


const parameterStore = useParameterStore();

onMounted(() => {
    parameterStore.getParameters();
    parameterStore.getParameterTypes();
});


</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between align-center">
            Parameters
            <v-btn color="error" variant="text" icon="mdi-close-thick" size="x-small"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2" v-for="parameter in parameterStore.parameters" :key="parameter.id"
                    :value="parameter" border>
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
                        <parameter-edit :parameter="parameter" ></parameter-edit>
                        <v-btn icon="mdi-delete" size="small" variant="tonal" color="error" @Click="parameterStore.deleteParameter(parameter.id)"></v-btn>
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