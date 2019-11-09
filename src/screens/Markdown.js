import React from 'react';

import { Markdown } from 'grommet';
import { doc } from 'grommet/components/Markdown/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Markdown).toJSON();

const CONTENT = `## Grommet **heart**s markdown

Favorite thing, [link](https://twitter.com/grommet_io)`;

export default () => (
  <Page>
    <Doc
      name="Markdown"
      desc={desc}
      code={`<Markdown>${CONTENT}</Markdown>`}
      syntaxes={{
        components: [
          {
            p: {
              component: 'Paragraph',
              props: {
                size: 'medium',
              },
            },
          },
        ],
      }}
    />
  </Page>
);

export const MarkdownItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <code>grommet **heart**&#39;s markdown</code>
  </Item>
);

MarkdownItem.propTypes = Item.propTypes;
