export interface IFormula {
    id: number;
    name: string;
    header: string;
    pattern: string;
    level: number;
};

export interface IFormulaCreateDto extends Omit<IFormula, 'id'> {};

