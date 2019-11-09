import React from 'react';
import { Box, Text } from 'grommet';
import { Action, Add, Edit, Trash } from 'grommet-icons';
import Tile from './Tile';

export default () => {
  const [build, setBuild] = React.useState(true);
  const [phase, setPhase] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextBuild = (build && phase < 5) || (!build && phase === 1);
      const nextPhase = nextBuild ? phase + 1 : phase - 1;
      setBuild(nextBuild);
      setPhase(nextPhase);
    }, 2000);
    return () => clearInterval(timer);
  }, [build, phase]);

  return (
    <Tile
      name="mix, match, and make stuff"
      summary={
        <span>
          tailor composite components with grommet. embrace atomic design
          methods and build a library that fits your needs.
        </span>
      }
      direction="row"
      wrap
      justify="between"
    >
      <Box elevation="medium">
        <Box
          width="medium"
          direction="row"
          align="center"
          justify="between"
          gap="medium"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
          <Text size="large">Menu</Text>
          {phase >= 2 && (
            <Box animation="fadeIn">
              <Add />
            </Box>
          )}
        </Box>
        <Box
          direction="row"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          background="light-2"
        >
          <Box direction="row" gap="small">
            {phase >= 3 && (
              <Box animation="fadeIn">
                <Edit />
              </Box>
            )}
            <Text>Edit</Text>
          </Box>
        </Box>
        <Box
          direction="row"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
          <Box direction="row" gap="small">
            {phase >= 3 && (
              <Box animation="fadeIn">
                <Action color={phase >= 4 ? 'light-5' : undefined} />
              </Box>
            )}
            <Text color={phase >= 4 ? 'light-5' : undefined}>Connect</Text>
          </Box>
          {phase >= 4 && (
            <Box animation="fadeIn">
              <Text color="status-critical">busy</Text>
            </Box>
          )}
        </Box>
        <Box
          direction="row"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
          <Box direction="row" gap="small">
            {phase >= 3 && (
              <Box animation="fadeIn">
                <Trash />
              </Box>
            )}
            <Text>Delete</Text>
          </Box>
        </Box>
      </Box>
    </Tile>
  );
};
