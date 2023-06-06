import React, { useMemo } from 'react';
import { FormData } from '../types';
import { OrderTotals } from '../OrderTotals';
import { SiteLayout } from '../SiteLayout';
import './RightPane.css'

interface Props {
  order: FormData;
}

const RightPane: React.FC<Props> = ({ order }) => {
  // const siteLayoutData = useMemo(() => {

  // });

  return (
    <div className="right-pane">
      <OrderTotals order={order} />
      <SiteLayout order={order} />
    </div>
  );
};

export default RightPane;
