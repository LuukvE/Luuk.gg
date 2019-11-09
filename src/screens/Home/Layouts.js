import React from 'react';
import { Box } from 'grommet';
import RoutedAnchor from '../../components/RoutedAnchor';
import Tile from './Tile';

export default () => {
  const [build, setBuild] = React.useState(true);
  const [phase, setPhase] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextBuild = (build && phase < 6) || (!build && phase === 1);
      const nextPhase = nextBuild ? phase + 1 : phase - 1;
      setBuild(nextBuild);
      setPhase(nextPhase);
    }, 2000);
    return () => clearInterval(timer);
  }, [build, phase]);

  return (
    <Tile
      name="layouts can be more flexible"
      summary={
        <span>
          Support all the devices! use&nbsp;
          <RoutedAnchor path="/box">Flexbox</RoutedAnchor> and&nbsp;
          <RoutedAnchor path="/grid">CSS Grid</RoutedAnchor> to provide layouts
          for all those new phones and widescreen displays.
        </span>
      }
      direction="row"
      width="medium"
      overflow="hidden"
    >
      <Box
        flex
        animation="fadeIn"
        alignSelf="stretch"
        justify="center"
        pad="xsmall"
      >
        <Box
          basis={phase >= 3 ? '1/2' : 'full'}
          pad={{ horizontal: 'medium', vertical: 'large' }}
          background="accent-1"
          round="small"
        />
      </Box>
      {phase >= 2 && (
        <Box
          flex
          animation="fadeIn"
          alignSelf="stretch"
          pad="xsmall"
          gap="small"
        >
          <Box flex pad="large" background="neutral-1" round="small" />
          {phase >= 3 && (
            <Box
              flex
              animation="fadeIn"
              pad="medium"
              background="neutral-2"
              round="small"
            />
          )}
        </Box>
      )}
      {phase >= 4 && (
        <Box
          flex
          animation="fadeIn"
          alignSelf="stretch"
          align="start"
          pad="xsmall"
          gap="small"
        >
          <Box
            flex
            alignSelf="stretch"
            pad={{ horizontal: 'large', vertical: 'medium' }}
            background="status-ok"
            round="small"
          />
          {phase >= 5 && (
            <Box
              flex
              animation="fadeIn"
              pad="medium"
              background="status-warning"
              round="small"
            />
          )}
          {phase >= 6 && (
            <Box
              flex
              animation="fadeIn"
              pad="medium"
              background="status-critical"
              round="small"
            />
          )}
        </Box>
      )}
    </Tile>
  );
};
