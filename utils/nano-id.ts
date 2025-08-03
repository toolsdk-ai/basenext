import { customAlphabet } from 'nanoid';

/**
 * Default character set for NanoID
 */
export const defaultNanoIdAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Length of the default NanoId character set
 *
 * @returns
 */
export function defaultNanoIdAlphabetCount() {
  return defaultNanoIdAlphabet.length;
}

/**
 * Generate a random nano id
 *
 * Note: Frontend and client should not use generateNanoID. Use APICaller.generateRandomString for generating random strings instead.
 *
 * @param prefix nano prefix
 * @param length nano length
 */
export function generateNanoID(prefix: string = '', length: number = 21, alphabet = defaultNanoIdAlphabet): string {
  const nanoid = customAlphabet(alphabet, length);
  return prefix + nanoid(); // example => "Iy1Q86plt1T2I1CFvAKQL"
}
