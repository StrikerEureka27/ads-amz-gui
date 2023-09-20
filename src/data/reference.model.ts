export interface IReferenceType {
    id: number;
    name: string;
    description: string;
};

export interface IReference {
    id: number;
    name: string;
    header: string;
    value: (string | null);
    type: number;
    referenceType: IReferenceType,
    level: number;
    assigned?: boolean;
};


export interface IAccountReference {
    id:  number;
    account: number;
    reference: number;
};

export interface IReferenceCreateDto extends Omit<IReference, 'id' | 'referenceType'> {};
export interface IAccountReferencesCreateDto extends Omit<IAccountReference, 'id'> {};
export interface IReferenceUpdateDto extends Omit<IReference, 'referenceType'> {};  



