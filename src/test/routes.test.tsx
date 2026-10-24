import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('routes', () => {
  it('renders the home page', async () => {
    window.history.pushState({}, 'Home', '/');
    render(<App />);
    expect(await screen.findByRole('heading', { name: /Know your stock/i })).toBeInTheDocument();
  });

  it('renders pricing page', async () => {
    window.history.pushState({}, 'Pricing', '/pricing');
    render(<App />);
    expect(await screen.findByRole('heading', { name: /A plan that fits the way you work/i })).toBeInTheDocument();
  });

  it('renders an industry detail page', async () => {
    window.history.pushState({}, 'Industry', '/industries/pharmacies-and-drugstores');
    render(<App />);
    expect(await screen.findByRole('heading', { name: /Pharmacies and drugstores/i })).toBeInTheDocument();
  });

  it.each([
    { slug: 'retail', heading: /Run your store with one live stock truth/i },
    { slug: 'wholesale', heading: /Sell in bulk without losing control/i },
    { slug: 'distribution', heading: /Move stock faster between suppliers/i },
    { slug: 'manufacturing', heading: /Inventory, purchasing and dispatch/i },
  ])('renders the $slug solutions page', async ({ slug, heading }) => {
    window.history.pushState({}, slug, `/solutions/${slug}`);
    render(<App />);
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
  });

  it('renders not found for unknown route', async () => {
    window.history.pushState({}, 'Nope', '/nope');
    render(<App />);
    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument();
  });
});
