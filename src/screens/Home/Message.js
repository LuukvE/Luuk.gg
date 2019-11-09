import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Image, Paragraph } from 'grommet';

const Message = ({ imageSrc, name, summary }) => (
  <Box basis="medium" align="center">
    <Box
      height="xsmall"
      width="xsmall"
      round="full"
      overflow="hidden"
      align="center"
      justify="center"
    >
      <Image width={96} fit="cover" src={imageSrc} />
    </Box>
    <Box width="medium" pad="medium">
      <Heading level={3} textAlign="center" margin="none">
        {name}
      </Heading>
      <Paragraph size="large" textAlign="center">
        {summary}
      </Paragraph>
    </Box>
  </Box>
);

Message.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.node.isRequired,
};

export default Message;
