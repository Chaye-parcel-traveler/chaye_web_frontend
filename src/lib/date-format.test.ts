import { describe, expect, it } from 'vitest';

import { formatFrenchDate, formatFrenchDateTime } from './date-format';

describe('French date formatting', () => {
  it('formats a calendar date without Moment', () => {
    expect(formatFrenchDate('2026-06-29T12:30:00Z')).toBe('29/06/2026');
  });

  it('formats a readable date and time', () => {
    expect(formatFrenchDateTime('2026-06-29T12:30:00Z')).toContain(
      '29 juin 2026'
    );
  });
});
