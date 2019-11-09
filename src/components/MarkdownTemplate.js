import React from 'react';
import PropTypes from 'prop-types';
import { Box, Markdown } from 'grommet';

const MarkdownTemplate = ({ children, desc, name }) => {
  const content = `
  # ${name} 
  ## ${desc} 
  ${children}`;
  return (
    <Box width="xlarge" alignSelf="center">
      <Markdown>{content}</Markdown>
    </Box>
  );
};

MarkdownTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  desc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export { MarkdownTemplate };
