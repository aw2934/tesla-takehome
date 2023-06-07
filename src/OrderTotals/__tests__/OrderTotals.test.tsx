import { render, screen } from '@testing-library/react';
import OrderTotals, { OrderTotalsProps } from '../OrderTotals';
import { formData } from '../../formData';
import { DeviceName } from '../../types';
import { generateTestData } from '../../generateTestData';
import { siteLayoutDataSingleRow } from './testFixtures';
import { aggregateTotals } from '../utils';

describe('<OrderTotals />', () => {
  const setup = (newProps?: Partial<OrderTotalsProps>) => {
    const props: OrderTotalsProps = {
      order: formData,
      siteLayoutData: [],
      ...newProps,
    };

    return render(<OrderTotals {...props} />);
  };

  it('renders expected ui - no batteries selected', () => {
    setup();

    expect(screen.getByText('Totals')).toBeInTheDocument();
    ['Required Dimensions', 'Energy Density', 'Price'].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('0 MWh')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('renders expected ui - batteries selected', () => {
    const props: OrderTotalsProps = {
      order: generateTestData({
        [DeviceName.MEGAPACK_2XL]: 2,
        [DeviceName.TRANSFORMER]: 1
      }),
      siteLayoutData: siteLayoutDataSingleRow,
    }

    setup(props);

    const totals = aggregateTotals(props.order, props.siteLayoutData);

    const labels = ['Required Dimensions', 'Energy Density', 'Price'];

    expect(screen.getByText('Totals')).toBeInTheDocument();
    labels.forEach(l => {
      expect(screen.getByText(l)).toBeInTheDocument();
      expect(screen.getByText(
        totals.find(
          ({ label }) => label === l
        )?.value as string
      )).toBeInTheDocument();
    });
  });
});
