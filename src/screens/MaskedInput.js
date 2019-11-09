import React from 'react';

import { MaskedInput } from 'grommet';
import { doc, themeDoc } from 'grommet/components/MaskedInput/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(MaskedInput).toJSON();

export default () => (
  <Page>
    <Doc
      name="MaskedInput"
      desc={desc}
      code={`<MaskedInput
  mask={[
    {
      length: [1, 2],
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', ],
      regexp: /^1[1-2]$|^[0-9]$/,
      placeholder: 'hh',
    },
    { fixed: ':' },
    {
      length: 2,
      options: ['00', '15', '30', '45'],
      regexp: /^[0-5][0-9]$|^[0-9]$/,
      placeholder: 'mm',
    },
    { fixed: ' ' },
    {
      length: 2,
      options: ['am', 'pm'],
      regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
      placeholder: 'ap',
    },
  ]}
  value=""
  onChange={(event) => {/* event.target.value */}}
/>`}
      syntaxes={{
        mask: `[
  {
    length: [1, 2],
    regexp: /^1[1-2]$|^[0-9]$/,
    placeholder: 'hh',
  },
  {
    fixed: ':',
  },
  ...
]`,
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const MaskedInputItem = ({ name, path }) => (
  <Item name={name} path={path} center pad={{ horizontal: 'xlarge' }}>
    <MaskedInput
      mask={[
        { placeholder: 'hh' },
        { fixed: ':' },
        { placeholder: 'mm' },
        { fixed: ' ' },
        { placeholder: 'ap' },
      ]}
      disabled
    />
  </Item>
);

MaskedInputItem.propTypes = Item.propTypes;
