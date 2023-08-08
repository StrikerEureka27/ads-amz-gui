<script setup lang="ts">
import { ref } from 'vue';
import { useFileStore } from '@/stores/adsfile';

const file = ref<File | null>(null);
const dialog = ref<boolean>(false);
const fileStore = useFileStore();

const uploadFile = async (): Promise<void> => {
    const uploadData = new FormData();
    uploadData.append("file", file.value[0]);
    uploadData.append("processed", "false");
    try {
        await fetch(`http://localhost:8080/adsamz/upload`, {
            method: 'POST',
            body: uploadData
        });
        fileStore.getFiles();
        dialog.value = false;
        file.value = null;
    } catch (e) {
        console.error(e);
    }
}

</script>
<template>
        <v-dialog v-model="dialog" width="auto">
            <template v-slot:activator="{ props }">
                <v-btn class="mt-2" size="x-small" color="secondary" variant="tonal" @click="dialog = true" block>
                    load file
                </v-btn>
            </template>
            <v-card class="d-flex justify-center" width="500">
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>Upload file</span>
                    <v-btn color="secondary" variant="tonal" icon="mdi-close-thick" @click="dialog = false" size="small"></v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-item>
                    <v-file-input v-model="file" class="btn-file" variant="solo-filled" label="Select or drop your file!" density="default"
                       required clearable></v-file-input>
                </v-card-item>
                <v-card-actions class="d-flex justify-center">
                    <v-btn color="info" @click="uploadFile()" variant="tonal" block>Upload</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>
<style scoped></style>