import React from 'react';
import { withLive } from 'react-live';

import { Box, Text } from 'grommet';

const PlaygroundError = withLive(({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <Box pad="small" background="status-critical">
      <Text size="small" color="white">
        {error}
      </Text>
    </Box>
  );
});

export { PlaygroundError };
