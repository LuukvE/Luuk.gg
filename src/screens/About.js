import React, { useEffect } from 'react';
import { Box, Paragraph, Anchor } from 'grommet';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg';
  });

  return (
    <Box
      flex
      pad={{ horizontal: 'small' }}
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'xsmall', color: 'light-1' }}
    >
      <Paragraph fill size="large" margin={{ vertical: 'medium', horizontal: 'small' }}>
        This modern web application is built on top of <Anchor
          target="_blank"
          href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          label="HTML5"
        />, <Anchor
          href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          target="_blank"
          label="CSS3"
        /> and <Anchor
          href="https://developer.mozilla.org/en-US/docs/Web/Javascript"
          target="_blank"
          label="Javascript ES6"
        /> using <Anchor
          href="https://reactjs.org/docs/react-api.html"
          target="_blank"
          label="React 16"
        />
      </Paragraph>
    </Box>
  );
};