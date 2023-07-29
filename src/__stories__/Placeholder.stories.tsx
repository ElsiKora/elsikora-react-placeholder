import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from 'react';
import ReactDOM from 'react-dom';
import { Meta } from '@storybook/react';
import { SideBySide, Box } from './components/index.js';
import { Placeholder } from '../Placeholder.js';
import './styles/Placeholder.stories.css';

export default {
  component: Placeholder,
  title: 'Placeholder',
} satisfies Meta;

export const Basic: React.FC = () => <Placeholder count={5} width={400} />;

export const Inline: React.FC = () => (
  <SideBySide>
    <div>
      <Placeholder width={100} inline style={{ marginRight: '0.5rem' }} />
      <Placeholder width={150} inline style={{ marginRight: '0.5rem' }} />
      <Placeholder width={75} inline style={{ marginRight: '0.5rem' }} />
      <Placeholder width={150} inline />
    </div>
    <div>Some text for comparison</div>
  </SideBySide>
);

export const InlineWithText: React.FC = () => (
  <div>
    Some random text <Placeholder width={150} inline /> Some more random text
  </div>
);

export const BlockWrapper: React.FC = () => (
  <SideBySide>
    <Placeholder count={5} wrapper={Box} />
    <div>
      <Box>A</Box>
      <Box>B</Box>
      <Box>C</Box>
      <Box>D</Box>
    </div>
  </SideBySide>
);

function InlineWrapperWithMargin({
  children,
}: PropsWithChildren<unknown>): ReactElement {
  return <span style={{ marginRight: '0.25rem' }}>{children}</span>;
}

export const InlineWrapper: React.FC = () => (
  <div style={{ lineHeight: 1.5 }}>
    <SideBySide>
      <div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <Placeholder
              count={4}
              width={75}
              inline
              wrapper={InlineWrapperWithMargin}
            />
          </div>
        ))}
      </div>
      <div>
        <div>Some text for comparison</div>
        <div>Some text for comparison</div>
        <div>Some text for comparison</div>
        <div>Some text for comparison</div>
      </div>
    </SideBySide>
  </div>
);

export const DifferentDurations: React.FC = () => (
  <div style={{ width: 500 }}>
    <Placeholder duration={1} />
    <Placeholder duration={2} />
    <Placeholder duration={3} />
    <Placeholder duration={4} />
  </div>
);

export const DifferentWidths: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Placeholder />
    <Placeholder width={50} />
    <Placeholder width={100} />
    <Placeholder width={200} />
    <Placeholder width="50em" />
  </div>
);

export const DifferentHeights: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Placeholder />
    <Placeholder height={200} />
    <Placeholder height={400} />
    <Placeholder height={600} />
    <Placeholder height="50em" />
  </div>
);

export const CustomStyles: React.FC = () => (
  <Placeholder
    height="100px"
    style={{ borderRadius: 10, height: 50, width: 50 }}
  />
);

export const Circle: React.FC = () => (
  <Placeholder height={50} width={50} circle />
);

export const DecimalCount: React.FC = () => <Placeholder count={3.5} />;

export const DecimalCountPercentWidth: React.FC = () => (
  <Placeholder width="50%" count={3.5} />
);

export const DecimalCountInline: React.FC = () => (
  <Placeholder width={100} inline count={3.5} style={{ marginRight: '1rem' }} />
);

// Use https://bennettfeely.com/clippy/ to try out other shapes
const StarWrapper: React.FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div
    style={{
      display: 'inline-block',
      clipPath:
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      width: '100px',
      height: '100px',
    }}
  >
    {children}
  </div>
);

export const Stars: React.FC = () => (
  <Placeholder
    height="100%"
    wrapper={StarWrapper}
    count={5}
    baseColor="#ebab34"
    highlightColor="#f2cb07"
  />
);

export const RightToLeft: React.FC = () => <Placeholder direction="rtl" />;

export const DisableAnimation: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div>
      <label htmlFor="checkbox">
        Enable animation:
        <input
          id="checkbox"
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
      </label>
      <Placeholder count={5} enableAnimation={enabled} highlightColor="#FF3384" />
    </div>
  );
};

export const PercentWidthInFlex: React.FC = () => (
  <div>
    <p>
      This is a test for{' '}
      <a href="https://github.com/dvtng/react-loading-placeholder/issues/61">
        #61
      </a>
      . The placeholder should take up 50% of the width of the turquoise flex
      container.
    </p>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'PaleTurquoise',
        width: 400,
        height: 50,
      }}
    >
      <Placeholder containerClassName="w-50" />
    </div>
  </div>
);

export const FillEntireContainer: React.FC = () => (
  <div>
    <p>
      This is a test for{' '}
      <a href="https://github.com/dvtng/react-loading-placeholder/issues/31">
        #31
      </a>
      . The placeholder should fill the entire red container. The container has{' '}
      <code>line-height: 1</code> to make it pixel perfect.
    </p>
    <div
      style={{
        backgroundColor: 'red',
        width: 400,
        height: 100,
        lineHeight: 1,
      }}
    >
      <Placeholder height="100%" borderRadius={0} />
    </div>
  </div>
);

interface HeightComparisonProps {
  title: string;
  lineHeight?: number;
}

function HeightComparison({
  title,
  lineHeight = 3,
  children,
}: PropsWithChildren<HeightComparisonProps>): ReactElement {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setHeight(wrapperRef.current?.clientHeight);
  }, []);

  return (
    <div style={{ marginRight: '4rem', maxWidth: 350 }}>
      <h4>{title}</h4>

      <div ref={wrapperRef} style={{ marginBottom: '1rem', lineHeight }}>
        {children}
      </div>

      <div>Expected height: 30</div>
      <div>Actual height: {height}</div>
    </div>
  );
}

export const HeightQuirk: React.FC = () => (
  <div>
    <p>
      This is a demonstration of a Placeholder quirk that was reported in{' '}
      <a href="https://github.com/dvtng/react-loading-placeholder/issues/23">
        #23
      </a>
      .
    </p>
    <p>
      If you set the Placeholder&apos;s height to 30px, the element containing the
      Placeholder will have a height of 31px, assuming the document&apos;s
      line-height is left at the default value. The height discrepancy increases
      with line-height.
    </p>
    <p>
      This example uses a large line-height to magnify the issue. It compares a
      Placeholder with <code>height: 30px</code> to a normal span tag with{' '}
      <code>height: 30px; display: inline-block; line-height: 1;</code>. The
      height discrepancy occurs in both cases which suggests that this is not a
      Placeholder bug.
    </p>
    <div style={{ display: 'flex', marginBottom: '3rem' }}>
      <HeightComparison title="<Placeholder />">
        <Placeholder height={30} />
      </HeightComparison>
      <HeightComparison title="<span>">
        <span
          style={{
            height: '30px',
            display: 'inline-block',
            lineHeight: 1,
            backgroundColor: 'lemonchiffon',
          }}
        >
          TEST
        </span>
      </HeightComparison>
    </div>

    <p>There are two ways to make the container exactly 30px tall.</p>
    <h2>Solution 1</h2>
    <p>
      Set the <code>line-height</code> of the container to 1.
    </p>
    <HeightComparison title="<div> with line-height: 1" lineHeight={1}>
      <Placeholder height={30} />
    </HeightComparison>
    <h2>Solution 2</h2>
    <p>
      Provide a <code>containerClassName</code> and apply the styles{' '}
      <code>display: block; line-height: 1;</code> to that class.
    </p>
    <HeightComparison title='<Placeholder containerClassName="..." />'>
      <Placeholder
        height={30}
        containerClassName="height-quirk-custom-container"
      />
    </HeightComparison>
  </div>
);

export const ShadowDOM: React.FC = () => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [portalDestination, setPortalDestination] = useState<HTMLDivElement>();

  useEffect(() => {
    if (!hostRef.current) throw new Error('hostRef.current is null.');

    const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });

    const myPortalDestination = document.createElement('div');
    shadowRoot.append(myPortalDestination);

    setPortalDestination(myPortalDestination);
  }, []);

  // In a real app, you would insert the CSS into the Shadow DOM using one of
  // the strategies outlined here:
  // https://github.com/Wildhoney/ReactShadow#getting-started

  // This CSS does NOT need to be updated, the goal is just to prove that
  // Placeholder is capable of working in a Shadow DOM
  const placeholderCss = `
    @keyframes react-loading-placeholder {
        0% {
            background-position: -200px 0;
        }
        100% {
            background-position: calc(200px + 100%) 0;
        }
    }

    .react-loading-placeholder {
        /* If either color is changed, Placeholder.tsx must be updated as well */
        --base-color: #ebebeb;
        --highlight-color: #f5f5f5;

        background-color: var(--base-color);
        background-image: linear-gradient(
            90deg,
            var(--base-color),
            var(--highlight-color),
            var(--base-color)
        );

        width: 100%;
        background-size: 200px 100%;
        background-repeat: no-repeat;
        border-radius: 0.25rem;
        display: inline-block;
        line-height: 1;

        animation-name: react-loading-placeholder;
        animation-duration: 1.5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }
    `;

  const shadowContent = (
    <>
      <Placeholder />
      <style>{placeholderCss}</style>
    </>
  );

  return (
    <div>
      <p>
        This story verifies that Placeholder works inside a Shadow DOM. An older
        version of Placeholder did not work inside the Shadow DOM according to{' '}
        <a href="https://github.com/dvtng/react-loading-placeholder/issues/69">
          #69
        </a>
        .
      </p>
      <div ref={hostRef} />
      {portalDestination &&
        ReactDOM.createPortal(shadowContent, portalDestination)}
    </div>
  );
};

export const RegressionTest133 = () => (
  <div>
    <p>
      Regression test for{' '}
      <a href="https://github.com/dvtng/react-loading-placeholder/pull/133">
        #133
      </a>
      , in which the pseudoelement had the wrong vertical position. The animated
      highlight should cover the entire square.
    </p>
    <div style={{ display: 'flex' }}>
      <Placeholder
        baseColor="paleturquoise"
        style={{ display: 'block', width: 200, height: 200 }}
      />
    </div>
  </div>
);

export const PrefersReducedMotion = () => (
  <div>
    <p>With prefers-reduced-motion, this placeholder should not be animated.</p>
    <Placeholder
      circle
      baseColor="lavender"
      highlightColor="#E0B0FF"
      style={{ display: 'block', width: 200, height: 200 }}
    />
  </div>
);
