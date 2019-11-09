import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

const Key = ({ label }) => (
  <Box border={{ color: 'brand', size: 'medium' }} round="medium" pad="medium">
    <Text size="large" color="brand">
      {label}
    </Text>
  </Box>
);

Key.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Key;
