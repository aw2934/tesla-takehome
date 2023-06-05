import { FormData, DeviceName } from './types';

export const formData: FormData = {
  [DeviceName.MEGAPACK_2XL]: {
    width: 40,
    depth: 10,
    energy: 4,
    cost: 120000,
    amount: 0,
    releaseDate: '2022',
  },
  [DeviceName.MEGAPACK_2]: {
    width: 30,
    depth: 10,
    energy: 3,
    cost: 80000,
    amount: 0,
    releaseDate: '2021',
  },
  [DeviceName.MEGAPACK]: {
    width: 30,
    depth: 10,
    energy: 2,
    cost: 50000,
    amount: 0,
    releaseDate: '2005',
  },
  [DeviceName.POWERPACK]: {
    width: 10,
    depth: 10,
    energy: 1,
    cost: 20000,
    amount: 0,
    releaseDate: '2000',
  },
  [DeviceName.TRANSFORMER]: {
    width: 10,
    depth: 10,
    energy: -0.25,
    amount: 0,
    cost: 10000,
  },
};
