<script setup lang="ts" >
import { ref } from 'vue';
import { useFilterStore } from '@/stores/filter';
import type { IFilterCreateDto } from '@/data/filter.model';

const filterStore = useFilterStore();

const showFilterCreate = ref<boolean>();
const filter = ref<IFilterCreateDto>({
    name: '',
    header: '',
    reference: '',
    type: 0,
    active: false,
    level: 0,
    createdBy: 'pacaceros'
});

const levels = ref<number[]>([1, 2]);

</script>
<template>
    <v-dialog width="auto" v-model="showFilterCreate">
        <template v-slot:activator="{ props }">
            <v-btn color="info" variant="tonal" @click="showFilterCreate = true" block>ADD</v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Create filter
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showFilterCreate = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="filter.name" label="Name" variant="solo-filled" density="compact" clearable
                        required></v-text-field>
                    <div class="d-flex justify-space-between">
                        <v-text-field v-model="filter.header" class="mr-2" label="Header" variant="solo-filled"
                            density="compact" clearable required></v-text-field>
                        <v-text-field v-model="filter.reference" label="Column index" variant="solo-filled" density="compact"
                            clearable required></v-text-field>
                    </div>
                    <v-select v-model="filter.type" :items="filterStore.filtersTypes" item-title="name" item-value="id" label="Type" variant="solo-filled" density="compact" required></v-select>
                    <v-select :items="levels" label="Level" variant="solo-filled" density="compact" required></v-select>
                    <v-checkbox v-model="filter.active" label="Active?" required></v-checkbox>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal" @click="filterStore.createFilter(filter); showFilterCreate = false" block>CREATE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>