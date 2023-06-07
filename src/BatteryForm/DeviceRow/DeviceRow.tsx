import React from 'react';
import Text from '../../Text';
import { BatteryData, DeviceName } from '../../types';
import { formatCurrency } from '../utils';
import './DeviceRow.css';
import { BATTERY_COLOR_MAP } from '../../constants';
import { DetailBlockLabels } from './constants';

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
  const energyDensity = `${deviceData.energy} MWh`;
  const costPerUnit = `${formatCurrency(deviceData.cost)}/unit`

  return (
    <div
      className="device-row"
      style={{
        border: `2px solid ${BATTERY_COLOR_MAP[deviceName as DeviceName]}`
      }}
      data-testid="device-row"
    >
      <Text variant="h3" style={{ textAlign: 'center' }}>
        {deviceName.toUpperCase()}
      </Text>
      <div className="device-details">
        <DetailBlock label={DetailBlockLabels.DIMENSIONS} value={dimensions} />
        <DetailBlock label={DetailBlockLabels.ENERGY_DENSITY} value={energyDensity} />
        <DetailBlock label={DetailBlockLabels.PRICE} value={costPerUnit} />
      </div>
      <div className="input-container">
          <Text variant="h4">Quantity:</Text>
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
  );
};

const DetailBlock: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <Text variant="h4" style={{ color: '#51504D' }}>{label}</Text>
    <Text style={{ fontWeight: 'bold', marginTop: 2 }}>{value}</Text>
  </div>
);

export default DeviceRow;
