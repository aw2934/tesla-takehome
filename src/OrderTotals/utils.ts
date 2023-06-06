import { formatCurrency } from '../BatteryForm/utils';
import { LayoutData } from '../RightPane/utils';
import { FormData } from '../types';
import { TotalsBlockProps } from './OrderTotals';

export const aggregateTotals = (data: FormData, siteLayoutData: LayoutData[][]): TotalsBlockProps[] => {
  const aggregates = Object.values(data).reduce((acc, { energy, cost, amount }) => {
    acc.energy += energy * amount;
    acc.price += cost * amount;
    return acc;
  }, {
    energy: 0,
    price: 0,
  })

  return [
    {
      label: 'Required Dimensions',
      value: getDimensions(siteLayoutData),
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
};

export const getDimensions = (siteLayoutData: LayoutData[][]): string => {
  const rowWidths = siteLayoutData.map(row => (
    row.reduce((acc, { width }) => acc + width, 0)
  ));

  const siteWidth = Math.max(...rowWidths);
  const siteDepth = rowWidths.length * 10;
  
  return siteWidth > 0 ? `${siteWidth}FT x ${siteDepth}FT` : '-';
};
