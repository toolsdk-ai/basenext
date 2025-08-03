import { match } from '@formatjs/intl-localematcher';
import { i18n } from './config';

export function matchLocale(languages: string[]): string {
  const locale = match(languages, i18n.locales, i18n.defaultLocale);
  return locale;
}
