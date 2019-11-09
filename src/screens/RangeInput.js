import React from 'react';

import { RangeInput } from 'grommet';
import { doc, themeDoc } from 'grommet/components/RangeInput/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(RangeInput).toJSON();

export default () => (
  <Page>
    <Doc
      name="RangeInput"
      desc={desc}
      code={`function Example() {
  const [value, setValue] = React.useState(10);
  return (
    <RangeInput
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const RangeInputItem = ({ name, path }) => (
  <Item name={name} path={path} center pad="large">
    <RangeInput />
  </Item>
);

RangeInputItem.propTypes = Item.propTypes;
