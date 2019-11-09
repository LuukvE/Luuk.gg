import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { LiveProvider, LivePreview } from 'react-live';
/* eslint-disable import/no-duplicates */
import * as Icons from 'grommet-icons';
import * as Grommet from 'grommet';
import * as Themes from 'grommet/themes';
import { Anchor, Box, Heading, Text } from 'grommet';
import { Next, Share } from 'grommet-icons';
/* eslint-enable import/no-duplicates */
import Header from '../../components/Header';
import RoutedAnchor from '../../components/RoutedAnchor';
import Section from './Section';

const scope = {
  ...Grommet,
  Icons,
  Themes,
  styled,
  css,
};

const options = {
  fontSize: 16,
  minimap: {
    enabled: false,
  },
  scrollBeyondLastLine: false,
};

const Dot = ({ color }) => (
  <svg viewBox="0 0 12 12" width={12} height={12}>
    <circle cx={6} cy={6} r={6} fill={color} />
  </svg>
);

Dot.propTypes = {
  color: PropTypes.string.isRequired,
};

export default () => {
  const [code, setCode] = React.useState(`const App = props => (
  <Grommet theme={grommet}>
    <Box align="center" background="neutral-2">
      <Button
        label="hello world"
        primary 
        onClick={() => alert('hello, world')}
      />
    </Box>
  </Grommet>
);

render(<App />);
`);

  return (
    <LiveProvider code={code} scope={scope} noInline style={{ height: '100%' }}>
      <Section pad={{ top: 'xlarge' }}>
        <Header
          level={2}
          label="start coding"
          summary="
            already working on a project, starting fresh, or just want to
            poke around and see how all this junk works?"
        />

        <Box
          direction="row-responsive"
          justify="center"
          gap="large"
          margin="large"
        >
          <Anchor
            href="https://github.com/grommet/grommet-starter-new-app"
            label={<Text size="large">Start New App</Text>}
            icon={<Next />}
            reverse
            target="_blank"
          />
          <Anchor
            href="https://github.com/grommet/grommet-starter-existing-app"
            label={<Text size="large">I have an Existing Codebase</Text>}
            icon={<Next />}
            reverse
            target="_blank"
          />
        </Box>

        <Box alignSelf="center" width="large" margin={{ top: 'medium' }}>
          <RoutedAnchor path="/play" target="_blank">
            <Box
              border
              round={{ corner: 'top' }}
              direction="row"
              justify="between"
              align="center"
              pad="medium"
            >
              <Text color="brand">grommet playground</Text>
              <Share />
            </Box>
          </RoutedAnchor>
          <Box border={{ side: 'vertical' }} height="medium">
            Hello World!
          </Box>
        </Box>
      </Section>

      <Section background="brand" pad="none">
        <Box
          alignSelf="center"
          background="neutral-2"
          width="large"
          pad="medium"
          round={{ corner: 'bottom' }}
          margin={{ bottom: 'xlarge' }}
        >
          <LivePreview />
        </Box>

        <Header
          level={2}
          label="and start designing"
          summary="sticker sheets, design patterns, app templates, and icons
            galore."
        />

        <Box
          direction="row-responsive"
          justify="center"
          gap="large"
          margin="medium"
        >
          <Anchor
            href="//github.com/grommet/design-kit"
            label={<Text size="large">Grommet Design Kit</Text>}
            icon={<Next />}
            reverse
            target="_blank"
          />
          <Anchor
            href="//icons.grommet.io"
            label={<Text size="large">Grommet Icons</Text>}
            icon={<Next />}
            reverse
            target="_blank"
          />
        </Box>

        <Box
          alignSelf="center"
          width="large"
          height="small"
          round={{ corner: 'top' }}
          background="neutral-2"
          margin={{ top: 'xlarge' }}
        >
          <Box alignSelf="start" direction="row" margin="medium" gap="small">
            <Dot color="#ff0000" />
            <Dot color="#ffff00" />
            <Dot color="#00ff00" />
          </Box>
          <Heading level={1} color="brand" margin="large">
            Hello World!
          </Heading>
        </Box>
      </Section>
    </LiveProvider>
  );
};
