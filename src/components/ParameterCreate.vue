<script setup lang="ts" >
import { ref } from 'vue';
import { useParameterStore } from '@/stores/parameter';
import  type { IParameterCreateDto } from '@/data/parameter.model';


const parameterStore = useParameterStore();
const showParameterCreate = ref<boolean>(false);
const parameter = ref<IParameterCreateDto>({
    name: '',
    value: '',
    type: 0,
});

</script>
<template>
    <v-dialog width="auto" v-model="showParameterCreate">
        <template v-slot:activator="{ props }">
            <v-btn color="info" variant="tonal" @click="showParameterCreate = true" block>ADD</v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Create parameter
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="showParameterCreate = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field v-model="parameter.name" label="Name" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <v-text-field v-model="parameter.value" label="Value" variant="solo-filled" density="compact"  clearable required></v-text-field>
                    <v-select v-model="parameter.type" :items="parameterStore.parameterTypes" item-title="name" item-value="id" label="Type" variant="solo-filled" density="compact"
                        required></v-select>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" variant="tonal" @click="parameterStore.createParameter(parameter); showParameterCreate = false" block>Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>