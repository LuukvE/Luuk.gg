import React, { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { RouterContext } from '../Router';

export default () => {
    const { go, path: currentPath } = useContext(RouterContext);

    return (
      <Box
        width="240px"
        direction="column"
        background="rgba(0,0,0,0.1)"
        pad={{ top: 'small' }}
        border={{ side: 'right', color: 'rgba(0,0,0,0.3)', size: 'xsmall' }}
      >
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/')}
          active={currentPath == '/'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">dashboard</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Dashboard</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/games')}
          active={currentPath == '/games'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">games</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Games</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/tournaments')}
          active={currentPath == '/tournaments'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">flag</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Tournaments</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/stages')}
          active={currentPath == '/stages'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">bubble_chart</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Stages</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/matches')}
          active={currentPath == '/matches'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">tv</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Matches</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/teams')}
          active={currentPath == '/teams'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">business</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Teams</Text>}
        />
        <Button
          plain
          hoverIndicator
          focusIndicator={false}
          onClick={() => go('/players')}
          active={currentPath == '/players'}
          icon={<Box pad={{ left: 'medium' }}><i className="material-icons">group</i></Box>}
          label={<Text margin={{ vertical: 'small', right: 'auto' }}>Players</Text>}
        />
      </Box>
    );
};