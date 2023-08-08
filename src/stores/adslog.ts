import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILog } from '@/data/log.model'

export const useLogStore = defineStore('log', () => {
    const logs = ref<ILog[]>([]);
    const getLogs = async (): Promise<ILog[] | undefined> => {
        try {
            const response = await fetch(`http://${import.meta.env.VITE_AMZ_API}/adsamz/log/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            logs.value = await response.json();
            return logs.value;
        } catch (e) {
            console.error(e);
        }

    };

    const sortAndFilterLogs = (): ILog[] => {
     return logs.value.filter((e, i) => { if (i <= 7) { return e } }).sort((a, b) => a.id - b.id).reverse();
     }

    return { logs, getLogs, sortAndFilterLogs }
});
