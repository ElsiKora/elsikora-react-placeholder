import matchers from '@testing-library/jest-dom/matchers.js';
import { expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
expect.extend(matchers as any);

export const placeholderSelector = 'span.react-loading-placeholder';

export function getAllPlaceholders(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(placeholderSelector));
}

export function getPlaceholder(): HTMLElement {
  const placeholder = document.querySelector<HTMLElement>(placeholderSelector);
  if (!placeholder) throw new Error('Could not find placeholder.');

  return placeholder;
}

export function hasLineBreak(): boolean {
  return !!document.querySelector<HTMLElement>('br');
}
