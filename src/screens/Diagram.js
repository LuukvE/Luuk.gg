import React from 'react';

import { Box, Diagram, Stack } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Diagram/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Diagram).toJSON();

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  color: color || 'accent-1',
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

export default () => (
  <Page>
    <Doc
      name="Diagram"
      desc={desc}
      code={`<Stack guidingChild={1}>
  <Diagram
    connections={[
      {
        fromTarget: '1',
        toTarget: '2',
        thickness: 'xsmall',
        color: 'accent-2',
      },
      {
        fromTarget: '1',
        toTarget: '4',
        thickness: 'xsmall',
        color: 'accent-2',
        type: 'rectilinear',
      },
    ]}
  />
  <Box>
    <Box direction="row">
      <Box id="1" margin="small" pad="medium" background="light-4" />
      <Box id="2" margin="small" pad="medium" background="light-4" />
    </Box>
    <Box direction="row">
      <Box id="3" margin="small" pad="medium" background="light-4" />
      <Box id="4" margin="small" pad="medium" background="light-4" />
    </Box>
  </Box>
</Stack>`}
      syntaxes={{
        connections: [
          {
            fromTarget: 'my-dom-id-1',
            toTarget: 'my-dom-id-2',
          },
          {
            anchor: 'center',
            color: 'accent-1',
            fromTarget: 'my-dom-id-1',
            label: 'link 5',
            offset: undefined,
            thickness: 'medium',
            toTarget: 'my-dom-id-2',
            type: 'rectilinear',
          },
          {
            VALUES: {
              anchor: ['center', 'vertical', 'horizonta'],
              offset: ['xsmall', 'small', 'medium', 'large', 'any CSS size'],
              thickness: [
                'hair',
                'xxsmall',
                'xsmall',
                'small',
                'medium',
                'large',
                'any CSS size',
              ],
              type: ['direct', 'curved', 'rectilinear'],
            },
          },
        ],
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

const itemProps = {
  color: 'brand',
  thickness: 'xsmall',
  round: true,
};

export const DiagramItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Stack>
      <Box>
        <Box direction="row">
          {[1, 2, 3].map(id => (
            <Box
              key={id}
              id={id}
              basis="xxsmall"
              margin="small"
              pad="medium"
              round="full"
              background={{ color: 'brand', opacity: 'medium' }}
            />
          ))}
        </Box>
        <Box direction="row">
          {[4, 5, 6, 7].map(id => (
            <Box
              key={id}
              id={id}
              basis="xxsmall"
              margin="small"
              pad="medium"
              round="full"
              background={{ color: 'brand', opacity: 'medium' }}
            />
          ))}
        </Box>
      </Box>
      <Diagram
        connections={[
          connection('2', '4', itemProps),
          connection('3', '5', itemProps),
          connection('2', '5', itemProps),
          connection('3', '6', itemProps),
          connection('6', '7', itemProps),
        ]}
      />
    </Stack>
  </Item>
);

DiagramItem.propTypes = Item.propTypes;
