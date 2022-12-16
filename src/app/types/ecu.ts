export interface EcuDto {
  id: string;
  actualEcuId: string;
  targetEcuId: string;
  createdAt: string;
}

export type EcuSaveDto = Omit<EcuDto, 'id' | 'createdAt'>;
