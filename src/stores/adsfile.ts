import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IFile } from '@/data/file.model'

export const useFileStore = defineStore('file', () => {
    const files = ref<IFile[]>([]);
    const getFiles = async (): Promise<IFile[] | undefined> => {
        try {
            const res = await fetch(`http://localhost:8080/adsamz/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            files.value = await res.json();
            return files.value;
        } catch (e) {
            console.error(e);
        }

    };
    const getProcessedFiles = (): IFile[] =>{
        return files.value.filter((e)=> e.processed == true);
    }

    const getNotProcessedFiles = (): IFile[] =>{
        return files.value.filter((e)=> e.processed == false);
    }

    return { files, getFiles, getProcessedFiles, getNotProcessedFiles }
})
