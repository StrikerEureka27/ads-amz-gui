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
};



export interface IReferenceCreateDto extends Omit<IReference, 'id' | 'referenceType'> {};
export interface IReferenceUpdateDto extends Omit<IReference, 'referenceType'> {};  



