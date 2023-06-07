import { render, screen } from '@testing-library/react';
import SiteLayout, { SiteLayoutProps } from '../SiteLayout';
import { siteLayoutDataMultipleRows, siteLayoutDataSingleRow } from '../../OrderTotals/__tests__/testFixtures';
import { LayoutData } from '../../RightPane/utils';

describe('<SiteLayout />', () => {
  const setup = (
    siteLayoutData: LayoutData[][] = siteLayoutDataSingleRow
  ) => render(<SiteLayout siteLayoutData={siteLayoutData} />);

  it('returns expected ui - no batteries selected', () => {
    setup([]);

    expect(screen.getByText('Site Layout:')).toBeInTheDocument();
  });

  it('returns expected ui - one row of batteries selected', () => {
    setup();

    expect(screen.getByText('Site Layout:')).toBeInTheDocument();
    expect(screen.getAllByTestId('site-layout-row')).toHaveLength(1)
    expect(screen.getAllByTestId('layout-item'))
      .toHaveLength(siteLayoutDataSingleRow[0].length)
  });

  it('returns expected ui - multiple rows of batteries selected', () => {
    setup(siteLayoutDataMultipleRows);

    expect(screen.getByText('Site Layout:')).toBeInTheDocument();
    expect(screen.getAllByTestId('site-layout-row')).toHaveLength(2)
    expect(screen.getAllByTestId('layout-item'))
      .toHaveLength(
        siteLayoutDataMultipleRows.reduce((acc, row) => acc + row.length, 0)
      )
  });
});
