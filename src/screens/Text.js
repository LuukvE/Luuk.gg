import React from 'react';

import { Box, Text } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Text/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Text).toJSON();

export default () => (
  <Page>
    <Doc
      name="Text"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        color: 'status-critical',
      }}
      code={'<Text>simple text</Text>'}
      example={<Text>simple text</Text>}
      examples={{
        color: <Text color="status-critical">status-critical</Text>,
        size: (
          <Box direction="row" justify="end" wrap>
            {['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].map(
              size => (
                <Box key={size} margin="xsmall">
                  <Text size={size}>A</Text>
                </Box>
              ),
            )}
          </Box>
        ),
        truncate: (
          <Box direction="row" justify="end">
            <Box basis="xsmall">
              <Text truncate>Lorem ipsum</Text>
            </Box>
          </Box>
        ),
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const TextItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Text size="large">non-semantic text</Text>
  </Item>
);

TextItem.propTypes = Item.propTypes;
