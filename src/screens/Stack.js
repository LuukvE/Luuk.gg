import React from 'react';

import { Box, Stack } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Stack/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Stack).toJSON();

export default () => (
  <Page>
    <Doc
      name="Stack"
      desc={desc}
      code={`<Stack anchor="top-right">
  <Icons.Notification size="large" />
  <Box
    background="brand"
    pad={{ horizontal: 'xsmall' }}
    round
  >
    <Text>8</Text>
  </Box>
</Stack>`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const StackItem = ({ name, path }) => (
  <Item name={name} path={path}>
    <Box flex border={{ color: 'brand', size: 'xlarge' }}>
      <Box flex background="brand" margin="medium" />
    </Box>
  </Item>
);

StackItem.propTypes = Item.propTypes;
