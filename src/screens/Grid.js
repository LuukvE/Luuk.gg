import React from 'react';

import { Box, Grid } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Grid/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Grid).toJSON();

const code = `<Grid
  rows={['xxsmall', 'xsmall']}
  columns={['xsmall', 'small']}
  gap="small"
  areas={[
    { name: 'header', start: [0, 0], end: [1, 0] },
    { name: 'nav', start: [0, 1], end: [0, 1] },
    { name: 'main', start: [1, 1], end: [1, 1] },
  ]}
>
  <Box gridArea="header" background="brand" />
  <Box gridArea="nav" background="light-5" />
  <Box gridArea="main" background="light-2" />
</Grid>`;

export default () => (
  <Page>
    <Doc
      name="Grid"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        areas: [
          {
            name: 'header',
            start: [0, 0],
            end: [0, 2],
          },
        ],
        columns: [
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'any CSS size',
          ['small', '...'],
          [['small', 'medium'], '...'],
          {
            count: 'fit',
            size: '...',
          },
          {
            VALUES: {
              count: ['fit', 'fill'],
              'array values': [
                'xsmall',
                'small',
                'medium',
                'large',
                'xlarge',
                'full',
                'flex',
                'auto',
                '1/2',
                '1/3',
                '2/3',
                '1/4',
                '2/4',
                '3/4',
              ],
            },
          },
        ],
        gap: [
          'small',
          'medium',
          'large',
          'none',
          'any CSS size',
          {
            row: '...',
            column: '...',
          },
        ],
        rows: [
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'any CSS size',
          ['small', '...'],
          [['small', 'medium'], '...'],
          {
            VALUES: {
              'array values': [
                'xsmall',
                'small',
                'medium',
                'large',
                'xlarge',
                'full',
                'flex',
                'auto',
                '1/2',
                '1/3',
                '2/3',
                '1/4',
                '2/4',
                '3/4',
              ],
            },
          },
        ],
      }}
      code={code}
      example={
        <Grid
          rows={['xxsmall', 'xsmall']}
          columns={['xsmall', 'flex', 'small']}
          gap="small"
          areas={[
            { name: 'header', start: [0, 0], end: [2, 0] },
            { name: 'nav', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
            { name: 'side', start: [2, 1], end: [2, 1] },
          ]}
        >
          <Box gridArea="header" background="brand" />
          <Box gridArea="nav" background="light-3" />
          <Box gridArea="main" background="light-1" />
          <Box gridArea="side" background="light-2" />
        </Grid>
      }
      themeDoc={themeDoc}
    />
  </Page>
);

export const GridItem = ({ name, path }) => (
  <Item name={name} path={path}>
    <Box flex direction="row">
      <Box basis="1/4" background="brand" margin={{ right: 'small' }} />
      <Box flex background="brand" />
      <Box basis="1/4" background="brand" margin={{ left: 'small' }} />
    </Box>
  </Item>
);

GridItem.propTypes = Item.propTypes;
