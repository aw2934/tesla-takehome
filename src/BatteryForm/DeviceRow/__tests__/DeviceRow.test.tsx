import { render, screen } from '@testing-library/react';
import DeviceRow from '../DeviceRow';
import { generateTestData } from '../../../generateTestData';
import { DeviceName } from '../../../types';
import { DetailBlockLabels } from '../constants';
import { formatCurrency } from '../../utils';
import userEvent from '@testing-library/user-event';

describe('<DeviceRow />', () => {
  const mockOnChange = jest.fn();

  const props = {
    deviceName: 'Megapack 2XL',
    deviceData: generateTestData({
      [DeviceName.MEGAPACK_2XL]: 1
    })[DeviceName.MEGAPACK_2XL],
    onChange: mockOnChange,
  }

  beforeEach(() => {
    render(<DeviceRow {...props} />);
  })

  it('renders expected ui', () => {
    const expectedDimensionsText =
      `${props.deviceData.width}FT x ${props.deviceData.depth}FT`;
    const expectedEnergyDensityText = `${props.deviceData.energy} MWh`;
    const expectedCostPerUnit = `${formatCurrency(props.deviceData.cost)}/unit`;

    expect(screen.getByText(props.deviceName.toUpperCase())).toBeInTheDocument();
    Object.values(DetailBlockLabels).forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(screen.getByText(expectedDimensionsText)).toBeInTheDocument();
    expect(screen.getByText(expectedEnergyDensityText)).toBeInTheDocument();
    expect(screen.getByText(expectedCostPerUnit)).toBeInTheDocument();
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('calls onChange when change value in input', () => {
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, '2');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('does not allow user to type non-numeric characters in input', () => {
    const input = screen.getByRole('spinbutton');
    userEvent.type(input, 'abcd');
    userEvent.type(input, '.');
    expect(mockOnChange).not.toHaveBeenCalled();
  })
});
