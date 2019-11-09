import React from 'react';

import {
  Box,
  Button,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Heading,
} from 'grommet';
import { doc } from 'grommet/components/SkipLinks/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';
import Key from './Components/Key';

const desc = doc(SkipLinks).toJSON();

export default () => (
  <Page>
    <Doc name="SkipLinks" desc={desc}>
      <Box
        basis="large"
        pad={{ horizontal: 'large', bottom: 'xlarge' }}
        align="start"
      >
        <Heading level={2} margin={{ top: 'none' }}>
          <strong>Examples</strong>
        </Heading>
        <SkipLinks>
          <SkipLink id="main" label="Main Content" />
          <SkipLink id="footer" label="Footer" />
        </SkipLinks>
        <Button onClick={() => {}} label="Test1" />
        <Box>
          <SkipLinkTarget id="main" />
          <Heading level={3}>Main Content</Heading>
          <Button onClick={() => {}} label="Test2" />
        </Box>
        <Box tag="footer">
          <SkipLinkTarget id="footer" />
          <Heading level={3}>Footer</Heading>
          <Button onClick={() => {}} label="Test3" />
        </Box>
      </Box>
    </Doc>
  </Page>
);

export const SkipLinksItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Key label="Tab" />
  </Item>
);

SkipLinksItem.propTypes = Item.propTypes;
