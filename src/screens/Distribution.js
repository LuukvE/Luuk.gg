import React from 'react';

import { Box, Distribution } from 'grommet';
import { doc } from 'grommet/components/Distribution/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Distribution).toJSON();

export default () => (
  <Page>
    <Doc
      name="Distribution"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        children: '({ value: 60 }) => {}',
        values: [[{ value: 60 }, { value: 40 }]],
      }}
      code={`<Distribution
  values={[
    { value: 50, color: 'light-3' },
    { value: 30, color: 'brand' },
    { value: 20, color: 'accent-1' },
    { value: 10, color: 'light-3' },
    { value: 5, color: 'brand' },
  ]}
>
  {value => (
    <Box pad="small" background={value.color} fill>
      <Text size="large">{value.value}</Text>
    </Box>
  )}
</Distribution>`}
    />
  </Page>
);

export const DistributionItem = ({ name, path }) => (
  <Item name={name} path={path} center pad="medium">
    <Box fill>
      <Distribution
        values={[
          { value: 70, opacity: 'medium' },
          { value: 50, opacity: 'medium' },
          { value: 30 },
          { value: 10, opacity: 'medium' },
        ]}
      >
        {({ opacity }) => (
          <Box
            pad="small"
            background={{ color: 'brand', opacity }}
            fill
            round="xsmall"
          />
        )}
      </Distribution>
    </Box>
  </Item>
);

DistributionItem.propTypes = Item.propTypes;
