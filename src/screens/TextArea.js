import React from 'react';

import { TextArea } from 'grommet';
import { doc, themeDoc } from 'grommet/components/TextArea/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(TextArea).toJSON();

export default () => (
  <Page>
    <Doc
      name="TextArea"
      desc={desc}
      code={`function Example() {
  const [value, setValue] = React.useState('');
  return (
    <TextArea
      placeholder="type here"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const TextAreaItem = ({ name, path }) => (
  <Item name={name} path={path} center pad={{ horizontal: 'xlarge' }}>
    <TextArea placeholder="Placeholder" disabled />
  </Item>
);

TextAreaItem.propTypes = Item.propTypes;
