import React from 'react';

import { Box, DataTable } from 'grommet';
import { doc } from 'grommet/components/DataTable/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';
import { genericSyntaxes } from '../utils/props';

const desc = doc(DataTable).toJSON();

export default () => (
  <Page>
    <Doc
      name="DataTable"
      desc={desc}
      code={`<DataTable
  columns={[
    {
      property: 'name',
      header: <Text>Name</Text>,
      primary: true,
    },
    {
      property: 'percent',
      header: 'Complete',
      render: datum => (
        <Box pad={{ vertical: 'xsmall' }}>
          <Meter
            values={[{ value: datum.percent }]}
            thickness="small"
            size="small"
          />
        </Box>
      ),
    },
  ]}
  data={[
    { name: 'Alan', percent: 20 },
    { name: 'Bryan', percent: 30 },
    { name: 'Chris', percent: 40 },
    { name: 'Eric', percent: 80 },
  ]}
/>`}
      syntaxes={{
        ...genericSyntaxes,
        background: [
          'light-2',
          ['white', 'light-2'],
          {
            header: 'dark-2',
            body: ['white', 'light-2'],
            footer: 'dark-3',
          },
        ],
        border: [
          true,
          'horizontal',
          { color: 'border', side: 'horizontal', size: 'small' },
          {
            header: 'bottom',
            body: { color: 'light-2', side: 'bottom' },
            footer: 'top',
          },
        ],
        columns: [
          [
            {
              align: 'center',
              aggregate: 'avg',
              footer: { aggregate: true },
              header: 'Name',
              primary: true,
              property: 'name',
              render: '(datum) => <Content />',
              search: true,
              sortable: true,
            },
          ],
          {
            VALUES: {
              align: ['start', 'center', 'end'],
              aggregate: ['avg', 'max', 'min', 'sum'],
            },
          },
        ],
        groupBy: [
          'location',
          {
            property: 'location',
            expand: ['Paris', 'Los Angeles'],
            onExpand: '(key) => {...}',
          },
        ],
        onClickRow: ['({ datum }) => {...}'],
        onMore: ['() => {...}'],
        onSearch: ['({ key: "search text", ... }) => {...}'],
      }}
    />
  </Page>
);

export const DataTableItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Box gap="xsmall">
      <Box background="brand" />
      {[0, 1, 2, 3].map(row => (
        <Box key={row * 100} direction="row" gap="xsmall">
          {[0, 1, 2].map(col => (
            <Box
              key={col * 100 + row * 10}
              background={
                (!row && 'brand') ||
                (!col && { color: 'brand', opacity: 'medium' }) ||
                undefined
              }
              border={col && row ? { color: 'brand' } : undefined}
              width={col ? 'xsmall' : 'xxsmall'}
              pad="small"
            />
          ))}
        </Box>
      ))}
    </Box>
  </Item>
);

DataTableItem.propTypes = Item.propTypes;
