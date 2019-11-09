import React from 'react';

import { Box, Menu } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Menu/doc';

import { More } from 'grommet-icons';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Menu).toJSON();

function onClick(event) {
  event.preventDefault();
  // eslint-disable-next-line no-alert
  alert('hi');
}

export default () => (
  <Page>
    <Doc
      name="Menu"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        dropAlign: [
          { top: 'top', left: 'left' },
          { bottom: 'bottom', right: 'right' },
        ],
        dropBackground: [
          'neutral-1',
          {
            color: 'neutral-1',
            opacity: true,
          },
          {
            VALUES: {
              opacity: ['weak', 'medium', 'strong', true],
            },
          },
        ],
        icon: [true, false, '<Add />'],
        items: [[{}, {}]],
        label: ['Actions', '<Box>...</Box>'],
        messages: [{ openMenu: 'Open Menu', closeMenu: 'Close Menu' }],
      }}
      code={`<Menu
  label="Menu"
  items={[
    { label: 'First Action', onClick: () => {} },
    { label: 'Second Action', onClick: () => {} },
  ]}
/>`}
      examples={{
        icon: (
          <Menu
            dropAlign={{ top: 'top', right: 'right' }}
            background="neutral-4"
            icon={<More color="brand" />}
            items={[
              { label: 'First Action', onClick },
              { label: 'Second Action', onClick },
            ]}
          />
        ),
        label: (
          <Menu
            label="Menu"
            items={[
              { label: 'First Action', onClick },
              { label: 'Second Action', onClick },
            ]}
          />
        ),
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const MenuItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Box flex={false}>
      <Menu tabIndex="-1" size="large" label="i'm a menu" items={[]} />
      <Box
        elevation="medium"
        pad={{ horizontal: 'xlarge', vertical: 'large' }}
      />
    </Box>
  </Item>
);

MenuItem.propTypes = Item.propTypes;
