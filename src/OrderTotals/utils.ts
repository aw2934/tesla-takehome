import { formatCurrency } from '../BatteryForm/utils';
import { FormData } from '../types';
import { TotalsBlockProps } from './OrderTotals';

export const aggregateTotals = (data: FormData): TotalsBlockProps[] => {
  const aggregates = Object.values(data).reduce((acc, { width, energy, cost, amount }) => {
    acc.width += width * amount;
    acc.energy += energy * amount;
    acc.price += cost * amount;
    return acc;
  }, {
    width: 0,
    energy: 0,
    price: 0,
  })

  return [
    {
      label: 'Required Dimensions',
      value: '',
    },
    {
      label: 'Energy Density',
      value: `${aggregates.energy} MWh`,
    },
    {
      label: 'Price',
      value: formatCurrency(aggregates.price),
    },
  ];
}