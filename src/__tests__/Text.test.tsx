import { render, screen } from '@testing-library/react';
import Text from '../Text';

describe('<Text />', () => {
  it('renders expected ui', () => {
    render(<Text>Test</Text>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
