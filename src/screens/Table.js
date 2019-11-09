import React from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from 'grommet';
import {
  doc as docTable,
  themeDoc as themeDocTable,
} from 'grommet/components/Table/doc';
import { doc as docTableBody } from 'grommet/components/TableBody/doc';
import {
  doc as docTableCell,
  themeDoc as themeDocTableCell,
} from 'grommet/components/TableCell/doc';
import { doc as docTableFooter } from 'grommet/components/TableFooter/doc';
import { doc as docTableHeader } from 'grommet/components/TableHeader/doc';
import { doc as docTableRow } from 'grommet/components/TableRow/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = docTable(Table).toJSON();
const descTableCell = docTableCell(TableCell).toJSON();
const descTableRow = docTableRow(TableRow).toJSON();
const descTableHeader = docTableHeader(TableHeader).toJSON();
const descTableFooter = docTableFooter(TableFooter).toJSON();
const descTableBody = docTableBody(TableBody).toJSON();

export default () => (
  <Page>
    <Doc
      name="Table"
      desc={desc}
      code={`<Table>
  <TableHeader>
    <TableRow>
      <TableCell scope="col" border="bottom">
        Name
      </TableCell>
      <TableCell scope="col" border="bottom">
        Flavor
      </TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell scope="row">
        <strong>Eric</strong>
      </TableCell>
      <TableCell>Coconut</TableCell>
    </TableRow>
    <TableRow>
      <TableCell scope="row">
        <strong>Chris</strong>
      </TableCell>
      <TableCell>Watermelon</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      themeDoc={themeDocTable}
    />

    <Doc
      name="TableCell"
      nav={false}
      desc={descTableCell}
      themeDoc={themeDocTableCell}
    />

    <Doc name="TableRow" nav={false} desc={descTableRow} />

    <Doc name="TableHeader" nav={false} desc={descTableHeader} />
    <Doc name="TableBody" nav={false} desc={descTableBody} />
    <Doc name="TableFooter" nav={false} title="Table" desc={descTableFooter} />
  </Page>
);

export const TableItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Box>
      {[0, 1, 2, 4].map(row => (
        <Box key={row} direction="row">
          {[0, 1, 2].map(col => (
            <Box
              key={col}
              border={{ color: 'brand' }}
              width="xxsmall"
              pad="small"
            />
          ))}
        </Box>
      ))}
    </Box>
  </Item>
);

TableItem.propTypes = Item.propTypes;
