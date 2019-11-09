import React from 'react';

import { Meter } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Meter/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Meter).toJSON();

export default () => (
  <Page>
    <Doc
      name="Meter"
      desc={desc}
      code={`<Meter
  values={[{
    value: 60,
    label: 'sixty',
    onClick: () => {}
  }]}
  aria-label="meter"
/>`}
      syntaxes={{
        ...genericSyntaxes,
        backgroundColor: [
          'light-2',
          {
            color: 'light-2',
            opacity: 'medium',
          },
        ],
        values: [
          [{ value: 75 }],
          [
            {
              value: 45,
              color: 'accent-1',
              highlight: false,
              label: 'utilization',
              onClick: '() => {}',
              onHover: '(true) => {}',
            },
          ],
        ],
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const MeterItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Meter
      aria-label="Meter example"
      type="circle"
      size="full"
      thickness="large"
      round
      background={{ color: 'brand', opacity: 'weak' }}
      values={[{ value: 60, label: 'sixty', color: 'brand' }]}
    />
  </Item>
);

MeterItem.propTypes = Item.propTypes;
