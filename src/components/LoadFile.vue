<script setup lang="ts">
import { ref } from 'vue';
import { useFileStore } from '@/stores/adsfile';

const file: File = ref<File | null>(null);
const dialog: (boolean | null) = ref(false);
const fileStore = useFileStore();

const uploadFile = async (): Promise<void> => {
    dialog.value = false;
    const uploadData = new FormData();
    uploadData.append("file", file.value[0]);
    uploadData.append("processed", "false");
    //console.log(file.value[0]);

    try {
        const response = await fetch(`http://localhost:8080/adsamz/upload`, {
            method: 'POST',
            body: uploadData
        });
        fileStore.getFiles();
        console.log(response);

    } catch (e) {
        console.error(e);
    }
}

</script>
<template>
    <div class="text-center">
        <v-btn class="mt-2" size="x-small" color="secondary" variant="tonal" @click="dialog = true" block>
            load file
        </v-btn>
        <v-dialog v-model="dialog" width="auto">
            <v-card class="d-flex justify-center" width="500">
                <v-card-title>
                    Upload file
                </v-card-title>
                <v-divider></v-divider>
                <v-card-item>
                    <v-file-input v-model="file" class="btn-file" label="Select or drop your file!" density="compact"
                        clearable></v-file-input>
                </v-card-item>
                <v-card-actions class="d-flex justify-end">
                    <v-btn color="info" @click="uploadFile()">Upload</v-btn>
                    <v-btn color="secondary" @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped></style>