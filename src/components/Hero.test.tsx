import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock the animation components as they are not relevant to the hero's own behavior
jest.mock('./WorkflowAnimation', () => {
  const MockedWorkflowAnimation = () => <div data-testid="workflow-animation" />;
  MockedWorkflowAnimation.displayName = 'WorkflowAnimation';
  return MockedWorkflowAnimation;
});

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it('should render the main headline', () => {
    // Use a regex to find the heading text, ignoring case and whitespace
    const headline = screen.getByRole('heading', {
      name: /your expertise, amplified\. your data, sovereign\./i,
    });
    expect(headline).toBeInTheDocument();
  });

  it('should render the sub-headline text', () => {
    const subheadline = screen.getByText(/We build high-fidelity digital partners/i);
    expect(subheadline).toBeInTheDocument();
  });

  it('should render the primary call-to-action button', () => {
    const ctaButton = screen.getByText('Join the Waitlist');
    expect(ctaButton).toBeInTheDocument();
  });

  it('should render the scroll down indicator', () => {
    // The scroll indicator is an SVG, so we can look for its path data
    const scrollIcon = document.querySelector('svg path[d="m19.5 8.25-7.5 7.5-7.5-7.5"]');
    expect(scrollIcon).toBeInTheDocument();
  });

  it('should render the workflow animation placeholder', () => {
    const workflowAnimation = screen.getByTestId('workflow-animation');
    expect(workflowAnimation).toBeInTheDocument();
  });
});
