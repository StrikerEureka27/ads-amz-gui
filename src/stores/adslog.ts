import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILog } from '@/data/log.model'

export const useLogStore = defineStore('log', () => {
    const logs = ref<ILog[]>([]);
    const getLogs = async (): Promise<void | undefined> => {
        try {
            const response = await fetch(`http://localhost:8080/adsamz/log/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            logs.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    const sortAndFilterLogs = (): ILog[] => {
        return logs.value.sort((a, b) => a.id - b.id).reverse().filter((e, i) => { if (i <= 7) { return e } });
    }

    return { logs, getLogs, sortAndFilterLogs }
});
