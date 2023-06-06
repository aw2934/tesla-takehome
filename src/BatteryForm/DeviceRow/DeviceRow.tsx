import React from 'react';
import Text from '../../Text';
import { BatteryData, DeviceName } from '../../types';
import { formatCurrency } from '../utils';
import './DeviceRow.css';
import { BATTERY_COLOR_MAP } from '../../constants';

interface Props {
  deviceName: string;
  deviceData: BatteryData;
  onChange: (value: string) => void;
}

const DeviceRow: React.FC<Props> = ({
  deviceName,
  deviceData,
  onChange
}) => {
  const dimensions = `${deviceData.width}FT x ${deviceData.depth}FT`;
  const energyOutput = `${deviceData.energy} MWh`;
  const costPerUnit = `${formatCurrency(deviceData.cost)}/unit`

  return (
    <div
      className="device-row"
      style={{
        border: `2px solid ${BATTERY_COLOR_MAP[deviceName as DeviceName]}`
      }}
    >
      <div className="device-row-top">
        <Text variant="h2" style={{ width: '33%' }}>{deviceName.toUpperCase()}</Text>
        <Text variant="h3" style={{ width: '25%' }}>{dimensions}</Text>
        <Text variant="h3">{energyOutput}</Text>
        <Text variant="h3" style={{ fontSize: '14px', flex: 1, textAlign: 'right' }}>{costPerUnit}</Text>
      </div>
      <div className="device-row-bottom">
        {/* image here */}
        <p>image</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text variant="h3" style={{ fontSize: '14px' }}>Amount:</Text>
          <input
            className="input"
            value={deviceData.amount ?? 0}
            onChange={e => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === '.') e.preventDefault();
            }}
            type="number"
            min={0}
            disabled={deviceName === DeviceName.TRANSFORMER}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceRow;
