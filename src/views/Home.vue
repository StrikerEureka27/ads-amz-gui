<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadFile from '@/components/LoadFile.vue';
import { useFileStore } from '@/stores/adsfile';
import { useLogStore } from '@/stores/adslog';
import { useAuth0 } from '@auth0/auth0-vue';

const fileStore = useFileStore();
const logStore = useLogStore();
const { logout } = useAuth0();

onMounted(() => {
    fileStore.getFiles();
    logStore.getLogs();
});

const reloadStores = () => {
    fileStore.getFiles();
    logStore.getLogs();
};

const logOut = ():void =>{
    logout({ logoutParams: { returnTo: window.location.origin } });
}

const parseDate = (createdAt: Date): string => {
    return createdAt.toString().split("T")[0] + " " + createdAt.toString().split("T")[1].substring(0, 5);
};

const changeAlertColor = (message: string = 'error'): string => {
    return message.includes("deleted") ? 'info' : 'secondary';
};

</script>
<template>
    <v-container class="d-flex justify-center flex-wrap">
        <v-card class="flex-fill flex-lg-grow-0 flex-md-grow-1 flex-sm-grow-1 ma-1" min-width="260">
            <v-card-title>
                Actions
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>Select a option</v-card-text>
            <v-card-actions class="d-flex flex-column ma-0 pa-2">
                <load-file></load-file>
                <v-btn class="pa-0 ma-0 mt-2" size="x-small" color="secondary" variant="tonal" disabled
                    block>Accounts</v-btn>
                <v-btn class="mt-2 ma-0" size="x-small" color="secondary" variant="tonal" disabled block>Filters</v-btn>
                <v-btn class="mt-2 ma-0" size="x-small" color="secondary" variant="tonal" disabled block>Parameters</v-btn>
                <v-btn class="mt-2 ma-0" size="x-small" color="red" variant="tonal" @click="logOut()" block>Logout</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="flex-fill ma-1">
            <v-card-title class="d-flex justify-space-between">
                <span>Repository</span>
                <v-btn class="ma-0 mr-3" icon="mdi-refresh" size="x-small" variant="tonal" color="info"
                    @click="reloadStores()"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>Manage and visualize current workflow</v-card-text>
            <v-container>
                <v-list class="d-flex pa-0">
                    <v-list-item class="ma-2">
                        <v-list-item-subtitle class="mb-2">PROGRESS</v-list-item-subtitle>
                        <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="fileStore.load" :indeterminate="fileStore.isLoading"  color="secondary">
                            {{ fileStore.load + "%" }}
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
                    <v-list-item v-for="f in fileStore.getNotProcessedFiles()" :key="f.id" :value="f">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-file"></v-icon>
                        </template>
                        <v-list-item-title> <v-chip variant="tonal" size="x-small">{{ f.id }}</v-chip> {{ f.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle> {{ parseDate(f.createdAt) }} </v-list-item-subtitle>
                        <v-list-item-subtitle> {{ f.step==0 ? 'Ready to process' : 'Not ready to process or refresh repository' }} </v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="mr-2" icon="mdi-delete" size="small" variant="tonal" color="error"
                                @click="fileStore.deleteFile(f.id)"></v-btn>
                            <v-btn icon="mdi-arrow-right-thick" size="small" variant="tonal" :disabled="fileStore.load == 0 ? false : true" color="info"
                                @click="fileStore.uploadStep(f.id)"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-subheader>PROCESSED</v-list-subheader>
                    <v-list-item min-width="300" v-for="f in fileStore.getFilesProcessedWithDownloadLink()" :key="f.id"
                        :value="f">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-file-document-check"></v-icon>
                        </template>
                        <v-list-item-title> <v-chip variant="tonal" size="x-small">{{ f.id }}</v-chip> {{ f.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{ parseDate(f.createdAt) }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ f.processed && f.step==2 ? 'Ready for download' : 'Not ready'
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
        <v-card class="flex-fill flex-xl-grow-0 flex-lg-grow-1 flex-md-grow-1 flex-sm-grow-1 ma-1">
            <v-card-title>History</v-card-title>
            <v-divider></v-divider>
            <v-card-text>View last history operations</v-card-text>
            <v-list>
                <v-list-item v-for="log in logStore.sortAndFilterLogs()" :key="log.id">
                    <v-alert icon="mdi-cog" density="compact" variant="tonal" :color="changeAlertColor(log.message)" border="top">
                        <v-list-item-title>{{ log.message }}</v-list-item-title>
                        <v-list-item-subtitle>{{ parseDate(log.createdAt) }}</v-list-item-subtitle>
                    </v-alert>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>
<style scoped></style>