import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { RouterContext } from '../Router';

const RoutedButton = ({
  alignSelf,
  children,
  fill,
  icon,
  label,
  path,
  plain,
  target,
}) => {
  const { go } = React.useContext(RouterContext);
  return (
    <Button
      href={path}
      onClick={event => {
        event.preventDefault();
        go(path, target);
      }}
      alignSelf={alignSelf}
      fill={fill}
      icon={icon}
      label={label}
      plain={plain}
    >
      {children}
    </Button>
  );
};

RoutedButton.propTypes = {
  ...Button.propTypes,
  path: PropTypes.string.isRequired,
  target: PropTypes.string,
};

RoutedButton.defaultProps = {
  target: undefined,
};

export default RoutedButton;
