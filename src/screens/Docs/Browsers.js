import React from 'react';

import { MarkdownTemplate } from '../../components/MarkdownTemplate';
import Page from '../../components/Page';

const name = 'Browser Support';

const desc =
  'The following web browsers are tested and supported with Grommet.';

const children = `
  
  Apple Safari mobile and desktop, latest versions
  
  Google Chrome mobile and desktop, latest versions
  
  Mozilla Firefox, latest version
  
  Microsoft Edge, latest version
  
  Microsoft Internet Explorer Version 11, latest version
`;

export default () => (
  <Page>
    <MarkdownTemplate name={name} desc={desc}>
      {children}
    </MarkdownTemplate>
  </Page>
);
