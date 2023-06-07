import { render, screen } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  it('renders content', () => {
    render(<App />);
    expect(document.querySelector('.app')).toBeInTheDocument();
    expect(document.querySelector('.form')).toBeInTheDocument();
    expect(document.querySelector('.right-pane')).toBeInTheDocument();
  });
});
