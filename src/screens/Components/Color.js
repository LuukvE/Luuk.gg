import React from 'react';
import { Box, ThemeContext } from 'grommet';
import Item from './Item';

const ACCENT_REGEXP = /^accent-/i;
const NEUTRAL_REGEXP = /^neutral-/i;
const STATUS_REGEXP = /^status-/i;

export default () => (
  <ThemeContext.Consumer>
    {theme => (
      <>
        <Item name="Brand" path="/color">
          <Box flex direction="row" background="brand" />
        </Item>
        <Item name="Accents" path="/color">
          <Box flex direction="row">
            {Object.keys(theme.global.colors)
              .filter(name => ACCENT_REGEXP.test(name))
              .map(name => (
                <Box key={name} flex background={name} />
              ))}
          </Box>
        </Item>
        <Item name="Neutrals" path="/color">
          <Box flex direction="row">
            {Object.keys(theme.global.colors)
              .filter(name => NEUTRAL_REGEXP.test(name))
              .map(name => (
                <Box key={name} flex background={name} />
              ))}
          </Box>
        </Item>
        <Item name="Status" path="/color">
          <Box flex direction="row">
            {Object.keys(theme.global.colors)
              .filter(name => STATUS_REGEXP.test(name))
              .map(name => (
                <Box key={name} flex background={name} />
              ))}
          </Box>
        </Item>
      </>
    )}
  </ThemeContext.Consumer>
);
