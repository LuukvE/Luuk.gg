import React from 'react';
import { withLive } from 'react-live';

import { Box, Heading } from 'grommet';
import { Gremlin } from '../Gremlin';

const PlaygroundPlaceholder = withLive(({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <Box pad={{ top: 'xlarge' }} background="light-2" fill align="center">
      <Heading>Oh, no!</Heading>
      <Heading textAlign="center" level={3}>
        Something went wrong, check your code...
      </Heading>
      <Box
        pad={{ top: 'xlarge' }}
        border={{ side: 'bottom' }}
        width="medium"
        align="center"
      >
        <Gremlin />
      </Box>
    </Box>
  );
});

export { PlaygroundPlaceholder };
