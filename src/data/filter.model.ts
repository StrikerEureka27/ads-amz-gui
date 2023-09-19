import type { IParameter } from "./parameter.model";

export interface IFilterType {
    id: number;
    name: string;
}

export interface IFilter {
    id: number;
    name: string;
    header: string;
    reference: string;
    type: number;
    filterType: IFilterType;
    active: boolean;
    level: number;
    parameters: IParameter[],
    createdAt: Date;
    createdBy: string;
};

export interface IAccountFilter {
    id:  number;
    account: number;
    filter: number;
}

export interface IAccountFiltersCreateDto extends Omit<IAccountFilter, 'id'> {};
export interface IFilterCreateDto extends Omit<IFilter, 'id' | 'createdAt' | 'filterType' | 'parameters'> {};
export interface IFilterUpdateDto extends Omit<IFilter, 'createdAt' | 'createdBy' | 'filterType' | 'parameters'> {};  






