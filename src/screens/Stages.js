import React, { useEffect } from 'react';
import { Box } from 'grommet';
import List from '../components/List';
import { stages } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg - Stages';
  }, []);

  return (
    <Box
      flex
      background="#fcfcfc"
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <List type="stages" items={stages}/>
    </Box>
  );
};
