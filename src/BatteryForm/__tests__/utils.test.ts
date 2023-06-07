import { generateTestData } from '../../generateTestData';
import { DeviceName } from '../../types';
import { formatCurrency, getTransformerCount } from '../utils';

describe('BatteryForm - utils', () => {
  describe('formatCurrency', () => {
    it('returns expected value - whole number', () => {
      const expected = '$10,000';
      const result = formatCurrency(10000);
      expect(result).toBe(expected);
    });

    it('returns expected value - zero', () => {
      const expected = '$0';
      const result = formatCurrency(0);
      expect(result).toBe(expected);
    });

    it('returns expected value - with cents', () => {
      const expected = '$100';
      const result = formatCurrency(100.15);
      expect(result).toBe(expected);
    });
  });

  describe('getTransformerCount', () => {
    it('returns 0 when no batteries selected', () => {
      const input = generateTestData();
      const result = getTransformerCount(input);
      expect(result).toBe(0);
    });

    it('returns number of batteries divided by 4, rounded up', () => {
      const input = generateTestData({ [DeviceName.MEGAPACK]: 15 });
      const result = getTransformerCount(input);
      expect(result).toBe(Math.ceil(15 / 4));
    });
  });
});
