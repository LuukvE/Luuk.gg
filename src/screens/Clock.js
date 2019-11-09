import React from 'react';

import { Clock } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Clock/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Clock).toJSON();

export default () => (
  <Page>
    <Doc
      name="Clock"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        hourLimit: [12, 24, '12', '24'],
        onChange: "('2018-10-23T10:37:46') => {}",
        time: ['2018-10-23T10:37:45', 'T10:37:45', 'PT10H37M45S'],
      }}
      code={`<Clock type="digital" />`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const ClockItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Clock size="large" type="digital" />
  </Item>
);

ClockItem.propTypes = Item.propTypes;
