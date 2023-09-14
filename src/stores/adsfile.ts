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
    const logStore = useLogStore();

    
    async function getFiles(): Promise<void> {
        try {
            let token: string = await getAccessTokenSilently();
            const res = await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/all`, {
                method: 'GET',
                headers: {
                     Authorization: `Bearer ${token}`,
                }
            });
            files.value = await res.json();
        } catch (e) {
            console.error(e);
        }

    };

    const uploadStep = async (id: number): Promise<void> => {
        try {
            load.value = 25;
            let token: string = await getAccessTokenSilently();
            await fetch(`https://${import.meta.env.VITE_AMZ_API}/step/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
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
            let token: string = await getAccessTokenSilently();
            isLoading.value = true;
            await fetch(`https://${import.meta.env.VITE_AMZ_API}/delete/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
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
            let token: string = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/download/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
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
