export interface BaselineDto {
  id: string;
  actualPartNumber: string;
  targetPartNumber: string;
  createdAt: string;
}

export type BaselineSaveDto = Omit<BaselineDto, 'id' | 'createdAt'>;
