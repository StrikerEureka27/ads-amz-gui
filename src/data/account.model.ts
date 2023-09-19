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
    createdAt: Date;
    createdBy: string;
    active: boolean;
    sheet: number;
    filters: IFilter[];
    references: IReference[];
};

export interface IAccountCreateDto extends Omit<IAccount, 'id' | 'createdAt' | 'filters' | 'references'> {};
export interface IAccountUpdateDto extends Omit<IAccount, 'createdAt' | 'createdBy' | 'filters' | 'references'> {};  


