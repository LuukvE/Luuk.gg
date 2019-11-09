import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Markdown, Paragraph } from 'grommet';

const CenteredParagraph = () => <Paragraph textAlign="center" />;

const Header = ({ details, label, level, size, summary }) => (
  <Box align="center" margin={{ horizontal: 'large' }}>
    <Heading level={level} size={size} textAlign="center" margin="none">
      {label}
    </Heading>
    {summary &&
      ((typeof summary === 'string' && (
        <Paragraph size="xxlarge" textAlign="center">
          {summary.toLowerCase()}
        </Paragraph>
      )) ||
        summary)}
    {details && (
      <Markdown components={{ p: CenteredParagraph }}>
        {details
          .replace('<', '&lt;')
          .replace('>', '&gt;')
          .trim()}
      </Markdown>
    )}
  </Box>
);

Header.propTypes = {
  details: PropTypes.string,
  label: PropTypes.string.isRequired,
  level: PropTypes.number,
  size: PropTypes.oneOf(['xlarge', 'large']),
  summary: PropTypes.node,
};

Header.defaultProps = {
  details: undefined,
  level: 1,
  size: 'large',
  summary: undefined,
};

export default Header;
