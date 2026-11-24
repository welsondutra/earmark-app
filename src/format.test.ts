import { describe, expect, it } from 'vitest';
import { formatMinutes, formatTime, matches } from './format';

describe('format', () => {
  it('formats short and long times', () => {
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(3725)).toBe('1:02:05');
    expect(formatTime(-3)).toBe('0:00');
  });

  it('rounds minutes up to at least one', () => {
    expect(formatMinutes(1965)).toBe('33 min');
    expect(formatMinutes(10)).toBe('1 min');
  });

  it('searches without caring about accents or case', () => {
    expect(matches('Segurança digital', 'seguranca')).toBe(true);
    expect(matches('Segurança digital', 'PHP')).toBe(false);
  });
});
