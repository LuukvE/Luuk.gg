import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';
import { tournaments } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.GG - Tournaments';
  }, []);

  return (
    <Box
      flex
      background="#f2f5f8"
      overflow={{ vertical: 'hidden' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <List type="tournaments" items={tournaments}/>
    </Box>
  );
};
