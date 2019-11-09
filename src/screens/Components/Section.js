import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Grid, Heading } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';

const Section = forwardRef(({ children, index, name }, ref) => (
  <Box
    ref={ref}
    id={name}
    pad={{ vertical: 'medium' }}
    animation={[
      { type: 'zoomIn', duration: 500, delay: 100 + 100 * index },
      { type: 'fadeIn', duration: 500, delay: 100 * index },
    ]}
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      margin={{ top: 'none', horizontal: 'small' }}
    >
      <Heading level={2}>{name}</Heading>
      <Anchor href={`#${name}`} icon={<LinkIcon color="light-4" />} />
    </Box>
    {Grid.available ? (
      <Grid
        columns={{ count: 'fill', size: ['small', 'medium'] }}
        rows="small"
        gap={{ row: 'medium' }}
      >
        {children}
      </Grid>
    ) : (
      <Box direction="row" wrap>
        {React.Children.map(children, child => (
          <Box basis="medium" pad="small">
            <Box basis="small">{child}</Box>
          </Box>
        ))}
      </Box>
    )}
  </Box>
));

Section.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Section;
