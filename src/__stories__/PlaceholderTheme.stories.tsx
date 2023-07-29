import React from 'react';
import { Meta } from '@storybook/react';
import { Post, SideBySide, Box } from './components/index.js';
import { PlaceholderTheme } from '../PlaceholderTheme.js';
import { Placeholder } from '../Placeholder.js';

export default {
  component: PlaceholderTheme,
  title: 'PlaceholderTheme',
} satisfies Meta;

const darkBaseColor = '#333';
const darkHighlightColor = '#999';
const blueBaseColor = '#1D5CA6';
const blueHighlightColor = '#5294e0';
const lightBaseColor = '#c0c0c0';
const lightHighlightColor = '#A0A0A0';

export const WithColors: React.FC = () => (
  <div>
    <PlaceholderTheme
      baseColor={blueBaseColor}
      highlightColor={blueHighlightColor}
    >
      <Post loading />
    </PlaceholderTheme>
    <PlaceholderTheme
      baseColor={darkBaseColor}
      highlightColor={darkHighlightColor}
    >
      <Post loading />
    </PlaceholderTheme>
  </div>
);

export const NoBorderRadius: React.FC = () => (
  <PlaceholderTheme
    baseColor={blueBaseColor}
    highlightColor={blueHighlightColor}
    borderRadius="0"
  >
    <Post loading />
  </PlaceholderTheme>
);

export const LightAndDarkThemes: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const handleToggle = () => {
    setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'));
  };

  const placeholderColor = theme === 'light' ? darkBaseColor : lightBaseColor;
  const placeholderHighlight =
    theme === 'light' ? darkHighlightColor : lightHighlightColor;

  const backgroundColor = theme === 'light' ? 'white' : '#333';
  const color = theme === 'light' ? 'unset' : '#eee';

  return (
    <div style={{ backgroundColor, color }}>
      <button onClick={handleToggle} type="button">
        Toggle Theme
      </button>
      <SideBySide>
        <PlaceholderTheme
          baseColor={placeholderColor}
          highlightColor={placeholderHighlight}
        >
          <Placeholder count={5} wrapper={Box} />
        </PlaceholderTheme>
        <div>
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
          <Box>D</Box>
          <Box>E</Box>
        </div>
      </SideBySide>
    </div>
  );
};

export const PropsExplicitlySetToUndefined: React.FC = () => (
  <div>
    <p>
      This is a test for{' '}
      <a href="https://github.com/dvtng/react-loading-placeholder/issues/128">
        #128
      </a>
      . The placeholder should have Christmas colors.
    </p>
    <PlaceholderTheme baseColor="green" highlightColor="red">
      <Placeholder baseColor={undefined} highlightColor={undefined} />
    </PlaceholderTheme>
  </div>
);
