import type { IReference } from "./reference.model";

export interface IFormula {
    id: number;
    name: string;
    header: string;
    pattern: string;
    references: IReference[];
    level: number;
};

export interface IAccountFormula {
    id:  number;
    account: number;
    formula: number;
};


export interface IFormulaReference {
    id:  number;
    formula: number;
    reference: number;
};

export interface IAccountFormulaCreateDto extends Omit<IAccountFormula, 'id' > {};
export interface IAccountFormulaReferenceCreateDto extends Omit<IFormulaReference, 'id' > {};
export interface IFormulaCreateDto extends Omit<IFormula, 'id' | 'references' > {};

