export interface IFile {
    id: number;
    name: string;
    path: (string | undefined);
    fileData: (File | null);
    step: number;
    processed: boolean;
    createdAt: Date;
}

export interface IUploadFileDto extends Omit<IFile, 'id' | 'createdAt' | 'path'> {};
  
