import React from 'react';

import { Box, Tabs, Tab, Text } from 'grommet';
import {
  doc as docTabs,
  themeDoc as themeDocTabs,
} from 'grommet/components/Tabs/doc';
import {
  doc as docTab,
  themeDoc as themeDocTab,
} from 'grommet/components/Tab/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = docTabs(Tabs).toJSON();
const descTab = docTab(Tab).toJSON();

export default () => (
  <Page>
    <Doc
      name="Tabs"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        activeIndex: [0],
        messages: [{ tabContents: 'Tab Contents' }],
        onActive: '(1) => {}',
      }}
      code={`<Tabs>
  <Tab title="tab 1">
    <Box pad="medium">One</Box>
  </Tab>
  <Tab title="tab 2">
    <Box pad="medium">Two</Box>
  </Tab>
</Tabs>`}
      themeDoc={themeDocTabs}
    />

    <Doc
      name="Tab"
      desc={descTab}
      nav={false}
      title="Tab"
      syntaxes={{
        title: ['Tab Title', '<Box>...</Box>'],
      }}
      themeDoc={themeDocTab}
    />
  </Page>
);

export const TabsItem = ({ name, path }) => (
  <Item name={name} path={path} center justify="end" pad="none">
    <Box direction="row" align="end" alignSelf="stretch" gap="small">
      <Box
        flex
        background={{ color: 'brand', opacity: 'medium' }}
        pad={{ vertical: 'medium', horizontal: 'small' }}
        round={{ corner: 'top', size: 'small' }}
      />
      <Box
        flex
        align="center"
        background="brand"
        pad={{ vertical: 'small', horizontal: 'small' }}
        round={{ corner: 'top', size: 'small' }}
      >
        <Text>i&#39;m a tab</Text>
      </Box>
      <Box
        flex
        background={{ color: 'brand', opacity: 'medium' }}
        pad={{ vertical: 'medium', horizontal: 'small' }}
        round={{ corner: 'top', size: 'small' }}
      />
    </Box>
  </Item>
);

TabsItem.propTypes = Item.propTypes;
