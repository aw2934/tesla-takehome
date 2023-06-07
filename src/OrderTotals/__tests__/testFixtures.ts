import { LayoutData } from "../../RightPane/utils";
import { DeviceName } from "../../types";

export const siteLayoutDataSingleRow: LayoutData[][] = [
  [
    { deviceName: DeviceName.MEGAPACK_2XL, width: 40, energy: 4, cost: 120000 },
    { deviceName: DeviceName.MEGAPACK_2XL, width: 40, energy: 4, cost: 120000 },
    { deviceName: DeviceName.TRANSFORMER, width: 10, energy: -0.25, cost: 10000 },
  ],
];

export const siteLayoutDataMultipleRows: LayoutData[][] = [
  [
    { deviceName: DeviceName.MEGAPACK_2XL, width: 40, energy: 4, cost: 120000 },
    { deviceName: DeviceName.MEGAPACK_2XL, width: 40, energy: 4, cost: 120000 },
    { deviceName: DeviceName.TRANSFORMER, width: 10, energy: -0.25, cost: 10000 },
  ],
  [
    { deviceName: DeviceName.MEGAPACK_2, width: 30, energy: 3, cost: 80000 },
  ]
];
