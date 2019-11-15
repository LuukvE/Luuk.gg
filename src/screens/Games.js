import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';
import { games } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg - Games';
  }, []);

  return (
    <Box
      flex
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <List type="games" items={games}/>
    </Box>
  );
};
