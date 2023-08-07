<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadFile from '@/components/LoadFile.vue';
import { useFileStore } from '@/stores/adsfile';
import { useLogStore } from '@/stores/adslog';

const fileStore = useFileStore();
const logStore = useLogStore();

const newHref: (string | undefined) = ref();
const load: number = ref(0)

onMounted(() => {
    fileStore.getFiles();
    logStore.getLogs();
});

const uploadStep = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/adsamz/step/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        for (let i = 1; i <= 100; i++) {
            load.value += 1;
        }

        setInterval(() => {
            load.value = 0;
            fileStore.getFiles();
            logStore.getLogs();
        }, 1000)

        console.log(response);
    } catch (e) {
        console.error(e);
    }
}

const dowloadFile = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/adsamz/download/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let href = URL.createObjectURL(await response.blob());
        newHref.value = href;

        for (let i = 1; i <= 100; i++) {
            load.value += 1;
        }

        setInterval(() => {
            load.value = 0;
            fileStore.getFiles();
            logStore.getLogs();
        }, 1000)
    } catch (e) {
        console.error(e);
    }
};

const deleteFile = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/adsamz/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        for (let i = 1; i <= 100; i++) {
            load.value += 1;
        }

        setInterval(() => {
            load.value = 0;
            fileStore.getFiles();
            logStore.getLogs();
        }, 1000)
    } catch (e) {
        console.error(e);
    }
};

const updateComponentData = (): void => {
    fileStore.getFiles();
    logStore.getLogs();
}

</script>
<template>
    <v-container class="d-flex justify-center flex-wrap">
        <v-card class="flex-lg-grow-0 flex-md-grow-1 flex-sm-grow-1 ma-1" min-width="250">
            <v-card-title>
                Actions
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>Select a option</v-card-text>
            <v-card-action class="d-flex flex-column ma-0 pa-1">
                <load-file></load-file>
                <v-btn class="mt-2" size="x-small" color="secondary" variant="tonal" disabled block>Accounts</v-btn>
                <v-btn class="mt-2" size="x-small" color="secondary" variant="tonal" disabled block>Filters</v-btn>
                <v-btn class="mt-2" size="x-small" color="secondary" variant="tonal" disabled block>Parameters</v-btn>
                <v-btn class="mt-2" size="x-small" color="red" variant="tonal" href="/LogIn" block>Logout</v-btn>
            </v-card-action>
        </v-card>
        <v-card class="flex-fill ma-1">
            <v-card-title class="d-flex justify-space-between">
                <span>Repository</span>
                <v-btn class="ma-0 mr-3" icon="mdi-refresh" size="x-small" variant="tonal" color="info"
                    @click="updateComponentData()"></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>Manage and visualize current workflow</v-card-text>
            <v-container>
                <v-list class="d-flex pa-0">
                    <v-list-item>
                        <v-list-item-subtitle class="mb-2">PROGRESS</v-list-item-subtitle>
                        <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="load" color="secondary">
                            {{ load + "%" }}
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
                        <v-list-item-title>{{ f.id + " : " + f.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ f.createdAt.split("T")[0] + " " + f.createdAt.split("T")[1].substring(0, 5)
                        }}</v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="mr-2" icon="mdi-delete" size="small" variant="tonal" color="error"
                                @click="deleteFile(f.id)"></v-btn>
                            <v-btn icon="mdi-arrow-right-thick" size="small" variant="tonal" color="info"
                                @click="uploadStep(f.id)"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-subheader>PROCESSED</v-list-subheader>
                    <v-list-item min-width="300" v-for="f in fileStore.getProcessedFiles()" :key="f.id" :value="f">
                        <template v-slot:prepend>
                            <v-icon icon="mdi-file-document-check"></v-icon>
                        </template>
                        <v-list-item-title>{{ f.id + " : " + f.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ f.createdAt.split("T")[0] + " " + f.createdAt.split("T")[1].substring(0, 5)
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle>{{ f.processed ? 'Ready for download' : 'Not ready'
                        }}</v-list-item-subtitle>
                        <template v-slot:append>
                            <v-btn class="mr-2" icon="mdi-delete" size="small" variant="tonal" color="error"
                                @click="deleteFile(f.id)"></v-btn>
                            <v-btn :href="newHref" icon="mdi-download" size="small" variant="tonal" color="info"
                                @click="dowloadFile(f.id)" :download="f.name"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-card>
        <v-card class="flex-lg-grow-0 flex-md-grow-1 flex-sm-grow-1 ma-1" min-width="250">
            <v-card-title>History</v-card-title>
            <v-divider></v-divider>
            <v-card-text>View last history operations</v-card-text>
            <v-list>
                <v-list-item v-for="log in logStore.sortAndFilterLogs()" :key="log.id">
                    <v-alert variant="tonal" color="secondary" border="top">
                        <v-list-item-title v-text="log.message"></v-list-item-title>
                        <v-list-item-subtitle>{{ log.createdAt.split("T")[0] + " " +
                            log.createdAt.split("T")[1].substring(0, 5)
                        }}</v-list-item-subtitle>
                    </v-alert>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>
<style scoped></style>