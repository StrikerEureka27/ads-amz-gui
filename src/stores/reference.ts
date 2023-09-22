import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IAccount } from '@/data/account.model';
import type { IAccountReference, IAccountReferencesCreateDto, IReference, IReferenceCreateDto, IReferenceType, IReferenceUpdateDto } from '@/data/reference.model';


export const useReferenceStore = defineStore('reference', () => {

    const { getAccessTokenSilently } = useAuth0();
    const account = ref<IAccount>();
    const references = ref<IReference[]>([]);
    const referenceTypes = ref<IReferenceType[]>([]);
    const accountReferences = ref<IAccountReference[]>([]);
    const accountReferencesCreate = ref<IAccountReferencesCreateDto[]>([]);
    const isloading = ref<boolean>(false);

    async function getReferences(): Promise<void> {
        try {
            isloading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            references.value = await response.json();
            isloading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function getAccountReferences(accountId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/${accountId}/reference`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            accountReferences.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function getAccountReferenceByAccountId(accountId: number): Promise<void> {
        try {
            isloading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/${accountId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            account.value = await response.json();
            isloading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function getReferencesTypes(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/types`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            referenceTypes.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function createReference(data: IReferenceCreateDto): Promise<void> {
        try {
            isloading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            getReferences();
            isloading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function createAccountReference(accountId: number, referenceId: number): Promise<void> {
        try {

            accountReferencesCreate.value.push({
                account: accountId,
                reference: referenceId
            });

            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/reference/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountReferencesCreate.value)
            });
            getAccountReferenceByAccountId(accountId);
            accountReferencesCreate.value.pop();
        } catch (e) {
            console.error(e);
        }
    };

    async function updateReference(data: IReferenceUpdateDto): Promise<void> {
        try {
            isloading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            getReferences();
            isloading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteReference(referenceId: number): Promise<void> {
        try {
            isloading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/${referenceId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getReferences();
            isloading.value = false;
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteAccountReferences(accountId: number, referenceId: number): Promise<void> {
        let idToDelete: (number | undefined) = 0;
        if (findIdToDelete(accountId, referenceId) != null) {
            idToDelete = findIdToDelete(accountId, referenceId)?.id;
        }
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/reference/${idToDelete}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getAccountReferenceByAccountId(accountId);
        } catch (e) {
            console.error(e);
        }

    };

    const findIdToDelete = (accId: number, refId: number) => {
        let accountReferenceRelationship = accountReferences.value.find((e) => {
            if (accId == e.account && refId == e.reference) {
                return e.id;
            }
        });
        return accountReferenceRelationship;
    };

    return {
        account,
        references,
        referenceTypes,
        getReferences,
        getReferencesTypes,
        updateReference,
        deleteReference,
        createReference,
        getAccountReferences,
        deleteAccountReferences,
        createAccountReference,
        getAccountReferenceByAccountId,
        accountReferences,
        isloading,
    }
});