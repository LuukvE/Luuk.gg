import React, { useEffect } from 'react';
import { Box, Paragraph, Anchor, Heading } from 'grommet';
import { authenticate, get } from '../utils/requests';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.gg';

    // authenticate('', '', (response) => {
    //   console.log(JSON.stringify(response, null, 2));
    // });

    // get('title', response => {
    //   console.log(JSON.stringify(response, null, 2));
    // });

  }, []);

  return (
    <Box
      flex
      pad={{ top: 'small', horizontal: 'small' }}
      overflow={{ vertical: 'auto' }}
      border={{ side: 'top', size: 'xsmall', color: 'rgba(0,0,0,0.3)' }}
    >
      <Heading
        size="small"
        color="#fff"
        alignSelf="center"
        margin={{ bottom: 'none' }}
      >
        E-Sports Directory Explorer
      </Heading>
      <Paragraph
        fill
        size="medium"
        color="#fff"
        alignSelf="center"
        margin={{ top: 'none', bottom: 'medium', horizontal: 'small' }}
      >
        Easily manage and gain insight into e-sports data
        </Paragraph>
        <img src="/earth.svg" />
        <Paragraph
        fill
        size="small"
        color="#fff"
        alignSelf="center"
        margin={{ bottom: 'auto' }}
        margin={{ vertical: 'medium', horizontal: 'small' }}
      >
        Developed by Luuk van Egeraat using <Anchor
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