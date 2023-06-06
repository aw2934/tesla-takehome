import { generateTestData } from '../../generateTestData';
import { DeviceName } from '../../types';
import { LayoutData, buildLayout } from '../utils';

describe('RightPane - utils', () => {
  describe('buildLayout', () => {
    it('returns empty array when no items in order', () => {
      const input = generateTestData();

      expect(buildLayout(input)).toEqual([]);
    });

    it('returns array with single row when total item width is less than 100', () => {
      const input = generateTestData({
        [DeviceName.MEGAPACK_2XL]: 1,
        [DeviceName.MEGAPACK_2]: 1,
        [DeviceName.TRANSFORMER]: 1,
      });

      const expected: LayoutData[][] = [
        [
          {
            deviceName: DeviceName.MEGAPACK_2XL,
            width: 40,
            energy: 4,
            cost: 120000,
          },
          {
            deviceName: DeviceName.MEGAPACK_2,
            width: 30,
            energy: 3,
            cost: 80000,
          },
          {
            deviceName: DeviceName.TRANSFORMER,
            width: 10,
            energy: -0.25,
            cost: 10000,
          },
        ],
      ];

      const result = buildLayout(input);

      expect(Object.values(input).reduce(
        (acc, { width, amount }) => acc + width * amount,
        0
      )).toBe(80);

      expect(result).toEqual(expected);
      expect(result.length).toBe(1);
    });

    it('returns array with multiple rows when total item width exceeds 100', () => {
      const input = generateTestData({
        [DeviceName.MEGAPACK_2XL]: 3,
        [DeviceName.MEGAPACK_2]: 2,
        [DeviceName.TRANSFORMER]: 2,
      });

      const expected: LayoutData[][] = [
        [
          {
            deviceName: DeviceName.MEGAPACK_2XL,
            width: 40,
            energy: 4,
            cost: 120000,
          },
          {
            deviceName: DeviceName.MEGAPACK_2XL,
            width: 40,
            energy: 4,
            cost: 120000,
          },
          {
            deviceName: DeviceName.TRANSFORMER,
            width: 10,
            energy: -0.25,
            cost: 10000,
          },
          {
            deviceName: DeviceName.TRANSFORMER,
            width: 10,
            energy: -0.25,
            cost: 10000,
          },
        ],
        [
          {
            deviceName: DeviceName.MEGAPACK_2XL,
            width: 40,
            energy: 4,
            cost: 120000,
          },
          {
            deviceName: DeviceName.MEGAPACK_2,
            width: 30,
            energy: 3,
            cost: 80000,
          },
          {
            deviceName: DeviceName.MEGAPACK_2,
            width: 30,
            energy: 3,
            cost: 80000,
          },
        ],
      ];

      const result = buildLayout(input);

      expect(Object.values(input).reduce(
        (acc, { width, amount }) => acc + width * amount,
        0
      )).toBe(200);

      expect(result).toEqual(expected);
      expect(result.length).toBe(2);
    });
  });
});
