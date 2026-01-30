import { PasswordErrors, PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('should return false if password is less than 8 characters', () => {
    const actual = sut.checkPassword('1234567');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);  
  });

  it('should return true if password is more than 8 characters', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('should return false when dont have any uppercase letter', () => {
    const actual = sut.checkPassword('12345678a');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPERCASE);
  });

  it('should return true when have any uppercase letter', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
  });

  it('should return false when dont have any lowercase letter', () => {
    const actual = sut.checkPassword('12345678A');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWERCASE);
  });

  it('should return true when have any lowercase letter', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
  });

  it('should return true when password is complex', () => {
    const actual = sut.checkPassword('12345678AaBbCc');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });
});