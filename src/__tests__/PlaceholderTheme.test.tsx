import React from 'react';
import ReactDOM from 'react-dom';
import { it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { PlaceholderTheme } from '../PlaceholderTheme.js';
import { Placeholder } from '../Placeholder.js';
import { getPlaceholder } from './__helpers__/index.js';

afterEach(cleanup);

it('does not render anything', () => {
  render(
    <div data-testid="container">
      <PlaceholderTheme borderRadius="1rem" />
    </div>
  );

  expect(screen.getByTestId('container')).toBeEmptyDOMElement();
});

it('styles the placeholder', () => {
  render(
    <PlaceholderTheme borderRadius="1rem" baseColor="black">
      <Placeholder />
    </PlaceholderTheme>
  );

  const placeholder = getPlaceholder();
  expect(placeholder).toHaveStyle({ borderRadius: '1rem' });
  expect(placeholder.style.getPropertyValue('--base-color')).toBe('black');
});

it('is overridden by Placeholder props', () => {
  render(
    <PlaceholderTheme borderRadius="1rem" baseColor="black">
      <Placeholder borderRadius="2rem" />
    </PlaceholderTheme>
  );

  const placeholder = getPlaceholder();
  expect(placeholder).toHaveStyle({ borderRadius: '2rem' });
  expect(placeholder.style.getPropertyValue('--base-color')).toBe('black');
});

it('styles the placeholder through a portal', () => {
  const portalDestination = document.createElement('div');
  document.body.append(portalDestination);

  render(
    <PlaceholderTheme borderRadius="1rem" baseColor="black">
      {ReactDOM.createPortal(<Placeholder />, portalDestination)}
    </PlaceholderTheme>
  );

  const placeholder = getPlaceholder();
  expect(placeholder).toHaveStyle({ borderRadius: '1rem' });
  expect(placeholder.style.getPropertyValue('--base-color')).toBe('black');
});

// Regression test
it('is not blocked by setting Placeholder props to undefined', () => {
  render(
    <PlaceholderTheme baseColor="green" highlightColor="red">
      <Placeholder baseColor={undefined} highlightColor={undefined} />
    </PlaceholderTheme>
  );

  const placeholder = getPlaceholder();
  expect(placeholder.style.getPropertyValue('--base-color')).toBe('green');
  expect(placeholder.style.getPropertyValue('--highlight-color')).toBe('red');
});
