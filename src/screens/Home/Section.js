import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const Section = ({ children, width, background, pad }) => (
  <Box align="center" background={background} pad={pad || 'large'}>
    <Box width={width}>{children}</Box>
  </Box>
);

Section.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
};

Section.defaultProps = {
  width: 'xlarge',
};

export default Section;
