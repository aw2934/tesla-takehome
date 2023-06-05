import React from 'react';
import { BatteryData, FormData } from '../types';
import Text from '../Text';
import './BatteryForm.css';
import { formatCurrency } from './utils';

interface Props {
  order: FormData;
  setOrder: React.Dispatch<React.SetStateAction<FormData>>
}

interface DeviceRowProps {
  deviceName: string;
  deviceData: BatteryData;
  onChange: (value: string) => void;
}

const BatteryForm: React.FC<Props> = ({ order, setOrder }) => {
  const orderValues = Object.entries(order);

  return (
    <div>
      {orderValues.map(([deviceName, deviceData]) => (
        <DeviceRow
          deviceName={deviceName.toUpperCase()}
          deviceData={deviceData}
          onChange={() => null}
        />
      ))}
    </div>
  );
};

const DeviceRow: React.FC<DeviceRowProps> = ({
  deviceName,
  deviceData,
  onChange
}) => {
  const dimensions = `${deviceData.width}FT x ${deviceData.depth}FT`;
  const energyOutput = `${deviceData.energy} MWh`;
  const costPerUnit = `${formatCurrency(deviceData.cost)}/unit`

  return (
    <div className="device-row">
      {/* Top row: name and data */}
      {/* bottom row: image and amount */}
      <div className="device-row-top">
        <Text variant="h2" style={{ width: '33%' }}>{deviceName}</Text>
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
          />
        </div>
      </div>
    </div>
  );
};

export default BatteryForm;
