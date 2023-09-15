<script setup lang="ts" >

import { onMounted } from 'vue';
import FilterEdit from '@/components/FilterEdit.vue';
import FilterCreate from '@/components/FilterCreate.vue';
import { useFilterStore } from '@/stores/filter';


const filterStore = useFilterStore();

onMounted(() => {
    filterStore.getFilters();
    filterStore.getFilterTypes();
});

const getColor =(flag: boolean) =>{
    return flag ? 'green' : 'red';
}

</script>
<template>
    <v-card class="d-flex  flex-fill flex-column ma-1">
        <v-card-title class="d-flex justify-space-between align-center">
            Filters
            <v-btn color="error" variant="text" icon="mdi-close-thick" size="x-small"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-if="filterStore.isLoading" :indeterminate="filterStore.isLoading"></v-progress-linear>
        <v-card-item>
            <v-list>
                <v-list-item  class="mt-2 pa-2" v-for="filter in filterStore.filters" :key="filter.id" :value="filter" border>
                    <template v-slot:prepend>
                        <v-list-item-title class="text-h5 mr-3">
                            <v-chip class="chip-custom text-h6">{{ filter.reference }}</v-chip>
                        </v-list-item-title>
                    </template>
                    <v-list-item-title>
                        {{ filter.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Header: {{ filter.header }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        Type: {{ filter.filterType.name }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="mt-2">
                        <v-chip class="mx-1" size="small"> id: {{ filter.id }} </v-chip> 
                        <v-chip class="mx-1" color="info" size="small"> level: {{ filter.level }} </v-chip>
                        <v-chip class="mx-1" :color="getColor(filter.active)" size="small"> {{ filter.active ? 'active' : 'inactive' }} </v-chip>
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <filter-edit :filter="filter"></filter-edit>
                        <v-btn icon="mdi-delete" size="small" variant="tonal" @Click="filterStore.deleteFilter(filter.id)" color="error"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <filter-create></filter-create>
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