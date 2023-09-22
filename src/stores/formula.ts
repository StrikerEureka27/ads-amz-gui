import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IAccountFormula, IFormula, IFormulaCreateDto, IAccountFormulaCreateDto, IAccountFormulaReferenceCreateDto, IFormulaReference } from '@/data/formula.model';
import type { IAccount } from '@/data/account.model';

export const useFormulaStore = defineStore('formula', () => {
    const { getAccessTokenSilently } = useAuth0();
    const formulas = ref<IFormula[]>([]);
    const account = ref<IAccount>();
    const accountFormulas = ref<IAccountFormula[]>([]);
    const formulaReference = ref<IFormulaReference[]>([]);
    const accountFormulaCreate = ref<IAccountFormulaCreateDto[]>([]);
    const formulaReferenceCreate = ref<IAccountFormulaReferenceCreateDto[]>([]);
    const isLoading = ref<boolean>(false);

    async function getFormulas(): Promise<void> {
        try {
            isLoading.value = true;
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            formulas.value = await response.json();
            isLoading.value = false;
        } catch (e) {
            console.error(e);
        }

    };

    async function getAccountFormulasByAccountId(accountId: number): Promise<void> {
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

    async function getAccountFormulas(accountId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/${accountId}/formula`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            accountFormulas.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function getFormulaReferences(formulaId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/${formulaId}/reference`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            formulaReference.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function createAccountFormula(accountId: number, formulaId: number): Promise<void> {
        try {
            accountFormulaCreate.value.push({
                account: accountId,
                formula: formulaId
            });
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/formula/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountFormulaCreate.value)
            });
            getAccountFormulasByAccountId(accountId);
            accountFormulaCreate.value.pop();
        } catch (e) {
            console.error(e);
        }
    };

    async function createFormulaReference(formulaId: number, referenceId: number): Promise<void> {
        try {
            formulaReferenceCreate.value.push({
                formula: formulaId,
                reference: referenceId
            });

            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/reference/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulaReferenceCreate.value)
            });
            getAccountFormulasByAccountId(formulaId);
            formulaReferenceCreate.value.pop();
        } catch (e) {
            console.error(e);
        }
    };

    async function createFormula(data: IFormulaCreateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            getFormulas();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteAccountFormula(accountId: number, formulaId: number): Promise<void> {
        let idToDelete: (number | undefined) = 0;
        if (findIdToDelete(accountId, formulaId) != null) {
            idToDelete = findIdToDelete(accountId, formulaId)?.id;
        }
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/account/formula/${idToDelete}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getAccountFormulasByAccountId(accountId);
        } catch (e) {
            console.error(e);
        }
    };

    const findIdToDelete = (accId: number, forId: number) => {
        let accountFormulaRelationship = accountFormulas.value.find((e) => {
            if (accId == e.account && forId == e.formula) {
                return e.id;
            }
        });
        return accountFormulaRelationship;
    };

    async function deleteFormulaReference(formulaId: number, referenceId: number ,accountId: number): Promise<void> {
        let idToDelete: (number | undefined) = 0;
        if (findFormulaReferenceIdToDelete(formulaId, referenceId) != null) {
            idToDelete = findFormulaReferenceIdToDelete(formulaId, referenceId)?.id;
        }
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/reference/${idToDelete}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getAccountFormulasByAccountId(accountId);
        } catch (e) {
            console.error(e);
        }

    };

    const findFormulaReferenceIdToDelete = (formulaId: number, referenceId: number) => {
        let formulaReferenceRelationship = formulaReference.value.find((e) => {
            if (formulaId == e.formula && referenceId == e.reference) {
                return e.id;
            }
        });
        return formulaReferenceRelationship;
    };

    async function updateFormula(data: IFormula): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            getFormulas();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteFormula(formulaId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/${formulaId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            getFormulas();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        account,
        isLoading,
        getFormulas,
        createFormula,
        updateFormula,
        deleteFormula,
        getAccountFormulas, 
        getFormulaReferences,
        deleteFormulaReference, 
        createFormulaReference,
        getAccountFormulasByAccountId,
        createAccountFormula, 
        deleteAccountFormula, 
        formulas
    }
});