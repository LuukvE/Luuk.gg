import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph } from 'grommet';

const Tile = ({
  children,
  name,
  summary,
  direction,
  gap,
  justify,
  overflow,
  width,
  wrap,
}) => (
  <Box basis="medium" align="center" margin="large">
    <Box
      direction={direction}
      height="small"
      align="center"
      gap={gap}
      justify={justify || 'center'}
      overflow={overflow}
      width={width}
      wrap={wrap}
    >
      {children}
    </Box>
    <Box width="medium" margin={{ top: 'large' }}>
      <Heading level={3} size="xlarge" textAlign="center" margin="none">
        {name}
      </Heading>
      <Paragraph size="xlarge" textAlign="center">
        {summary}
      </Paragraph>
    </Box>
  </Box>
);

Tile.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.node.isRequired,
};

export default Tile;
