import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ILog } from '@/data/log.model'

export const useLogStore = defineStore('log', () => {
    const logs = ref<ILog[]>([]);
    const getLogs = async (): Promise<void> => {
        try {
            const res = await fetch(`http://localhost:8080/adsamz/log/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            logs.value = await res.json();
        } catch (e) {
            console.error(e);
        }

    };

    return { logs, getLogs }
});
