import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';
import { teams } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.GG - Teams';
  }, []);

  return (
    <Box
      flex
      background="#f2f5f8"
      overflow={{ vertical: 'hidden' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <List type="teams" items={teams}/>
    </Box>
  );
};
