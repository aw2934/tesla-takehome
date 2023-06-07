import React, { useState } from 'react';
import './SiteLayout.css';
import { LayoutData } from '../RightPane/utils';
import { DeviceName } from '../types';
import Text from '../Text';
import { BATTERY_COLOR_MAP } from '../constants';

interface Props {
  siteLayoutData: LayoutData[][];
}

interface LayoutItemProps {
  layoutItem: LayoutData;
}

interface BaseItemProps extends LayoutItemProps {
  width: string;
}

const SiteLayout: React.FC<Props> = ({ siteLayoutData }) => {
  return (
    <div className="site-layout-container">
      <Text variant="h1" style={{ marginBottom: '8px' }}>Site Layout:</Text>
      {siteLayoutData.map((row, i) => (
        // I'm aware that i is a suboptimal key, but given the use case,
        // it shouldn't cause any issues here
        <div className="site-layout-row" key={i}>
          {row.map((item, j) => (
            <LayoutItem layoutItem={item} key={`${item.deviceName}${i}${j}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

const LayoutItem: React.FC<LayoutItemProps> = ({ layoutItem }) => {
  switch (layoutItem.deviceName) {
    case DeviceName.MEGAPACK_2XL:
      return <BaseItem width="40%" layoutItem={layoutItem} />;
    case DeviceName.MEGAPACK_2:
      return <BaseItem width="30%" layoutItem={layoutItem} />;
    case DeviceName.MEGAPACK:
      return <BaseItem width="30%" layoutItem={layoutItem} />;
    case DeviceName.POWERPACK:
      return <BaseItem width="10%" layoutItem={layoutItem}/>;
    case DeviceName.TRANSFORMER:
    default:
      return <BaseItem width="10%" layoutItem={layoutItem} />;  
  }
}

const BaseItem: React.FC<BaseItemProps> = ({ width, layoutItem }) => {
  const [isHovering, setIsHovering] = useState(false);
  const backgroundColor = BATTERY_COLOR_MAP[layoutItem.deviceName];

  return (
    <div
      style={{
        width,
        backgroundColor,
        height: '64px',
        boxShadow: 'inset 0px 0px 0px 4px #E6DBD0',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="tooltip">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <div className="tooltip-swatch" style={{ backgroundColor }} />
            <Text style={{ fontWeight: 600 }}>
              {layoutItem.deviceName.toUpperCase()}
            </Text>
          </span>
          <Text variant="body2" style={{ margin: '4px 0' }}>
            {`${layoutItem.width}FT x 10FT`}
          </Text>
          <Text variant="body2">
            {`${layoutItem.energy} MWh`}
          </Text>
        </div>
      )}
    </div>
  );
};

export default SiteLayout;
