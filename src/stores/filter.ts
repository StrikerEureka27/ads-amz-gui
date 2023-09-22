import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IFilter, IFilterType, IFilterCreateDto, IFilterUpdateDto, IAccountFilter, IAccountFiltersCreateDto } from '@/data/filter.model';
import type { IAccount } from '@/data/account.model';

export const useFilterStore = defineStore('filter', () => {
    const { getAccessTokenSilently } = useAuth0();
    const account = ref<IAccount>();
    const filters = ref<IFilter[]>([]);
    const accountFilters = ref<IAccountFilter[]>([]);
    const accountReferenceCreate = ref<IAccountFiltersCreateDto[]>([]);
    const filtersTypes = ref<IFilterType[]>([]);
    const isLoading = ref<boolean>(false);

    async function getFilters(): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            filters.value = await response.json();
            isLoading.value = false;
        } catch (e) {
            console.error(e);
        }

    };

    async function getFilterTypes(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/types`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            filtersTypes.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function getAccountFilters(accountId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/${accountId}/filter`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            accountFilters.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getAccountFiltersByAccountId(accountId: number): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/${accountId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            account.value = await response.json();
            isLoading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function createFilter(data: IFilterCreateDto): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            getFilters();
            isLoading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function updateFilter(data: IFilterUpdateDto): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            isLoading.value = false;
            getFilters();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteFilter(filterId: number): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/${filterId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            isLoading.value = false;
            getFilters();
        } catch (e) {
            console.error(e);
        }
    };

    async function createAccountFilters(accountId: number, filterId: number): Promise<void> {
        try {
            accountReferenceCreate.value.push({
                account: accountId,
                filter: filterId
            });
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/filter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountReferenceCreate.value)
            });
            getAccountFiltersByAccountId(accountId);
            accountReferenceCreate.value.pop();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteAccountFilters(accountId: number, filterId: number): Promise<void> {
        let idToDelete: (number | undefined) = 0;
        if (findIdToDelete(accountId, filterId) != null) {
            idToDelete = findIdToDelete(accountId, filterId)?.id;
        }
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/filter/${idToDelete}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getAccountFiltersByAccountId(accountId);
        } catch (e) {
            console.error(e);
        }

    };

    const findIdToDelete = (accId: number, refId: number) => {
        let accountFilterRelationship = accountFilters.value.find((e) => {
            if (accId == e.account && refId == e.filter) {
                return e.id;
            }
        });
        return accountFilterRelationship;
    };

    return {
        account,
        filters,
        filtersTypes,
        deleteAccountFilters, 
        createAccountFilters, 
        getFilters,
        createFilter,
        getFilterTypes,
        updateFilter,
        deleteFilter,
        getAccountFilters,
        getAccountFiltersByAccountId,
        isLoading
    }
});
