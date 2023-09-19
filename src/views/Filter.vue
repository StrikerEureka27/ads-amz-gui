<script setup lang="ts" >

import { onMounted, ref } from 'vue';
import FilterEdit from '@/components/FilterEdit.vue';
import FilterCreate from '@/components/FilterCreate.vue';
import { useFilterStore } from '@/stores/filter';
import type { IAccount } from '@/data/account.model';
import router from '@/router';
import Parameter from '@/views/Parameter.vue';

const props = defineProps(['account']);
const filterStore = useFilterStore();
const showCleanView = ref<boolean>(true);
const account = ref<IAccount>(props.account);

onMounted(() => {
    filterStore.getFilterTypes();
    changeView();
});

const getColor = (flag: boolean) => {
    return flag ? 'green' : 'red';
};

const isAccountFilter = (): boolean => {
    return router.currentRoute.value.fullPath == '/home/filter' ? true : false;
}

const showAccountFilters = (): boolean => {
    return showCleanView.value == true && isAccountFilter() == false;
};

const changeView = (): void => {
    if (showCleanView.value == true && isAccountFilter() == false) {
        filterStore.getAccountFiltersByAccountId(account.value.id);
        filterStore.getAccountFilters(account.value.id);
    } else {
        filterStore.getFilters();
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
            <span>{{ showAccountFilters() ? `Filters assigned`  :  `Filters` }}</span>
            <v-btn v-if="account != null" icon="mdi-eye" size="x-small" variant="tonal" color="secondary"
                @Click="changeToCleanView()"></v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-progress-linear v-if="filterStore.isLoading" :indeterminate="filterStore.isLoading"></v-progress-linear>
        <v-card-item>
            <v-list>
                <v-list-item class="mt-2 pa-2" v-for="filter in showAccountFilters() ? filterStore.account?.filters : filterStore.filters" 
                :key="filter.id" 
                :value="filter"
                    border>
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
                        <v-chip class="mx-1" :color="getColor(filter.active)" size="small"> {{ filter.active ? 'active' :
                            'inactive' }} </v-chip>
                    </v-list-item-subtitle>
                    <parameter :filter="filter" ></parameter>
                    <template v-slot:append>
                        <div v-if="account == null" >
                            <filter-edit :filter="filter"></filter-edit>
                        <v-btn icon="mdi-delete" size="small" variant="tonal" @Click="filterStore.deleteFilter(filter.id)"
                            color="error"></v-btn>
                        </div>
                        <div v-else>
                            <v-btn v-if="!showAccountFilters()" class="mx-2" icon="mdi-check-bold" size="small" variant="tonal"
                                color="secondary"
                                @Click="filterStore.createAccountFilters(account.id, filter.id); showCleanView = true"></v-btn>
                            <v-btn v-if="showAccountFilters()" class="mx-2" icon="mdi-close-thick" size="small" variant="tonal"
                                color="secondary"
                                @Click="filterStore.deleteAccountFilters(account.id, filter.id)"></v-btn>
                            <v-btn v-if="showAccountFilters()" class="mx-2" icon="mdi-chevron-down" size="small" variant="tonal"
                                color="secondary"
                                @Click="filterStore.deleteAccountFilters(account.id, filter.id)"></v-btn>
                        </div>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-item>
        <v-card-actions class="d-flex justify-center">
            <filter-create v-if="!showAccountFilters()" ></filter-create>
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.chip-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
}</style>