import React from 'react';

import { ThemeContext } from 'grommet/contexts';
import { Paint } from 'grommet-icons';
import { doc } from 'grommet/contexts/ThemeContext/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(ThemeContext.Extend).toJSON();

export default () => (
  <Page>
    <Doc
      name="ThemeContext"
      title="ThemeContext .Extend"
      desc={desc}
      code={`<ThemeContext.Extend
  value={{ global: { colors: { doc: '#ff99cc' } } }}
>
  <Box pad="large" background="doc" />
</ThemeContext.Extend>`}
    />
  </Page>
);

export const ThemeContextItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Paint color="brand" size="xlarge" />
  </Item>
);

ThemeContextItem.propTypes = Item.propTypes;
