import React from 'react';

import { MarkdownTemplate } from '../../components/MarkdownTemplate';
import { nameToPath } from '../../structure';

import Page from '../../components/Page';

// Enhancment context = grommet principles, best practices, accessibilty support

const content = `
  ### [getting started with grommet](${nameToPath('starter')})
  ### [functions](${nameToPath('functions')})
  ### [resources](${nameToPath('resources')})
  ### [browser support](${nameToPath('browsers')})
`;

export default () => (
  <Page>
    <MarkdownTemplate
      name="Docs"
      desc="you got questions, we got some answers. something missing? hit us up on [slack](https://slackin.grommet.io/), or open an [issue](https://github.com/grommet/grommet/issues)."
    >
      {content}
    </MarkdownTemplate>
  </Page>
);
