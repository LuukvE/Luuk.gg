import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { RouterContext } from '../Router';

export default () => {
    const { go, path: currentPath } = useContext(RouterContext);

    return (
      <Box
        width="240px"
        elevation="small"
        direction="column"
        background="white"
        margin={{ top: '1px' }}
      >
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/')}
          active={currentPath == '/'}
          icon={<i className="material-icons">home</i>}
          label={<Text margin={{ vertical: 'small' }}>Home</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/about')}
          active={currentPath == '/about'}
          icon={<i className="material-icons">info</i>}
          label={<Text margin={{ vertical: 'small' }}>About</Text>}
        />
      </Box>
    );
};