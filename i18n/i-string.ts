/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { LocaleSchema, type LocaleType } from './config';

export const iStringRecordSchema = z.record(LocaleSchema, z.string());
export const iStringSchema = z.union([z.string(), iStringRecordSchema]).describe('i18n string');

export type iString = z.infer<typeof iStringSchema>;

// Determine if the given string is an iString structure, if so return iString type, otherwise return false
export const isIString = (str: string): false | iString => {
  try {
    return iStringRecordSchema.parse(JSON.parse(str));
  } catch {
    return false;
  }
};

export type iStringRecord = z.infer<typeof iStringRecordSchema>;

/**
 * Compares a string or localized string object with a given value
 * @param str - The string or localized string object to compare
 * @param compare - The string value to compare against
 * @param lang - Optional locale type to specify which language to compare
 * @returns True if the strings match, false otherwise
 *
 * @remarks
 * - If str is a plain string, does direct comparison
 * - If lang is specified, compares only that language's value
 * - If lang is not specified, returns true if any language value matches
 */
export const iStringMatch = (str: iString, compare: string, lang?: LocaleType): boolean => {
  // When iString is a string, compare directly
  if (typeof str === 'string') {
    return str === compare;
  }
  // When language is specified, compare the value of the specified language
  if (lang) {
    return str[lang] === compare;
  }
  // When language is not specified, match any language value
  return Object.values(str).some((value) => value === compare);
};

/**
 * Quick parse to string
 *
 * @param str
 * @param lang default en
 * @returns
 */
export const iStringParse = (str: iString | undefined | null, lang: LocaleType = 'en'): string => {
  if (!str) return '';

  if (typeof str === 'string') {
    return str;
  }

  const locales = Object.keys(str || {});
  const fallbackLocale = locales.find((locale) => locale === lang) || locales.find((locale) => locale !== 'en') || 'en';
  const result = (str as any)[fallbackLocale];

  if (result === undefined) {
    console.warn(`iStringParse: ${JSON.stringify(str)} has no '${lang}' or other locales`);
  }

  return result || '';
};

/**
 * Parse string to iString
 * @param str
 * @returns
 * @example
 * ```ts
 * iStringify('hello') // { en: 'hello' }
 * ```
 */
export const iStringify = (str: string, lang: LocaleType = 'en'): iString => ({
  [lang]: str,
});
