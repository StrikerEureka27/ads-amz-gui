import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IReference, IReferenceCreateDto, IReferenceType, IReferenceUpdateDto } from '@/data/reference.model';

export const useReferenceStore = defineStore('reference', () => {
    const { getAccessTokenSilently } = useAuth0();
    const references = ref<IReference[]>([]);
    const referenceTypes = ref<IReferenceType[]>([]);


    async function getReferences(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            references.value = await response.json();
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
        console.log(data);
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getReferences();
        } catch (e) {
            console.error(e);
        }
    };

    async function updateReference(data: IReferenceUpdateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getReferences();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteReference(referenceId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/reference/${referenceId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            getReferences();
        } catch (e) {
            console.error(e);
        }
    };

    return { references, referenceTypes,getReferences,getReferencesTypes, updateReference, deleteReference, createReference }
});