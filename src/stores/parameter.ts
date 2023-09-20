import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuth0 } from '@auth0/auth0-vue';
import type { IParameter, IParameterType, IParameterCreateDto, IParameterUpdateDto, IFilterParameter, IFilterParameterCreateDto } from '@/data/parameter.model';
import { useFilterStore } from '@/stores/filter';
import { useAccountStore } from '@/stores/account';

export const useParameterStore = defineStore('parameter', () => {
    const { getAccessTokenSilently } = useAuth0();
    const filterStore = useFilterStore();
    const parameters = ref<IParameter[]>([]);
    const filterParameters = ref<IFilterParameter[]>([]);
    const filterParametersCreate = ref<IFilterParameterCreateDto[]>([]);
    const parameterTypes = ref<IParameterType[]>([]);
    const accountStore = useAccountStore();

    async function getParameters(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            parameters.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function getParameterTypes(): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/types`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            parameterTypes.value = await response.json();
        } catch (e) {
            console.error(e);
        }
    };

    async function createParameter(data: IParameterCreateDto): Promise<void> {
        console.log(data);
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    async function createFilterParameter(filterId: number, parameterId: number, accountId: number): Promise<void> {
        try {

            filterParametersCreate.value.push({
                filter: filterId,
                parameter: parameterId
            });

            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/parameter/create`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filterParametersCreate.value)
            });
            filterStore.getAccountFiltersByAccountId(accountId);
            filterParametersCreate.value.pop();
        } catch (e) {
            console.error(e);
        }
    };

    async function getFilterParameters(filterId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/${filterId}/parameter`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            filterParameters.value = await response.json();
        } catch (e) {
            console.error(e);
        }

    };

    async function updateParameter(data: IParameterUpdateDto): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/update`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteParameter(parameterId: number): Promise<void> {
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/parameter/${parameterId}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            getParameters();
        } catch (e) {
            console.error(e);
        }
    };

    async function deleteFilterParameters(filterId: number, parameterId: number, accountId: number): Promise<void> {
        let idToDelete: (number | undefined) = 0;
        if (findIdToDelete(filterId, parameterId) != null) {
            idToDelete = findIdToDelete(filterId, parameterId)?.id;
        }
        try {
            let token = await getAccessTokenSilently();
            const response = await fetch(`https://${import.meta.env.VITE_AMZ_API}/filter/parameter/${idToDelete}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            filterStore.getAccountFiltersByAccountId(accountId);
        } catch (e) {
            console.error(e);
        }

    };

    const findIdToDelete = (filterId: number, parameterId: number) => {
        let filterParameterRelationship = filterParameters.value.find((e) => {
            if (filterId == e.filter && parameterId == e.parameter) {
                return e.id;
            }
        });
        return filterParameterRelationship;
    };

    return {
        parameters,
        parameterTypes,
        createFilterParameter, 
        deleteFilterParameters, 
        getParameterTypes,
        getParameters,
        createParameter,
        updateParameter,
        deleteParameter,
        getFilterParameters
    }
});
