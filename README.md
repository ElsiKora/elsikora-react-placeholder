<div align="center">
    <a href="https://github.com/dvtng/react-loading-placeholder">
        <img src="assets/logo.svg" alt="Logo" width="80" height="80" />
    </a>
    <h1 align="center">Elsikora React Placeholder</h1>
    <p align="center">
        Make beautiful, animated loading placeholders that automatically adapt to your app.
    </p>
    <h3>
    <!--<a href="https://dvtng.github.io/react-loading-placeholder">View Live Demo</a> &nbsp;&nbsp;&bull;&nbsp;&nbsp;-->
    <a href="https://codesandbox.io/s/react-loading-placeholder-3xwil?file=/src/App.tsx">Open on CodeSandbox</a>
    </h3>
    <img src="https://media.giphy.com/media/l0Iyk4bAAjac3AU2k/giphy.gif" alt="Gif of the placeholder in action">
</div>

Learn about the [changes in version
3](https://github.com/dvtng/react-loading-placeholder/releases/tag/v3.0.0), or view
the [v2
documentation](https://github.com/dvtng/react-loading-placeholder/tree/v2#readme).

## Basic Usage

Install via one of:

```bash
yarn add react-loading-placeholder
npm install react-loading-placeholder
```

```tsx
import Placeholder from 'react-loading-placeholder'
import 'react-loading-placeholder/dist/placeholder.css'

<Placeholder /> // Simple, single-line loading placeholder
<Placeholder count={5} /> // Five-line loading placeholder
```

## Principles

### Adapts to the styles you have defined

The `Placeholder` component should be used directly in your components in place of
content that is loading. While other libraries require you to meticulously craft
a placeholder screen that matches the font size, line height, and margins of your
content, the `Placeholder` component is automatically sized to the correct
dimensions.

For example:

```tsx
function BlogPost(props) {
  return (
    <div>
      <h1>{props.title || <Placeholder />}</h1>
      {props.body || <Placeholder count={10} />}
    </div>
  );
}
```

...will produce correctly-sized placeholders for the heading and body without any
further configuration.

This ensures the loading state remains up-to-date with any changes
to your layout or typography.

### Don't make dedicated placeholder screens

Instead, make components with _built-in_ placeholder states.

This approach is beneficial because:

1. It keeps styles in sync.
2. Components should represent all possible states — loading included.
3. It allows for more flexible loading patterns. In the blog post example above,
   it's possible to have the title load before the body, while having both
   pieces of content show loading placeholders at the right time.

## Theming

Customize individual placeholders with props, or render a `PlaceholderTheme` to style
all placeholders below it in the React hierarchy:

```tsx
import Placeholder, { PlaceholderTheme } from 'react-loading-placeholder';

return (
  <PlaceholderTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Placeholder count={3} />
    </p>
  </PlaceholderTheme>
);
```

## Props Reference

### `Placeholder` only

<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>count?: number</code></td>
            <td>
                The number of lines of placeholders to render. If
                <code>count</code> is a decimal number like 3.5,
                three full placeholders and one half-width placeholder will be
                rendered.
            </td>
            <td><code>1</code></td>
        </tr>
        <tr>
            <td><code>wrapper?: React.FunctionComponent <br> &lt;PropsWithChildren&lt;unknown&gt;&gt;</code></td>
            <td>
                A custom wrapper component that goes around the individual placeholder
                elements.
            </td>
            <td></td>
        </tr>
        <tr>
            <td><code>circle?: boolean</code></td>
            <td>
                Makes the placeholder circular by setting <code>border-radius</code> to
                <code>50%</code>.
            </td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <td><code>className?: string</code></td>
            <td>
                A custom class name for the individual placeholder elements which is used
                alongside the default class, <code>react-loading-placeholder</code>.
            </td>
            <td></td>
        </tr>
        <tr>
            <td><code>containerClassName?: string</code></td>
            <td>
                A custom class name for the <code>&lt;span&gt;</code> that wraps the
                individual placeholder elements.
            </td>
            <td></td>
        </tr>
        <tr>
            <td><code>containerTestId?: string</code></td>
            <td>
                A string that is added to the container element as a
                <code>data-testid</code> attribute. Use it with
                <code>screen.getByTestId('...')</code> from React Testing Library.
            </td>
            <td></td>
        </tr>
        <tr>
            <td><code>style?: React.CSSProperties</code></td>
            <td>
                This is an escape hatch for advanced use cases and is not the preferred
                way to style the placeholder. Props (e.g. <code>width</code>,
                <code>borderRadius</code>) take priority over this style object.
            </td>
            <td></td>
        </tr>
    </tbody>
</table>

### `Placeholder` and `PlaceholderTheme`

<table>
    <thead>
        <tr>
            <th>Prop</th>
            <th>Description</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>baseColor?: string</code></td>
            <td>The background color of the placeholder.</td>
            <td><code>#ebebeb</code></td>
        </tr>
        <tr>
            <td><code>highlightColor?: string</code></td>
            <td>The highlight color in the placeholder animation.</td>
            <td><code>#f5f5f5</code></td>
        </tr>
        <tr>
            <td><code>width?: string | number</code></td>
            <td>The width of the placeholder.</td>
            <td><code>100%</code></td>
        </tr>
        <tr>
            <td><code>height?: string | number</code></td>
            <td>The height of each placeholder line.</td>
            <td>The font size</td>
        </tr>
        <tr>
            <td><code>borderRadius?: string | number</code></td>
            <td>The border radius of the placeholder.</td>
            <td><code>0.25rem</code></td>
        </tr>
        <tr>
            <td><code>inline?: boolean</code></td>
            <td>
                By default, a <code>&lt;br /&gt;</code> is inserted after each placeholder so
                that each placeholder gets its own line. When <code>inline</code> is true, no
                line breaks are inserted.
            </td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <td><code>duration?: number</code></td>
            <td>The length of the animation in seconds.</td>
            <td><code>1.5</code></td>
        </tr>
        <tr>
            <td><code>direction?: 'ltr' | 'rtl'</code></td>
            <td>
                The direction of the animation, either left-to-right or right-to-left.
            </td>
            <td><code>'ltr'</code></td>
        </tr>
        <tr>
            <td><code>enableAnimation?: boolean</code></td>
            <td>
                Whether the animation should play. The placeholder will be a solid color when
                this is <code>false</code>. You could use this prop to stop the animation
                if an error occurs.
            </td>
            <td><code>true</code></td>
        </tr>
    </tbody>
</table>

## Examples

### Custom Wrapper

There are two ways to wrap a placeholder in a container:

```tsx
function Box({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        display: 'block',
        lineHeight: 2,
        padding: '1rem',
        marginBottom: '0.5rem',
        width: 100,
      }}
    >
      {children}
    </div>
  );
}

// Method 1: Use the wrapper prop
const wrapped1 = <Placeholder wrapper={Box} count={5} />;

// Method 2: Do it "the normal way"
const wrapped2 = (
  <Box>
    <Placeholder />
  </Box>
);
```

## Troubleshooting

### The placeholder width is 0 when the parent has `display: flex`!

In the example below, the width of the placeholder will be 0:

```tsx
<div style={{ display: 'flex' }}>
  <Placeholder />
</div>
```

This happens because the placeholder has no intrinsic width. You can fix it by
applying `flex: 1` to the placeholder container via the `containerClassName` prop.

For example, if you are using Tailwind, your code would look like this:

```tsx
<div style={{ display: 'flex' }}>
  <Placeholder containerClassName="flex-1" />
</div>
```

### The height of my container is off by a few pixels!

In the example below, the height of the `<div>` will be slightly larger than 30
even though the `react-loading-placeholder` element is exactly 30px.

```tsx
<div>
  <Placeholder height={30} />
</div>
```

This is a consequence of how `line-height` works in CSS. If you need the `<div>`
to be exactly 30px tall, set its `line-height` to 1. [See
here](https://github.com/dvtng/react-loading-placeholder/issues/23#issuecomment-939231878)
for more details.

## Contributing

Contributions are welcome! See `CONTRIBUTING.md` to get started.

## Acknowledgements

Our logo is based off an image from [Font
Awesome](https://fontawesome.com/license/free). Thanks!
