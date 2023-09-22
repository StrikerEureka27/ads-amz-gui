<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFileStore } from '@/stores/adsfile';
import { useLogStore } from '@/stores/adslog';
import { useAuth0 } from '@auth0/auth0-vue';
import { useAccountStore } from '@/stores/account';

const { getAccessTokenSilently } = useAuth0();

const file = ref<File | null>(null);
const dialog = ref<boolean>(false);
const fileStore = useFileStore();
const logStore = useLogStore();
const accountStore = useAccountStore();


const uploadFile = async (): Promise<void> => {
        const uploadData = new FormData();
        uploadData.append("file", file.value[0]);
        uploadData.append("processed", "false");
        uploadData.append("account", accountStore.currentAccount?.id);
        try {
            fileStore.isLoading = true;
            let token: string = await getAccessTokenSilently();
            await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: uploadData
            });
            setInterval(() => {
                fileStore.isLoading = false;
            }, 1500);
            fileStore.getFiles();
            //logStore.getLogs();
            dialog.value = false;
            file.value = null;
        } catch (e) {
            console.error(e);
        }
}


</script>
<template>
    <v-dialog width="auto" v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn class="ma-1" size="x-small" color="secondary" variant="tonal" @click="dialog = true" block>
                load file
            </v-btn>
        </template>
        <v-card min-width="500">
            <v-card-title class="d-flex justify-space-between align-center">
                <span>Upload file</span>
                <v-btn color="error" variant="text" icon="mdi-close-thick" @click="dialog = false" size="small"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-item v-if="accountStore.currentAccount!=null">
                <v-file-input v-model="file" class="btn-file" variant="solo-filled" label="Select or drop your file!"
                    density="default" required clearable></v-file-input>
            </v-card-item>
            <v-card-item v-if="accountStore.currentAccount==null" >
                <span>Please select a account first</span>
            </v-card-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="info" @click="uploadFile()" variant="tonal" :disabled="accountStore.currentAccount==null" block>Upload</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<style scoped></style>