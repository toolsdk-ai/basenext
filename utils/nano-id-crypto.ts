// This file doesn't support client-side due to crypto import
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';

/**
 * Perform modulo operation on NanoID, related to original character set
 *
 * @param nanoId
 * @param modNum
 * @example Used for SpaceId modulo, then for MongoDB collection sharding
 */
export function modNanoId(nanoId: string, modNum: number) {
  const sha256hasher = crypto.createHash('sha256');
  sha256hasher.update(nanoId);
  const hashedNanoId = sha256hasher.digest('hex');
  const num = BigInt(`0x${hashedNanoId}`);
  const res = num % BigInt(modNum);
  return res;
}

/**
 * Check if password meets the criteria: at least two of numbers, English letters, or English symbols
 */
export function meetPwdCriteria(password: string): boolean {
  const numbers = /[0-9]/;
  const letters = /[a-zA-Z]/;
  const symbols = /[!@#$%^&*()]/;

  const typesIncluded = [numbers, letters, symbols].reduce((acc, regex) => (regex.test(password) ? acc + 1 : acc), 0);

  return typesIncluded >= 2;
}

/**
 * Generate a random password with the following rules:
 * 1. Length of 8-18 characters
 * 2. Contains at least two of: numbers, English letters, or English symbols
 */
export function generatePassword(length: number): string {
  if (length < 8 || length > 18) {
    throw new Error('Password length must be between 8 and 18 characters.');
  }

  const numbers = '0123456789';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const symbols = '!@#$%^&*()';
  const allChars = numbers + letters + symbols;

  // Ensure the password meets the criteria
  let password;
  do {
    password = customAlphabet(allChars, length)();
  } while (!meetPwdCriteria(password));

  return password;
}
