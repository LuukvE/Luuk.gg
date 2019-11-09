import React from 'react';

import { InfiniteScroll } from 'grommet';
import { Descend } from 'grommet-icons';
import { doc } from 'grommet/components/InfiniteScroll/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(InfiniteScroll).toJSON();

export default () => (
  <Page>
    <Doc
      name="InfiniteScroll"
      desc={desc}
      code={`<Box height="small" overflow="auto">
  <InfiniteScroll items={[1, 2, 3, 4, 5, 6, 7]}>
    {(item) => (
      <Box
        flex={false}
        pad="medium"
        background={\`dark-\${(item % 3) + 1}\`}
      >
        <Text>{item}</Text>
      </Box>
    )}
  </InfiniteScroll>
</Box>`}
    />
  </Page>
);

export const InfiniteScrollItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Descend color="brand" size="xlarge" />
  </Item>
);

InfiniteScrollItem.propTypes = Item.propTypes;
