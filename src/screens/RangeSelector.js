import React from 'react';

import { Box, RangeSelector, Stack, Text } from 'grommet';
import { doc, themeDoc } from 'grommet/components/RangeSelector/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(RangeSelector).toJSON();

export default () => (
  <Page>
    <Doc
      name="RangeSelector"
      desc={desc}
      code={`function Example() {
  const [values, setValues] = React.useState([3, 7]);
  return (
    <Stack>
      <Box direction="row" justify="between">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
          <Box key={value} pad="small" border={false}>
            <Text style={{ fontFamily: 'monospace' }}>
              {value}
            </Text>
          </Box>
        ))}
      </Box>
      <RangeSelector
        direction="horizontal"
        invert={false}
        min={0}
        max={9}
        size="full"
        round="small"
        values={values}
        onChange={values => setValues(values)}
      />
    </Stack>
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const RangeSelectorItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Stack>
      <Box direction="row" gap="small">
        {[1, 2, 3, 4, 5].map(n => (
          <Box
            key={n * 100}
            width="xxsmall"
            height="xxsmall"
            align="center"
            justify="center"
          >
            <Text>{n}</Text>
          </Box>
        ))}
      </Box>
      <RangeSelector
        direction="horizontal"
        min={1}
        max={5}
        size="full"
        round="small"
        values={[2, 4]}
      />
    </Stack>
  </Item>
);

RangeSelectorItem.propTypes = Item.propTypes;
