import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IFormula, IFormulaCreateDto } from '@/data/formula.model';

export const useFormulaStore = defineStore('formula', () => {
    const { getAccessTokenSilently } = useAuth0();
    const formulas = ref<IFormula[]>([]);

    async function getFormulas(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/formula/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            formulas.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function createFormula(data: IFormulaCreateDto): Promise<void> {
        console.log(data);
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
            console.log(response);
            getFormulas();
        } catch (e) {
            console.error(e);
        }
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
            console.log(response);
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
            console.log(response);
            getFormulas();
        } catch (e) {
            console.error(e);
        }
    };

    return { getFormulas, createFormula, updateFormula, deleteFormula, formulas }
});