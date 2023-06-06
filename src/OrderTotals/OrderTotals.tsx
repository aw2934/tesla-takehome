import React from 'react';
import './OrderTotals.css'
import Text from '../Text';
import { FormData } from '../types';
import { aggregateTotals } from './utils';

interface Props {
  order: FormData;
}

export interface TotalsBlockProps {
  label: string;
  value: string | number;
}

const OrderTotals: React.FC<Props> = ({ order }) => {
  const totals = aggregateTotals(order);
  return (
    <div className="order-totals">
      <Text variant="h1">Totals</Text>
      <div className="totals-data">
        {totals.map(({ label, value }) => (
          <TotalsBlock label={label} value={value} key={label} />
        ))}
      </div>
    </div>
  );
};

const TotalsBlock: React.FC<TotalsBlockProps> = ({ label, value }) => (
  <div className="totals-block">
    <Text variant="h2" style={{ marginBottom: 8 }}>{label}</Text>
    <Text variant="h3">{value}</Text>
  </div>
)

export default OrderTotals;
