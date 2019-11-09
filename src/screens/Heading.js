import React from 'react';

import { Box, Heading } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Heading/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Heading).toJSON();

export default () => (
  <Page>
    <Doc
      name="Heading"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        a11yTitle: 'Open Drop',
        color: [
          'neutral-1',
          {
            dark: 'light-1',
            light: 'dark-2',
          },
        ],
        level: [1, 2, 3, 4, 5, 6],
      }}
      code={`<Heading margin="none">Chapter 1</Heading>`}
      example={<Heading margin="none">Chapter 1</Heading>}
      examples={{
        color: (
          <Heading margin="none" color="accent-2">
            A
          </Heading>
        ),
        level: (
          <Box direction="row" justify="end" wrap>
            {[1, 2, 3, 4].map(level => (
              <Box key={level} margin="xsmall">
                <Heading level={level} margin="none">
                  A
                </Heading>
              </Box>
            ))}
          </Box>
        ),
        margin: (
          <Box direction="row" justify="end" wrap>
            {['none', 'small', 'medium', 'large'].map(margin => (
              <Box key={margin} margin="xsmall">
                <Heading level={2} margin={margin}>
                  A
                </Heading>
              </Box>
            ))}
          </Box>
        ),
        size: (
          <Box direction="row" justify="end" wrap>
            {[1, 2, 3, 4].map(level => (
              <Box key={level} direction="row" justify="end">
                {['small', 'medium', 'large'].map(size => (
                  <Box key={size} margin="xsmall">
                    <Heading level={level} margin="none" size={size}>
                      A
                    </Heading>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ),
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const HeadingItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Heading level={2} margin="none">
      Chapter 1
    </Heading>
  </Item>
);

HeadingItem.propTypes = Item.propTypes;
