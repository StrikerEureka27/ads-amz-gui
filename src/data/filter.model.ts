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
    createdAt: Date;
    createdBy: string;
};

export interface IFilterCreateDto extends Omit<IFilter, 'id' | 'createdAt' | 'filterType'> {};
export interface IFilterUpdateDto extends Omit<IFilter, 'createdAt' | 'createdBy' | 'filterType'> {};  






