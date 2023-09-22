<script setup lang="ts" >

import { ref, onMounted } from 'vue'
import { useFileStore } from '@/stores/adsfile';
import { useLogStore } from '@/stores/adslog';
import { useAccountStore } from '@/stores/account';

const fileStore = useFileStore();
const logStore = useLogStore();
const accountStore = useAccountStore();
const showRepository = ref<boolean>(false);

onMounted(() => {
    logStore.getLogs();
    fileStore.getFiles();
    isAccountSelected();
});

const isAccountSelected = () => {
   accountStore.currentAccount!=null ? showRepository.value = true : showRepository.value = false;
};

const reloadStores = () => {
    fileStore.getFiles();
};

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

</script>
<template>
    <v-card class="flex-fill ma-1">
            <v-card-title class="d-flex justify-space-between">
                <span>Repository</span>
                <v-btn class="ma-0 mr-3" icon="mdi-refresh" size="x-small" variant="tonal" color="info"
                    @click="reloadStores()"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-progress-linear v-if="fileStore.isLoadingLinear" :indeterminate="fileStore.isLoadingLinear"></v-progress-linear>
            <v-card-text>Manage and visualize current workflow</v-card-text>
            <v-card-text>{{ showRepository ? `Account selected: ${accountStore.currentAccount?.name} ` : 'No account selected.' }}</v-card-text>
            <v-container v-if="showRepository">
                <v-list class="d-flex pa-0">
                    <v-list-item class="ma-2">
                        <v-list-item-subtitle class="mb-2">PROGRESS</v-list-item-subtitle>
                        <v-progress-circular :rotate="360" :size="100" :width="15" :indeterminate="fileStore.isLoading" color="secondary">
                            {{ fileStore.isLoading ? 'Loading' : '' }}
                        </v-progress-circular>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-subtitle class="mb-2">STORAGE</v-list-item-subtitle>
                        <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="fileStore.getStorage()"
                            color="info">
                            {{ fileStore.getStorage() + "%" }}
                        </v-progress-circular>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-subtitle class="mb-2">TOTAL FILES</v-list-item-subtitle>
                        <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="fileStore.getTotalFiles()"
                            color="warning">
                            {{ fileStore.getTotalFiles() }}
                        </v-progress-circular>
                    </v-list-item>
                </v-list>
                <v-divider class="mt-4"></v-divider>
                <v-list>
                    <v-list-subheader>READY TO PROCESS</v-list-subheader>
                    <v-list-item v-for="f in fileStore.getNotProcessedFiles(accountStore.currentAccount?.id)" :key="f.id" :value="f">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-file"></v-icon>
                        </template>
                        <v-list-item-title> <v-chip variant="tonal" size="x-small">{{ f.id }}</v-chip> {{ f.name }}</v-list-item-title>
                        <v-list-item-subtitle> {{ parseDate(f.createdAt) }} </v-list-item-subtitle>
                        <v-list-item-subtitle> {{ f.step == 0 ? `Ready to process` : `Not ready to process or refresh
                            repository` }} </v-list-item-subtitle>
                        <v-list-item-subtitle> Account: {{ f.accountId }} </v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="mr-2" icon="mdi-delete" size="small" variant="tonal" color="error"
                                @click="fileStore.deleteFile(f.id)"></v-btn>
                            <v-btn icon="mdi-arrow-right-thick" size="small" variant="tonal"
                                :disabled="fileStore.load == 0 ? false : true" color="info"
                                @click="fileStore.uploadStep(f.id)"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-subheader>PROCESSED</v-list-subheader>
                    <v-list-item min-width="300" v-for="f in fileStore.getFilesProcessedWithDownloadLink(accountStore.currentAccount?.id)" :key="f.id"
                        :value="f">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-file-document-check"></v-icon>
                        </template>
                        <v-list-item-title> <v-chip variant="tonal" size="x-small">{{ f.id }}</v-chip> {{ f.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{ parseDate(f.createdAt) }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ f.processed && f.step == 2 ? 'Ready for download' : 'Not ready'
                        }}</v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="mr-2" icon="mdi-delete" size="small" variant="tonal" color="error"
                                @click="fileStore.deleteFile(f.id)"></v-btn>
                            <v-btn icon="mdi-download" :href="f.path" size="small" variant="tonal" color="info"
                                :download="f.name"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-card>
</template>
<style scoped ></style>