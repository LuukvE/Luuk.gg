import React, { useEffect, useContext } from 'react';
import { Box, Heading, Paragraph, Anchor } from 'grommet';

import { RouterContext } from '../Router';
import List from './List';

const Landing = () => {
  useEffect(() => {
    document.title = 'Luuk.gg';
  });

  const { go } = useContext(RouterContext);

  return (
    <Box pad="medium" flex>
      <Heading margin="none">
        Luuk.gg
      </Heading>

      <Paragraph fill size="large" margin={{ vertical: 'small' }}>
        Boilerplate for professional web development.<br />
        Built on top of <Anchor
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

      <List />

    </Box>
  );
};

export default Landing;
