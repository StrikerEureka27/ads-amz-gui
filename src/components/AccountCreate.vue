<script setup lang="ts" >
import { ref } from 'vue';

const dialog = ref<boolean>(false);

</script>
<template>
    <v-dialog width="auto" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn class="mr-2" icon="mdi-pencil" size="small" variant="tonal" color="info" @click="dialog = true"></v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Create account
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="dialog = false" size="small"></v-btn>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-item>
                <form>
                    <v-text-field label="Name" variant="solo-filled" density="compact" clearable required></v-text-field>
                    <div class="d-flex justify-space-between">
                        <v-text-field class="mr-2" label="Header" variant="solo-filled" density="compact" clearable
                            required></v-text-field>
                        <v-text-field label="Reference" variant="solo-filled" density="compact" clearable
                            required></v-text-field>
                    </div>
                    <v-select label="Type" variant="solo-filled" density="compact" required></v-select>
                    <v-select label="Level" variant="solo-filled" density="compact" required></v-select>
                    <v-checkbox label="Active?" required></v-checkbox>
                </form>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="secondary" @click="dialog = false" variant="tonal" block>UPDATE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped ></style>