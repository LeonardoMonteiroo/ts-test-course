import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('should return false if password is less than 8 characters', () => {
    const result = sut.checkPassword('1234567');
    expect(result).toBe(false);
  });

  it('should return true if password is more than 8 characters', () => {
    const result = sut.checkPassword('12345678Aa');
    expect(result).toBe(true);
  });

  it('should return false when dont have any uppercase letter', () => {
    const result = sut.checkPassword('12345678a');
    expect(result).toBe(false);
  });

  it('should return true when have any uppercase letter', () => {
    const result = sut.checkPassword('12345678Aa');
    expect(result).toBe(true);
  });

  it('should return false when dont have any lowercase letter', () => {
    const result = sut.checkPassword('12345678A');
    expect(result).toBe(false);
  });

  it('should return true when have any lowercase letter', () => {
    const result = sut.checkPassword('12345678Aa');
    expect(result).toBe(true);
  });
});