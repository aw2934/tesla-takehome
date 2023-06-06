import { formatCurrency } from "../../BatteryForm/utils";
import { LayoutData, buildLayout } from "../../RightPane/utils";
import { generateTestData } from "../../generateTestData";
import { DeviceName } from "../../types";
import { aggregateTotals, getDimensions } from "../utils";
import { siteLayoutDataMultipleRows, siteLayoutDataSingleRow } from "./testFixtures";

describe('OrderTotals - utils', () => {
  describe('aggregateTotals', () => {
    it('returns expected values when no batteries selected', () => {
      const order = generateTestData();
      const siteLayoutData: LayoutData[][] = [];

      const result = aggregateTotals(order, siteLayoutData);

      expect(result).toEqual([
        {
          label: 'Required Dimensions',
          value: getDimensions(siteLayoutData),
        },
        {
          label: 'Energy Density',
          value: '0 MWh',
        },
        {
          label: 'Price',
          value: formatCurrency(0),
        },
      ]);
    });

    it('returns expected values when batteries are selected', () => {
      const order = generateTestData({
        [DeviceName.MEGAPACK_2XL]: 1,
        [DeviceName.TRANSFORMER]: 1,
      });
      const siteLayoutData = buildLayout(order);

      const result = aggregateTotals(order, siteLayoutData);

      expect(result).toEqual([
        {
          label: 'Required Dimensions',
          value: getDimensions(siteLayoutData),
        },
        {
          label: 'Energy Density',
          value: '3.75 MWh',
        },
        {
          label: 'Price',
          value: formatCurrency(130000),
        },
      ]);
    });
  });

  describe('getDimensions', () => {
    it('returns - when site has no batteries selected', () => {
      const input: LayoutData[][] = [];

      const result = getDimensions(input);
      
      expect(result).toBe('-');
    });

    it('returns expected dimensions when site has one row', () => {
      const input = siteLayoutDataSingleRow;

      const result = getDimensions(input);
      
      expect(result).toBe('90FT x 10FT');
    });

    it('returns expected dimensions when site has multiple rows', () => {
      const input = siteLayoutDataMultipleRows;

      const result = getDimensions(input);
      
      expect(result).toBe('90FT x 20FT');
    });
  });
});
