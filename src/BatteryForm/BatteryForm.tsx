import React, { useEffect } from 'react';
import { DeviceName, FormData } from '../types';
import Text from '../Text';
import './BatteryForm.css';
import { getTransformerCount } from './utils';
import { DeviceRow } from './DeviceRow';

interface Props {
  order: FormData;
  setOrder: React.Dispatch<React.SetStateAction<FormData>>
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
      <div className="table-header">
        <div style={{ width: '33%' }} />
        <Text variant="h3" style={{ width: '25%' }}>Dimensions</Text>
        <Text variant="h3" style={{ flex: 1 }}>Energy Density</Text>
        <Text variant="h3">Price</Text>
      </div>
      <>
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
      </>
    </div>
  );
};

export default BatteryForm;
