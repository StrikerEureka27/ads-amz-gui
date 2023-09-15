import type { IFilter } from "./filter.model";
import type { IReference } from "./reference.model";

export interface AccountconfigurationStep {
    id: number;
    name: string;
    path: string;
};

export interface IAccount {
    id: number;
    name: string;
    sheet: number;
    active: boolean;
    filters: IFilter[];
    references: IReference[];
    createdAt: Date;
    createdBy: string;
};

export interface IAccountCreateDto extends Omit<IAccount, 'id' | 'createdAt' | 'filters' | 'references'> {};
export interface IAccountUpdateDto extends Omit<IAccount, 'createdAt' | 'createdBy' | 'filters' | 'references'> {};  


