import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page Integration', () => {
  it('should render all major layout components', () => {
    render(<Home />);

    // Check for the header by its role
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Check for the main content area
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    // Check for the footer by its role
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
