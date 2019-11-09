import React from 'react';
import styled, { css } from 'styled-components';
/* eslint-disable import/no-duplicates */
import * as Icons from 'grommet-icons';
import * as Grommet from 'grommet';
import * as Themes from 'grommet/themes';

import { Box, Select } from 'grommet';
import { Previous } from 'grommet-icons';
/* eslint-enable import/no-duplicates */

import { LiveProvider, LivePreview } from 'react-live';

import RoutedButton from '../components/RoutedButton';
import {
  PlaygroundError,
  PlaygroundPlaceholder,
} from '../components/playground';
import * as PlaygroundExamples from '../components/playground/examples';

const StyledPreview = styled(Box)`
  .react-live-preview > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

const scope = {
  ...Grommet,
  Icons,
  Themes,
  styled,
  css,
};

const allPlaygrounds = Object.keys(PlaygroundExamples).map(value =>
  value.replace(/([A-Z])/g, ' $1').trim(),
);

const options = {
  fontSize: 14,
  minimap: {
    enabled: false,
  },
};

const Play = () => {
  const [selectedPlayground, setSelectedPlayground] = React.useState(
    'Hello World',
  );
  const [code, setCode] = React.useState(PlaygroundExamples.HelloWorld);

  React.useEffect(() => {
    document.title = 'Play - Grommet';
  }, []);

  return (
    <LiveProvider
      code={code}
      scope={scope}
      noInline
      style={{ height: '100vh' }}
    >
      <Box direction="row" fill>
        <Box basis="1/2">
          <Box
            direction="row"
            tag="header"
            background="dark-1"
            pad="small"
            justify="between"
            align="center"
            flex={false}
          >
            <RoutedButton icon={<Previous />} path="/" label="Back" plain />
            <Select
              value={selectedPlayground}
              options={allPlaygrounds}
              onChange={({ option }) => {
                setSelectedPlayground(option);
                setCode(PlaygroundExamples[option.replace(/ /g, '')]);
              }}
            />
          </Box>
          <Box flex overflow="hidden">
              No playing!
          </Box>
          <PlaygroundError />
        </Box>
        <StyledPreview basis="1/2" background="white">
          <LivePreview />
          <PlaygroundPlaceholder />
        </StyledPreview>
      </Box>
    </LiveProvider>
  );
};

export default Play;
