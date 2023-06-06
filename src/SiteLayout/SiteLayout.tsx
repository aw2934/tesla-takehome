import React, { useState } from 'react';
import './SiteLayout.css';
import { LayoutData } from '../RightPane/utils';
import { DeviceName } from '../types';
import Text from '../Text';

interface Props {
  siteLayoutData: LayoutData[][];
}

interface LayoutItemProps {
  layoutItem: LayoutData;
}

interface BaseItemProps extends LayoutItemProps {
  width: string;
  backgroundColor: string;
}

const SiteLayout: React.FC<Props> = ({ siteLayoutData }) => {
  return (
    <div className="site-layout-container">
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
      return <BaseItem width="40%" backgroundColor="#D33F49" layoutItem={layoutItem} />;
    case DeviceName.MEGAPACK_2:
      return <BaseItem width="30%" backgroundColor="#5C946E" layoutItem={layoutItem} />;
    case DeviceName.MEGAPACK:
      return <BaseItem width="30%" backgroundColor="#657ED4" layoutItem={layoutItem} />;
    case DeviceName.POWERPACK: {
      return <BaseItem width="10%" backgroundColor="#F6AE2D" layoutItem={layoutItem}/>;
    }
    case DeviceName.TRANSFORMER:
    default:
      return <BaseItem width="10%" backgroundColor="#605D53" layoutItem={layoutItem} />;  
  }
}

const BaseItem: React.FC<BaseItemProps> = ({
  width,
  backgroundColor,
  layoutItem
}) => {
  const [isHovering, setIsHovering] = useState(false);

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
          <Text style={{ fontWeight: 600 }}>
            {layoutItem.deviceName.toUpperCase()}
          </Text>
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
