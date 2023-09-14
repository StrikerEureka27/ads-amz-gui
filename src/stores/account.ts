import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IAccount, IAccountCreateDto, IAccountUpdateDto } from '@/data/account.model';


export const useAccountStore = defineStore('account', () => {
    const { getAccessTokenSilently } = useAuth0();
    const accounts = ref<IAccount[]>([]);
    const showAccountCreateModal = ref<boolean>(false);
    async function getAccounts(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            accounts.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };
    async function createAccount(data: IAccountCreateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            showAccountCreateModal.value = !showAccountCreateModal.value;
            getAccounts();
        } catch (e) {
            console.error(e);
        }

    };

    async function updateAccount(data: IAccountUpdateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getAccounts();
        } catch (e) {
            console.error(e);
        }
    };



    return { accounts, getAccounts, createAccount, updateAccount, showAccountCreateModal  }
});
