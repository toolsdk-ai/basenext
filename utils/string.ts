export const isBlank = (str?: string | null): boolean => !str || str.trim().length === 0;
export const isNotBlank = (str?: string | null): boolean => !isBlank(str);

const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = (str: string): boolean => new RegExp(EMAIL_REGEX).test(str);
