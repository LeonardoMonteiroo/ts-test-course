import { calculateComplexity, OtherStringUtils, toUpperCaseWithCb } from "../../app/doubles/OtherUtils";

describe('OtherUtils', () => {
  describe('calculateComplexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      }
    }

    it('should return complexity of stringInfo', () => {
      const actual = calculateComplexity(someInfo as any);
      expect(actual).toBe(10);
    });
  });

  describe('toUpperCaseWithCb', () => {
    it('should call callback with invalid argument', () => {
      const actual = toUpperCaseWithCb('', () => {});
      expect(actual).toBeUndefined();
    });
  });

  describe('tracking callbacks with jest mocks', () => {
    const callback = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should track callback calls with valid argument', () => {
      toUpperCaseWithCb('test', callback);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('called with test');
      expect(callback).toHaveBeenCalledWith(expect.stringContaining('test'));
    });

    it('should track callback calls with invalid argument', () => {
      toUpperCaseWithCb('', callback);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('Invalid argument!');
    });
  });
});

describe('OtherStringUtils', () => {
  describe('toUpperCase', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    it('use spy to track calls', () => {
      const spy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('asa');
      expect(spy).toHaveBeenCalledWith('asa');
    });

    it('use spy to track call to other module', () => {
      const spy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(spy).toHaveBeenCalledWith('abc');
    });

    it('use spy to replace implementation', () => {
      const spy = jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
        console.log('mocked');
      });
      sut.callExternalService();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});