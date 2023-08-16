import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IFile } from '@/data/file.model';
import { useLogStore } from '@/stores/adslog';
import { useAuth0 } from '@auth0/auth0-vue';

export const useFileStore = defineStore('file', () => {
    const { getAccessTokenSilently } = useAuth0();
    const files = ref<IFile[]>([]);
    const isLoading = ref<boolean>(false);
    const load = ref<number>(0);
    const processed = ref<boolean | undefined>(false);
    const logStore = useLogStore();
    const token = ref<string>();
    async function getFiles(): Promise<void> {
        try {
            const res = await fetch(`https://${import.meta.env.VITE_AMZ_API}/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });
            files.value = await res.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getToken (): Promise<String>  {
        token.value = await getAccessTokenSilently();
        return token.value;
    }

    async function isProcessed(id: number): Promise<boolean | undefined> {
        try {
            const res = await fetch(`http://${import.meta.env.VITE_AMZ_API}/processed/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            processed.value = await res.json();
            return processed.value == undefined ? false : processed.value;
        } catch (e) {
            console.error(e);
        }
    }

    const uploadStep = async (id: number): Promise<void> => {
        try {
            load.value = 25;
            await fetch(`http://${import.meta.env.VITE_AMZ_API}/step/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let index = 0;
            const refreshIntervalId = setInterval(() => {
                index++;
                load.value += 25;
                if (index == 3) {
                    clearInterval(refreshIntervalId);
                    getFiles();
                    logStore.getLogs();
                    load.value = 0;
                }
            }, 1000);

        } catch (e) {
            isLoading.value = false;
            console.error(e);
        }
    };

    async function deleteFile(id: number): Promise<void> {
        try {
            isLoading.value = true;
            await fetch(`http://${import.meta.env.VITE_AMZ_API}/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setInterval(() => {
                isLoading.value = false;
            }, 1500);
            getFiles();
            logStore.getLogs();
        } catch (e) {
            isLoading.value = false;
            console.error(e);
        }
    };

    async function downloadFile(id: number): Promise<string | undefined> {
        try {
            const response = await fetch(`http://${import.meta.env.VITE_AMZ_API}/download/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let newHref = URL.createObjectURL(await response.blob());
            return newHref;
        } catch (e) {
            console.error(e);
        }
    };

    function getFilesProcessedWithDownloadLink(): IFile[] {
        const copyFiles = [...getProcessedFiles()];
        copyFiles.forEach(async (e) => {
            e.path = await downloadFile(e.id);
        });
        return copyFiles;
    }

    const getProcessedFiles = (): IFile[] => {
        return files.value.filter((e) => e.processed == true);
    }

    const getNotProcessedFiles = (): IFile[] => {
        return files.value.filter((e) => e.processed == false);
    }

    const getTotalFiles = (): number => {
        return files.value.length;
    }

    const getStorage = (): number => {
        return files.value.length * 2;
    }

    return {
        files,
        load,
        isLoading,
        getFiles,
        getProcessedFiles,
        getNotProcessedFiles,
        getTotalFiles,
        getStorage,
        uploadStep,
        deleteFile,
        getFilesProcessedWithDownloadLink
    }
})
