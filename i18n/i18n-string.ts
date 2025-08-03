import { LocaleType } from './config';
import { iString, iStringParse } from './i-string';

/**
 * Object-oriented version
 */
export class I18NString {
  private _str: iString;

  constructor(str: iString) {
    this._str = str;
  }

  /**
   * Returns a string
   * // If it's a string, return directly
   * // If it's a JSON object but no language specified, return the whole object!
   * // If language is specified, return the corresponding language value
   * @param lang
   * @returns
   */
  toString(lang?: string) {
    if (typeof this._str === 'string') {
      return this._str;
    }

    if (!lang) return JSON.stringify(this._str);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this._str as any)[lang];
  }

  parse(lang: LocaleType) {
    return iStringParse(this._str, lang);
  }
}
