import React from 'react';

import { Box, Paragraph } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Paragraph/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Paragraph).toJSON();

export default () => (
  <Page>
    <Doc
      name="Paragraph"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        color: 'neutral-1',
      }}
      code={`<Paragraph margin="none">
  Lorem ipsum dolor sit amet,
  consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua.
</Paragraph>`}
      examples={{
        size: (
          <Box direction="row" justify="end" wrap>
            {['small', 'medium', 'large', 'xlarge'].map(size => (
              <Box key={size} margin="xsmall">
                <Paragraph size={size} margin="none">
                  Lorem ipsum ...
                </Paragraph>
              </Box>
            ))}
          </Box>
        ),
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const ParagraphItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Paragraph>
      OASIS was much more than a game or an entertainment platform. It&apos;s a
      new way of life.
    </Paragraph>
  </Item>
);

ParagraphItem.propTypes = Item.propTypes;
