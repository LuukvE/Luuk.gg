import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import RoutedButton from '../../components/RoutedButton';

const Item = ({ align, center, justify, name, pad, path, children }) => (
  <RoutedButton path={path} fill>
    <Box fill pad={{ horizontal: 'small' }}>
      <Heading level={3} size="small" margin={{ top: 'none', bottom: 'small' }}>
        {name}
      </Heading>
      <Box
        flex
        background={
          center ? { color: 'neutral-2', opacity: 'weak' } : undefined
        }
        justify={justify || (center ? 'center' : undefined)}
        align={align || (center ? 'center' : undefined)}
        pad={pad || (center ? 'small' : undefined)}
        overflow="hidden"
        round="small"
        style={{ pointerEvents: 'none' }}
      >
        {children}
      </Box>
    </Box>
  </RoutedButton>
);

Item.propTypes = {
  ...Box.propTypes,
  center: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

Item.defaultProps = {
  center: false,
  children: null,
};

export default Item;
