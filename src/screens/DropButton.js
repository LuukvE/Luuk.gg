import React from 'react';

import { Box, Button, DropButton } from 'grommet';
import { FormDown } from 'grommet-icons';
import { doc } from 'grommet/components/DropButton/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(DropButton).toJSON();

export default () => (
  <Page>
    <Doc
      name="DropButton"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        dropAlign: [
          { top: 'top', left: 'left' },
          { bottom: 'bottom', right: 'right' },
        ],
        dropContent: '<Box>...</Box>',
        onClose: '() => {}',
        onOpen: '() => {}',
      }}
      code={`<DropButton
  label="Fancy Selector"
  dropAlign={{ top: 'bottom', right: 'right' }}
  dropContent={
    <Box pad="large" background="light-2" />
  }
/>`}
    />
  </Page>
);

export const DropButtonItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Box flex={false}>
      <Button
        label="i'm a button"
        icon={<FormDown />}
        reverse
        onClick={() => {}}
      />
      <Box
        elevation="medium"
        pad={{ horizontal: 'xlarge', vertical: 'large' }}
      />
    </Box>
  </Item>
);

DropButtonItem.propTypes = Item.propTypes;
