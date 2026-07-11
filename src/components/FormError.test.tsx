import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FormError from './FormError';

describe('FormError', () => {
  it('renders an accessible alert when a message is provided', () => {
    render(<FormError id="email-error" message="Email obligatoire" />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('id', 'email-error');
    expect(alert).toHaveTextContent('Email obligatoire');
  });

  it('renders nothing without message', () => {
    const { container } = render(<FormError />);

    expect(container).toBeEmptyDOMElement();
  });
});
