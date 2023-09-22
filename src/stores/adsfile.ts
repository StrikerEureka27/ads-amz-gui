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
    const isLoadingLinear = ref<boolean>();


    async function getFiles(): Promise<void> {
        try {
            isLoadingLinear.value = true;
            let token: string = await getAccessTokenSilently();
            const res = await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            files.value = await res.json();
            isLoadingLinear.value = false;
        } catch (e) {
            console.error(e);
        }

    };

    const uploadStep = async (id: number): Promise<void> => {
        try {
            isLoading.value = true;
            let token: string = await getAccessTokenSilently();
            let response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/step/${id}/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                getFiles();
                changeLoading(false);
                logStore.getLogs();
            } else {
                console.error('Server response not successful:', response.statusText);
            }
        } catch (e) {
            console.error(e);
        }

        finally {
            isLoading.value = false;
        }
    };

    async function changeLoading(value: boolean): Promise<void> {
        isLoading.value = value;
    }

    async function deleteFile(id: number): Promise<void> {
        try {
            let token: string = await getAccessTokenSilently();
            isLoading.value = true;
            await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/${id}/delete`, {
                method: 'DELETE',
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
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/${id}/download`, {
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

    function getFilesProcessedWithDownloadLink(accountId: number): IFile[] {
        const copyFiles = [...getProcessedFiles(accountId)];
        copyFiles.forEach(async (e) => {
            e.path = await downloadFile(e.id);
        });
        return copyFiles;
    }

    const getProcessedFiles = (accountId: number): IFile[] => {
        return files.value.filter((e) => e.processed == true && e.accountId == accountId);
    }

    const getNotProcessedFiles = (accountId: number): IFile[] => {
        return files.value.filter((e) => e.processed == false && e.accountId == accountId);
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
        isLoadingLinear,
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
