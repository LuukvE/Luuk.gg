import React from 'react';

import { Grommet } from 'grommet';
import { Grommet as GrommetIcon } from 'grommet-icons';
import { doc, themeDoc } from 'grommet/components/Grommet/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Grommet).toJSON();

export default () => (
  <Page>
    <Doc
      name="Grommet"
      desc={desc}
      code={`<Grommet
  theme={{ global: { colors: { doc: '#ff99cc' } } }}
>
  <Box pad="large" background="doc" />
</Grommet>`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const GrommetItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <GrommetIcon color="brand" size="xlarge" />
  </Item>
);

GrommetItem.propTypes = Item.propTypes;
