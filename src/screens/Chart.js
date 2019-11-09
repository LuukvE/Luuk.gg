import React from 'react';

import { Chart } from 'grommet';
import { doc, docCalcs, themeDoc } from 'grommet/components/Chart/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Chart).toJSON();
const Dummy = () => <div />;
const descCalcs = docCalcs(Dummy).toJSON();

export default () => (
  <Page>
    <Doc
      name="Chart"
      desc={desc}
      themeDoc={themeDoc}
      code={`<Chart
  bounds={[[0, 7], [0, 100]]}
  values={[
    { value: [7, 100], label: 'one hundred' },
    { value: [6, 70], label: 'seventy' },
    { value: [5, 60], label: 'sixty' },
    { value: [4, 80], label: 'eighty' },
    { value: [3, 40], label: 'forty' },
    { value: [2, 0], label: 'zero' },
    { value: [1, 30], label: 'thirty' },
    { value: [0, 60], label: 'sixty' },
  ]}
  aria-label="chart"
/>`}
      syntaxes={{
        ...genericSyntaxes,
        bounds: [[[0, 10], [0, 100]]],
        color: [
          'accent-1',
          { color: 'accent-1', opacity: true },
          {
            VALUES: {
              opacity: ['weak', 'medium', 'strong', true],
            },
          },
        ],
        onClick: '() => {}',
        onHover: '(true) => {}',
        size: [
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'full',
          'any CSS size',
          { height: '...', width: '...' },
        ],
        values: [
          [20, 30],
          [{ value: [10, 20] }],
          [
            {
              value: [10, 10, 20],
              label: 'first',
              onClick: '() => {}',
              onHover: '() => {}',
            },
          ],
        ],
      }}
    />

    <Doc title="Calc" name="calcs" nav={false} desc={descCalcs} />
  </Page>
);

const CHART_VALUES = [
  { value: [4, 5], label: '4' },
  { value: [3, 2], label: '3' },
  { value: [2, 10], label: '2' },
  { value: [1, 7], label: '1' },
  { value: [0, 3], label: '0' },
];

export const ChartItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Chart
      aria-label="Chart example"
      bounds={[[0, 4], [0, 10]]}
      size={{ width: 'small', height: 'xsmall' }}
      round
      color="brand"
      values={CHART_VALUES}
    />
  </Item>
);

ChartItem.propTypes = Item.propTypes;
