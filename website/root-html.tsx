import React from 'react';

interface Props<LANG extends string = string, STYLE extends string = string> {
  locale: LANG;
  themeMode: 'system' | 'light' | 'dark';
  themeStyle: STYLE;
  children: React.ReactNode;
}

export function RootHtml<LANG extends string = string, STYLE extends string = string>(props: Props) {
  const actualThemeMode: 'light' | 'dark' = props.themeMode === 'system' ? 'dark' : props.themeMode;

  return (
    <html
      lang={props.locale as LANG}
      data-theme-setting={props.themeMode}
      data-app-theme={`${props.themeStyle}-${actualThemeMode}`}
      data-theme={actualThemeMode}
      data-theme-style={props.themeStyle as STYLE}
    >
      {props.children}
    </html>
  );
}
