import { describe, it, expect } from 'vitest';
import { sum } from '../src/utils';

describe('sum', () => {
  it('should return the sum of two numbers', () => {
    // Arrange
    const a = 1;
    const b = 2;
    const expected = 3;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(expected);
  });
});
