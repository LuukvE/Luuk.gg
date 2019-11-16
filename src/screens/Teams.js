import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';
import { teams } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg - Teams';
  }, []);

  return (
    <Box
      flex
      background="#fcfcfc"
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <List type="teams" items={teams}/>
    </Box>
  );
};
