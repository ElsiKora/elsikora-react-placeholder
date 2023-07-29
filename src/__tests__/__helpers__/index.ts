import matchers from '@testing-library/jest-dom/matchers.js';
import { expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
expect.extend(matchers as any);

export const placeolderSelector = 'span.react-loading-placeolder';

export function getAllPlaceholders(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(placeolderSelector));
}

export function getPlaceholder(): HTMLElement {
  const placeolder = document.querySelector<HTMLElement>(placeolderSelector);
  if (!placeolder) throw new Error('Could not find placeolder.');

  return placeolder;
}

export function hasLineBreak(): boolean {
  return !!document.querySelector<HTMLElement>('br');
}
