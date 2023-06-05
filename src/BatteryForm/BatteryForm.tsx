import React, { useEffect, useMemo } from 'react';
import { BatteryData, DeviceName, FormData } from '../types';
import Text from '../Text';
import './BatteryForm.css';
import { formatCurrency, getTransformerCount } from './utils';

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
  useEffect(() => {
    const numTransformers = getTransformerCount(order);
    setOrder({
      ...order,
      [DeviceName.TRANSFORMER]: {
        ...order[DeviceName.TRANSFORMER],
        amount: numTransformers,
      }
    });
  }, [
    order[DeviceName.MEGAPACK_2XL],
    order[DeviceName.MEGAPACK_2],
    order[DeviceName.MEGAPACK],
    order[DeviceName.POWERPACK],
  ]);

  const orderValues = Object.entries(order);

  return (
    <div>
      {orderValues.map(([deviceName, deviceData]) => {
        const onChange = (value: string) => {
          let numValue = Number(value);
          if (Number.isNaN(numValue) || numValue < 0) numValue = 0;

          setOrder({
            ...order,
            [deviceName]: {
              ...order[deviceName as DeviceName],
              amount: Number(value),
            }
          });
        };

        return (
          <DeviceRow
            key={deviceName}
            deviceName={deviceName}
            deviceData={deviceData}
            onChange={onChange}
          />
        );
      })}
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
            type="number"
            min={0}
            disabled={deviceName === DeviceName.TRANSFORMER}
          />
        </div>
      </div>
    </div>
  );
};

export default BatteryForm;
