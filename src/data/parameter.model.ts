export interface IParameterType {
    id: number;
    name: string;
}

export interface IParameter {
    id: number;
    name: string;
    value: string;
    type: number;
    paramterType: IParameterType;
};

export interface IParameterCreateDto extends Omit<IParameter, 'id' | 'paramterType'> {};
export interface IParameterUpdateDto extends Omit<IParameter, 'paramterType'> {};  

