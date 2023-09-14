import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ILog } from '@/data/log.model';
import { useAuth0 } from '@auth0/auth0-vue';

export const useLogStore = defineStore('log', () => {
    const { getAccessTokenSilently } = useAuth0();
    const logs = ref<ILog[]>([]);
    const token = ref<string>();
    async function getLogs(): Promise<void> {
        try {
            
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/file/logs`, {
                method: 'GET',
                headers: {
                    //'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            logs.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getToken(): Promise<String> {
        token.value = await getAccessTokenSilently();
        return token.value;
    }

    function sortAndFilterLogs(): ILog[] {
        const logsCopy = [...logs.value];
        return logsCopy.sort((a, b) => a.id - b.id).reverse().filter((e, i) => { if (i <= 6) { return e } });
    }

    return { logs, getLogs, sortAndFilterLogs }
});
