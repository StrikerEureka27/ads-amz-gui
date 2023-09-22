import type { IAccount } from "./account.model";

export interface IFile {
    id: number;
    name: string;
    path: (string | undefined);
    fileData: (File | null);
    step: number;
    accountId: number;
    processed: boolean;
    createdAt: Date;
}

export interface IUploadFileDto extends Omit<IFile, 'id' | 'createdAt' | 'path' | 'accountId'> {};
  
