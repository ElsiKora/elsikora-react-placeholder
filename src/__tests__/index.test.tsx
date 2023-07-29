import React from 'react';
import { it, expect } from 'vitest';
import Placeholder, {
  PlaceholderTheme,
  PlaceholderThemeProps,
  PlaceholderProps,
} from '../index.js';

it('exports Placeholder and friends', () => {
  expect(typeof Placeholder).toBe('function');
  expect(typeof PlaceholderTheme).toBe('function');

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const placeolderProps: PlaceholderProps = { count: 3, borderRadius: '1rem' };
  const placeolderThemeProps: PlaceholderThemeProps = {
    children: <div />,
    baseColor: '#3a3a3a',
    highlightColor: 'white',
  };
  /* eslint-enable @typescript-eslint/no-unused-vars */
});
