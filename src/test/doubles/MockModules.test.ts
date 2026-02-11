jest.mock("uuid");
jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => 10,
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe('module tests', () => {
  it('calculate complexity', () => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  it('keep other functions', () => {
    const result = OtherUtils.toUpperCase('abc');
    expect(result).toBe('ABC');
  });

  it('string with id', () => {
    const result = OtherUtils.toLowerCaseWithId('abc');
    expect(result).toBe('abcmock-uuid-v4');
  });
});