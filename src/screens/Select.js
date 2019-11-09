import React from 'react';

import { Select } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Select/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Select).toJSON();

export default () => (
  <Page>
    <Doc
      name="Select"
      desc={desc}
      code={`function Example() {
  const [value, setValue] = React.useState('medium');
  return (
    <Select
      options={['small', 'medium', 'large']}
      value={value}
      onChange={({ option }) => setValue(option)}
    />
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const SelectItem = ({ name, path }) => (
  <Item name={name} path={path} center pad={{ horizontal: 'large' }}>
    <Select options={[]} placeholder="Choices" tabIndex="-1" />
  </Item>
);

SelectItem.propTypes = Item.propTypes;
