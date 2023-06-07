import { render, screen } from '@testing-library/react';
import BatteryForm from "../BatteryForm";
import { formData } from '../../formData';

describe('<BatteryForm />', () => {
  it('renders expected ui', () => {
    render(<BatteryForm order={formData} setOrder={jest.fn()} />);
    expect(screen.getAllByTestId('device-row')).toHaveLength(5);
  });
});
