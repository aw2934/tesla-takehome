import { DeviceName, FormData } from "../types";

export const formatCurrency = (cost: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return formatter.format(cost);
};

export const getTransformerCount = (data: FormData): number => {
  const numBatteries = Object.entries(data).reduce(
    (acc, [name, { amount }]) => {
      if (name === DeviceName.TRANSFORMER) return acc;
      return acc + amount;
    },
    0
  );

  return Math.ceil(numBatteries / 4);
};
