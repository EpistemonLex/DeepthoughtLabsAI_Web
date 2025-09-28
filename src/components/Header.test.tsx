import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render the logo with the correct text', () => {
    const logo = screen.getByText(/DEEPTHOUGHT LABS AI/);
    expect(logo).toBeInTheDocument();
    // Check for the corner brackets specifically
    expect(logo.textContent).toContain('⌈');
    expect(logo.textContent).toContain('⌉');
  });

  it('should render the main navigation links', () => {
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('should render the action links', () => {
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Join Waitlist')).toBeInTheDocument();
  });

  it('should render the main navigation landmark', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
