import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor, Heading, ThemeContext } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Prop } from './Prop';

const themeValue = (theme, path) => {
  const parts = path.split('.');
  let node = theme;
  while (node && parts.length) {
    node = node[parts.shift()];
  }
  return node;
};

export const ThemeProps = ({ examples, syntaxes, themeDoc }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <Box
      id="theme"
      margin={{ vertical: 'large' }}
      border={{ side: 'top', size: 'medium', color: 'brand' }}
    >
      <Box
        direction="row"
        justify="between"
        align="center"
        margin={{ top: 'medium', bottom: 'xlarge' }}
      >
        <Heading level={2} margin="none">
          Theme
        </Heading>
        <Anchor href="#theme" icon={<LinkIcon color="light-4" />} />
      </Box>
      {Object.keys(themeDoc).map((key, index) => {
        const themeProp = themeDoc[key];
        return (
          <Prop
            key={key}
            property={{ name: key, ...themeProp }}
            first={!index}
            syntax={
              (syntaxes || {})[key] ||
              themeValue(theme, key) ||
              (key.endsWith('.extend') && ['any CSS', '(props) => {}'])
            }
            example={examples[key]}
          />
        );
      })}
    </Box>
  );
};

ThemeProps.propTypes = {
  desc: PropTypes.shape({}),
  examples: PropTypes.shape({}),
  syntaxes: PropTypes.shape({}),
  themeDoc: PropTypes.shape({}),
};

ThemeProps.defaultProps = {
  desc: undefined,
  examples: {},
  syntaxes: undefined,
  themeDoc: undefined,
};
