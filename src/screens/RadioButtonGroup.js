import React from 'react';

import { RadioButtonGroup } from 'grommet';
import { doc } from 'grommet/components/RadioButtonGroup/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(RadioButtonGroup).toJSON();

export default () => (
  <Page>
    <Doc
      name="RadioButtonGroup"
      desc={desc}
      code={`function Example() {
  const [value, setValue] = React.useState('one');
  return (
    <RadioButtonGroup
      name="doc"
      options={['one', 'two']}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}`}
      syntaxes={{
        options: [
          ['string'],
          [
            {
              disabled: false,
              id: 'ONE',
              name: 'one',
              value: '1',
              label: 'one',
            },
          ],
        ],
      }}
    />
  </Page>
);

export const RadioButtonGroupItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <RadioButtonGroup
      name="group"
      options={['one', 'two']}
      value="one"
      onChange={() => {}}
    />
  </Item>
);

RadioButtonGroupItem.propTypes = Item.propTypes;
