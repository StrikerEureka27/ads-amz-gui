export interface IFile {
    id: number;
    name: string;
    path: string;
    fileData: (File | null);
    processed: boolean;
    createdAt: Date;
}

export interface IUploadFileDto extends Omit<IFile, 'id' | 'createdAt' | 'path'> {};
  
