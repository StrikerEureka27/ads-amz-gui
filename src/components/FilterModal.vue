<script setup lang="ts" >
import FilterModalEdit from '@/components/FilterModalEdit.vue';
import { ref } from 'vue';

const dialog = ref<boolean>(false);

</script>
<template>
    <v-dialog width="auto" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" block @click="dialog = true">
                Filters
            </v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                Filters
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="dialog = false"
                    size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <v-list>
                    <v-list-item class="pa-0">
                        <template v-slot:prepend>
                            <v-list-item-title class="text-h5 mr-3">
                                B
                            </v-list-item-title>
                        </template>
                        <v-list-item-title>
                            Containt keywords on Entity (B) Column
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Type: Containts
                        </v-list-item-subtitle>
                        <template v-slot:append>
                            <filter-modal-edit></filter-modal-edit>
                            <v-btn icon="mdi-delete" size="small" variant="tonal" color="error"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="info" @click="dialog = false" variant="tonal" block>ADD</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped></style>