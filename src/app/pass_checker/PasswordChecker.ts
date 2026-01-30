export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPERCASE = 'Upper case letter required!',
  NO_LOWERCASE = 'Lower case letter required!',
  NO_NUMBER = 'At least one number required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];

    this.checkLength(password, reasons);
    this.checkUpperCase(password, reasons);
    this.checkLowerCase(password, reasons);
    
    return { valid: reasons.length === 0, reasons: reasons };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);

    this.checkNumber(password, basicCheck.reasons);

    return { valid: basicCheck.reasons.length === 0, reasons: basicCheck.reasons };
  }

  private checkLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPERCASE);
    }
  }

  private checkLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWERCASE);
    }
  }

  private checkNumber(password: string, reasons: PasswordErrors[]) {
    if (!/\d/.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }
}