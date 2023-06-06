import { DeviceName, FormData } from "./types"

type BatteryAmounts = Partial<Record<DeviceName, number>>;

export const generateTestData = (orderAmounts?: BatteryAmounts): FormData => ({
  [DeviceName.MEGAPACK_2XL]: {
    width: 40,
    depth: 10,
    energy: 4,
    cost: 120000,
    amount: orderAmounts?.[DeviceName.MEGAPACK_2XL] || 0,
    releaseDate: '2022',
  },
  [DeviceName.MEGAPACK_2]: {
    width: 30,
    depth: 10,
    energy: 3,
    cost: 80000,
    amount: orderAmounts?.[DeviceName.MEGAPACK_2] || 0,
    releaseDate: '2021',
  },
  [DeviceName.MEGAPACK]: {
    width: 30,
    depth: 10,
    energy: 2,
    cost: 50000,
    amount: orderAmounts?.[DeviceName.MEGAPACK] || 0,
    releaseDate: '2005',
  },
  [DeviceName.POWERPACK]: {
    width: 10,
    depth: 10,
    energy: 1,
    cost: 20000,
    amount: orderAmounts?.[DeviceName.POWERPACK] || 0,
    releaseDate: '2000',
  },
  [DeviceName.TRANSFORMER]: {
    width: 10,
    depth: 10,
    energy: -0.25,
    amount: orderAmounts?.[DeviceName.TRANSFORMER] || 0,
    cost: 10000,
  },
})