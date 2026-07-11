import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./router', () => ({
  default: () => <main data-testid="app-router" />,
}));

describe('App', () => {
  it('renders the routed application shell', () => {
    render(<App />);

    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });
});
