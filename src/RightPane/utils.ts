import { BatteryData, DeviceName, FormData } from "../types";

export type LayoutData = Omit<BatteryData, 'depth' | 'amount' | 'releaseDate'> & {
  deviceName: DeviceName;
};

const MAX_WIDTH = 100;

export const buildLayout = (order: FormData): LayoutData[][] => {
  const batteryCountMap = Object.entries(order).reduce((acc: Record<string, number>, [deviceName, { amount }]) => {
    if (amount > 0) acc[deviceName] = amount;
    return acc;
  },
  {});

  const checkAddable = (deviceName: DeviceName, rowWidth: number): boolean => {
    const { width: deviceWidth } = order[deviceName];
    return batteryCountMap.hasOwnProperty(deviceName)
      && rowWidth + deviceWidth <= 100
  }

  const addLayoutItem = (
    deviceName: DeviceName,
    currentRow: LayoutData[]
  ): void => {
    const { width, energy, cost } = order[deviceName];
    const layoutItem: LayoutData = {
      deviceName,
      width,
      energy,
      cost,
    };
    currentRow.push(layoutItem);
    batteryCountMap[deviceName] -= 1;

    if (batteryCountMap[deviceName] === 0) {
      delete batteryCountMap[deviceName];
    }
  };

  const siteLayout: LayoutData[][] = [];

  while (Object.keys(batteryCountMap).length > 0) {
    siteLayout.push([]);
    const currentRow = siteLayout[siteLayout.length - 1];
    let rowWidth = 0;

    while (rowWidth < MAX_WIDTH) {
      if (checkAddable(DeviceName.MEGAPACK_2XL, rowWidth)) {
        addLayoutItem(DeviceName.MEGAPACK_2XL, currentRow)
        rowWidth += order[DeviceName.MEGAPACK_2XL].width;
      } else if (checkAddable(DeviceName.MEGAPACK_2, rowWidth)) {
        addLayoutItem(DeviceName.MEGAPACK_2, currentRow)
        rowWidth += order[DeviceName.MEGAPACK_2].width;
      } else if (checkAddable(DeviceName.MEGAPACK, rowWidth)) {
        addLayoutItem(DeviceName.MEGAPACK, currentRow);
        rowWidth += order[DeviceName.MEGAPACK].width;
      } else if (checkAddable(DeviceName.POWERPACK, rowWidth)) {
        addLayoutItem(DeviceName.POWERPACK, currentRow);
        rowWidth += order[DeviceName.POWERPACK].width;
      } else if (checkAddable(DeviceName.TRANSFORMER, rowWidth)) {
        addLayoutItem(DeviceName.TRANSFORMER, currentRow);
        rowWidth += order[DeviceName.TRANSFORMER].width;
      } else {
        break;
      }
    }
  }

  return siteLayout;
};
