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
    console.log(`the component is now mounted.`);
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
        console.log(href)
        console.log(newHref.value);

        for (let i = 1; i <= 100; i++) {
            load.value += 1;
        }

        setInterval(() => {
            load.value = 0;
            fileStore.getFiles();
        }, 1000)

        console.log(response);
    } catch (e) {
        console.error(e);
    }
}

</script>
<template>
    <v-container class="d-flex justify-center align-center" fluid>
        <v-row class="d-flex justify-center flex-nowrap pa-4">
            <v-col class="flex-grow-1 flex-shrink-0" md="2">
                <v-card>
                    <v-card-title class="text-subtitle-1">
                        Account
                    </v-card-title>
                    <v-container class="d-flex flex-column">
                        <load-file></load-file>
                        <v-btn class="ma-1" size="x-small" color="secondary" block>Parameters</v-btn>
                        <v-btn class="ma-1" size="x-small" color="secondary" block>Filters</v-btn>
                    </v-container>
                </v-card>
            </v-col>
            <v-col class="flex-grow-1" md="auto">
                <v-card>
                    <v-card-title class="text-subtitle-1">
                        Repository
                    </v-card-title>
                    <v-container class="d-flex flex-wrap">
                        <v-list class="flex-grow-1 ma-1 pa-0" density="compact">
                            <v-list-item>
                                <v-list-subheader>PROGRESS</v-list-subheader>
                                <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="load"
                                    color="secondary">
                                    {{ load }}
                                </v-progress-circular>
                            </v-list-item>
                        </v-list>
                        <v-list class="flex-grow-1 ma-1 pa-0" density="compact">
                            <v-list-subheader>READY TO PROCESS</v-list-subheader>
                            <v-list-item v-for="f in fileStore.getNotProcessedFiles()" :key="f.id" :value="f">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-file"></v-icon>
                                </template>
                                <v-list-item-title>{{ f.id + " - " + f.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ f.createdAt }}</v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-btn icon="mdi-arrow-right-thick" size="x-small" color="secondary"
                                        @click="uploadStep(f.id)"></v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                        <v-list class="flex-grow-1 ma-1 pa-0" density="compact">
                            <v-list-subheader>PROCESSED</v-list-subheader>
                            <v-list-item min-width="300" v-for="f in fileStore.getProcessedFiles()" :key="f.id" :value="f">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-file"></v-icon>
                                </template>
                                <v-list-item-title>{{ f.id + " - " + f.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ f.createdAt }}</v-list-item-subtitle>
                                <v-list-item-subtitle>{{ f.processed ? 'Ready for download' : 'not ready'
                                }}</v-list-item-subtitle>
                                <template v-slot:append>
                                    <v-btn :href="newHref" icon="mdi-download" size="x-small" color="secondary"
                                        @click="dowloadFile(f.id)" :download="f.name"></v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-container>
                </v-card>
            </v-col>
            <v-col class="flex-grow-1 flex-shrink-1" md="auto">
                <v-card>
                    <v-card-title class="text-subtitle-1">History</v-card-title>
                    <v-list>
                        <v-list-item v-for="log in logStore.logs" :key="log.id">
                            <v-list-item-title v-text="log.message"></v-list-item-title>
                            <v-list-item-subtitle>{{ log.createdAt }}</v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.ctn-lv0 {
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
}

.ctn-lv1-left {
    width: 30%;
    padding: 0.5rem;
    border-right: 1px solid var(--vt-c-black);
    align-items: center;
    flex-direction: column;
    display: flex;
}

.ctn-lv1-right {
    padding: 0.5rem;
    width: 100%;
    align-items: center;
    flex-direction: column;
    display: flex;
}

.itm-ctn-lv1 {
    width: 75%;
    margin: 1rem;
    height: 2rem;
    background-color: var(--vt-c-black-soft);
    display: flex;
}

.ctn-files {
    justify-content: start;
    width: 100%;
    flex-direction: row;
    display: flex;
}

.fm-btn {
    display: block;
    margin-top: 1rem;
    width: 10rem;
}
</style>