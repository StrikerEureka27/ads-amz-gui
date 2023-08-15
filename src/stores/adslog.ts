import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILog } from '@/data/log.model'

export const useLogStore = defineStore('log', () => {
    const logs = ref<ILog[]>([]);
    async function getLogs(): Promise<void> {
        try {
            const response = await fetch(`http://${import.meta.env.VITE_AMZ_API}/log/all`, {
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

    function sortAndFilterLogs(): ILog[] {
        const logsCopy = [...logs.value]; 
        return logsCopy.sort((a, b) => a.id - b.id).reverse().filter((e, i) => { if (i <= 6) { return e } });
    }

    return { logs, getLogs, sortAndFilterLogs }
});
