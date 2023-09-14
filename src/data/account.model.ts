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
    createdAt: Date;
    createdBy: string;
};

export interface IAccountCreateDto extends Omit<IAccount, 'id' | 'createdAt'> {};
export interface IAccountUpdateDto extends Omit<IAccount, 'createdAt' | 'createdBy'> {};  


