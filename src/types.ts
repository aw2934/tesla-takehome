export interface BatteryData {
  width: number;
  depth: number;
  energy: number;
  cost: number;
  amount: number;
  releaseDate?: string;
}

export enum DeviceName {
  MEGAPACK_2XL = 'megapack 2xl',
  MEGAPACK_2 = 'megapack 2',
  MEGAPACK = 'megapack',
  POWERPACK = 'powerpack',
  TRANSFORMER = 'transformer',
}

export type FormData = Record<DeviceName, BatteryData>;

