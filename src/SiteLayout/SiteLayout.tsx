import React from 'react';
import './SiteLayout.css';
import { LayoutData } from '../RightPane/utils';
import { DeviceName } from '../types';

interface Props {
  siteLayoutData: LayoutData[][];
}

interface LayoutItemProps {
  layoutItem: LayoutData;
}

const SiteLayout: React.FC<Props> = ({ siteLayoutData }) => {
  return (
    <div className="site-layout-container">
      {siteLayoutData.map(row => (
        <div className="site-layout-row">
          {row.map(item => <LayoutItem layoutItem={item} />)}
        </div>
      ))}
    </div>
  );
};

const LayoutItem: React.FC<LayoutItemProps> = ({ layoutItem }) => {
  switch (layoutItem.deviceName) {
    case DeviceName.MEGAPACK_2XL:
      return <BaseItem width="40%" backgroundColor="#D33F49" />;
    case DeviceName.MEGAPACK_2:
      return <BaseItem width="30%" backgroundColor="#5C946E" />
    case DeviceName.MEGAPACK:
      return <BaseItem width="30%" backgroundColor="#657ED4" />
    case DeviceName.POWERPACK: {
      return <BaseItem width="10%" backgroundColor="#F6AE2D" />
    }
    case DeviceName.TRANSFORMER:
    default:
      return <BaseItem width="10%" backgroundColor="#605D53" />  
  }
}

const BaseItem: React.FC<{ width: string; backgroundColor: string; }> = ({ width, backgroundColor }) => (
  <div
    style={{
      width,
      backgroundColor,
      height: '64px',
      boxShadow: 'inset 0px 0px 0px 4px #E6DBD0'
    }}
  />
);

export default SiteLayout;
