import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg';
  });

  return (
    <Box
      flex
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'xsmall', color: 'light-1' }}
    >
      <List />
    </Box>
  );
};
