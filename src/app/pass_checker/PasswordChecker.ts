export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPERCASE = 'Upper case letter required!',
  NO_LOWERCASE = 'Lower case letter required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];

    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }

    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPERCASE);
    }

    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWERCASE);
    }
    
    return { valid: reasons.length === 0, reasons: reasons };
  }
}