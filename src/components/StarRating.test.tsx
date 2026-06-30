import { render, screen } from '@testing-library/react';

import StarRating from './StarRating';

describe('StarRating', () => {
  it('submits the selected rating under the expected field name', () => {
    render(<StarRating name="ratingStars" />);

    expect(screen.getByRole('combobox')).toHaveAttribute('name', 'ratingStars');
    expect(screen.getByRole('combobox')).toHaveValue('1');
  });

  it('exposes a readable label when the rating is read-only', () => {
    render(<StarRating name="ratingStars" readOnly value={4} />);

    expect(screen.getByLabelText('Note : 4 sur 5')).toHaveTextContent('★★★★☆');
  });
});
