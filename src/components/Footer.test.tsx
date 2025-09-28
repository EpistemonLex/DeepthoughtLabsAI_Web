import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render the logo and copyright notice', () => {
    const logo = screen.getByText(/DEEPTHOUGHT LABS AI/);
    expect(logo).toBeInTheDocument();

    const copyright = screen.getByText(/© \d{4} Deepthought Labs\. All rights reserved\./);
    expect(copyright).toBeInTheDocument();
  });

  it('should render the column headings', () => {
    expect(screen.getByRole('heading', { name: /Product/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Company/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Legal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Social/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Revision/i })).toBeInTheDocument();
  });

  it('should render placeholder links', () => {
    // Spot check a few links from different columns
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('should display the revision letter', () => {
    // Check for the revision letter, which is inside a span
    const revision = screen.getByText('A');
    expect(revision).toBeInTheDocument();
    // Ensure it's under the correct heading
    const revisionHeading = screen.getByRole('heading', { name: /Revision/i });
    expect(revision.closest('div')).toEqual(revisionHeading.closest('div'));
  });
});
