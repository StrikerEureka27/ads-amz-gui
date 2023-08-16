<script setup lang="ts">
import { ref } from 'vue';
import { useFileStore } from '@/stores/adsfile';
import { useLogStore } from '@/stores/adslog';
import { useAuth0 } from '@auth0/auth0-vue';


const { getAccessTokenSilently } = useAuth0();

const file = ref<File | null>(null);
const dialog = ref<boolean>(false);
const token = ref<string>();
const fileStore = useFileStore();
const logStore = useLogStore();

const uploadFile = async (): Promise<void> => {
    const uploadData = new FormData();
    uploadData.append("file", file.value[0]);
    uploadData.append("processed", "false");
    try {
        fileStore.isLoading = true;
        await fetch(`https://${import.meta.env.VITE_AMZ_API}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            },
            body: uploadData
        });
        setInterval(() => {
            fileStore.isLoading = false;
        }, 1500);
        fileStore.getFiles();
        logStore.getLogs();
        dialog.value = false;
        file.value = null;
    } catch (e) {
        console.error(e);
    }
}

async function getToken(): Promise<String> {
    token.value = await getAccessTokenSilently();
    return token.value;
}

</script>
<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-btn size="x-small" color="secondary" variant="tonal" @click="dialog = true" block>
                load file
            </v-btn>
        </template>
        <v-card class="d-flex justify-center" width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                <span>Upload file</span>
                <v-btn color="secondary" variant="tonal" icon="mdi-close-thick" @click="dialog = false"
                    size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item>
                <v-file-input v-model="file" class="btn-file" variant="solo-filled" label="Select or drop your file!"
                    density="default" required clearable></v-file-input>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="info" @click="uploadFile()" variant="tonal" block>Upload</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped></style>