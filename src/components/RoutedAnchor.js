import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { RouterContext } from '../Router';

const RoutedAnchor = ({ icon, label, path, target }) => {
  const { go } = React.useContext(RouterContext);
  return (
    <Anchor
      href={path}
      icon={icon}
      label={label}
      onClick={event => {
        event.preventDefault();
        go(path, target);
      }}
    />
  );
};

RoutedAnchor.propTypes = {
  ...Anchor.propTypes,
  path: PropTypes.string.isRequired,
};

export default RoutedAnchor;
