import React, { PropsWithChildren } from 'react';
import { it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Placeholder } from '../Placeholder.js';
import {
  getAllPlaceholders,
  getPlaceholder,
  hasLineBreak,
  placeolderSelector,
} from './__helpers__/index.js';

afterEach(cleanup);

it('renders a placeolder', () => {
  render(<Placeholder />);

  const placeolderElements = getAllPlaceholders();

  expect(placeolderElements).toHaveLength(1);
  expect(placeolderElements[0]).toBeVisible();

  // No inline styles should be rendered by default
  expect(placeolderElements[0]).not.toHaveAttribute('style');
});

it('renders the required number of placeolders', () => {
  render(<Placeholder count={4} />);

  const placeolderElements = getAllPlaceholders();

  expect(placeolderElements).toHaveLength(4);
});

it('changes the color of the placeolder', () => {
  render(<Placeholder baseColor="purple" highlightColor="red" />);

  const placeolder = getPlaceholder();

  expect(placeolder.style.getPropertyValue('--base-color')).toBe('purple');
  expect(placeolder.style.getPropertyValue('--highlight-color')).toBe('red');
});

it('renders a placeolder with styles', () => {
  const style = { borderRadius: 10, height: 50, width: 50 };
  render(<Placeholder style={style} />);

  const placeolder = getPlaceholder();

  expect(placeolder).toHaveStyle({
    borderRadius: `${style.borderRadius}px`,
    height: `${style.height}px`,
    width: `${style.width}px`,
  });
});

it('prioritizes explicit props over style prop', () => {
  const style = { borderRadius: 10, height: 10, width: 10 };
  render(<Placeholder borderRadius={20} height={21} width={22} style={style} />);

  const placeolder = getPlaceholder();

  expect(placeolder).toHaveStyle({
    borderRadius: '20px',
    height: '21px',
    width: '22px',
  });
});

it('ignores borderRadius if circle=true', () => {
  render(<Placeholder borderRadius={1} height={25} width={25} circle />);

  expect(getPlaceholder()).toHaveStyle({ borderRadius: '50%' });
});

it('adds a line break when inline is false', () => {
  const { rerender } = render(<Placeholder />);
  expect(hasLineBreak()).toBe(true);

  rerender(<Placeholder inline={false} />);
  expect(hasLineBreak()).toBe(true);

  rerender(<Placeholder inline />);
  expect(hasLineBreak()).toBe(false);
});

it('disables the animation if and only if enableAnimation is false', () => {
  const { rerender } = render(<Placeholder containerTestId="container" />);
  expect(getPlaceholder().style.getPropertyValue('--pseudo-element-display')).toBe(
    ''
  );
  expect(screen.getByTestId('container')).toHaveAttribute('aria-busy', 'true');

  rerender(<Placeholder enableAnimation containerTestId="container" />);
  expect(getPlaceholder().style.getPropertyValue('--pseudo-element-display')).toBe(
    ''
  );
  expect(screen.getByTestId('container')).toHaveAttribute('aria-busy', 'true');

  rerender(<Placeholder enableAnimation={false} containerTestId="container" />);
  expect(getPlaceholder().style.getPropertyValue('--pseudo-element-display')).toBe(
    'none'
  );
  expect(screen.getByTestId('container')).toHaveAttribute('aria-busy', 'false');
});

it('uses a custom className', () => {
  render(<Placeholder className="test-class" />);

  const placeolder = getPlaceholder();

  expect(placeolder).toHaveClass('react-loading-placeolder');
  expect(placeolder).toHaveClass('test-class');
});

it('applies the containerClassName and containerTestId', () => {
  render(
    <Placeholder containerClassName="test-class" containerTestId="myTestId" />
  );

  const container = screen.getByTestId('myTestId');
  expect(container).toHaveClass('test-class');
});

it('renders a placeolder with a wrapper', () => {
  const Wrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
    <div className="box">{children}</div>
  );

  render(<Placeholder wrapper={Wrapper} />);

  const box = document.querySelector<HTMLElement>('.box');
  if (!box) throw new Error('box is null.');

  expect(box.querySelector(placeolderSelector)).toBeVisible();
});

it('renders a half-width placeolder when count = 1.5', () => {
  render(<Placeholder count={1.5} />);

  const placeolders = getAllPlaceholders();
  expect(placeolders).toHaveLength(2);

  expect(placeolders[0]).toHaveStyle({ width: '' });
  expect(placeolders[1]).toHaveStyle({ width: 'calc(100% * 0.5)' });
});

it('renders a 3/4-width placeolder when count = 1.75 and width is set in pixels', () => {
  render(<Placeholder count={1.75} width={100} />);

  const placeolders = getAllPlaceholders();
  expect(placeolders).toHaveLength(2);

  expect(placeolders[0]).toHaveStyle({ width: '100px' });
  expect(placeolders[1]).toHaveStyle({ width: '75px' });
});
