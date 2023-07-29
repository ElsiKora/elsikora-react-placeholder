import React, { ReactElement, PropsWithChildren } from 'react';
import { PlaceholderStyleProps } from './PlaceholderStyleProps.js';
import { PlaceholderThemeContext } from './PlaceholderThemeContext.js';

export type PlaceholderThemeProps = PropsWithChildren<PlaceholderStyleProps>;

export function PlaceholderTheme({
  children,
  ...styleOptions
}: PlaceholderThemeProps): ReactElement {
  return (
    <PlaceholderThemeContext.Provider value={styleOptions}>
      {children}
    </PlaceholderThemeContext.Provider>
  );
}
