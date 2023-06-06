import React, { useMemo } from 'react';
import { DeviceName, FormData } from '../types';
import { OrderTotals } from '../OrderTotals';
import { SiteLayout } from '../SiteLayout';
import './RightPane.css'
import { buildLayout } from './utils';

interface Props {
  order: FormData;
}

const RightPane: React.FC<Props> = ({ order }) => {
  const siteLayoutData = useMemo(
    () => buildLayout(order),
    [
      order[DeviceName.MEGAPACK_2XL],
      order[DeviceName.MEGAPACK_2],
      order[DeviceName.MEGAPACK],
      order[DeviceName.POWERPACK],
      order[DeviceName.TRANSFORMER],
    ]
  );

  return (
    <div className="right-pane">
      <OrderTotals order={order} />
      <SiteLayout siteLayoutData={siteLayoutData} />
    </div>
  );
};

export default RightPane;
