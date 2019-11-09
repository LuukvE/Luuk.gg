import React from 'react';

import { CheckBox } from 'grommet';
import { doc, themeDoc } from 'grommet/components/CheckBox/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(CheckBox).toJSON();

export default () => (
  <Page>
    <Doc
      name="CheckBox"
      desc={desc}
      syntaxes={{
        id: 'a-dom-id',
        label: ['enabled', '<Box>...</Box>'],
        name: 'a-dom-name',
        onChange: '() => {}',
      }}
      code={`function Example() {
  const [checked, setChecked] = React.useState(true);
  return (
    <CheckBox
      checked={checked}
      label="interested?"
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const CheckBoxItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <CheckBox checked onChange={() => {}} />
  </Item>
);

CheckBoxItem.propTypes = Item.propTypes;
