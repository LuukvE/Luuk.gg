import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  TextInput,
  Text,
  CheckBox,
} from 'grommet';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table';
import moment from 'moment';
import matchSorter from 'match-sorter';

const Styles = styled.div`
  table {
    border-spacing: 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    min-width: 100%;
    margin-bottom: 12px;

    thead th {
      background: white;
      vertical-align: top;
      text-align: left;
      white-space: nowrap;
      &:first-child {
        padding-left: 16px;
        vertical-align: middle;
      }
      div:first-child {
        &:hover .material-icons {
          opacity: 1;
        }
        .material-icons {
          font-size: 20px;
          margin: 0 4px 5px 0;
          vertical-align: middle;
          opacity: 0.3;
        }
      }
      input {
        outline: 0;
        padding: 2px 0;
      }
      .select-input input {
        text-align: center;
      }
    }

    tbody td:first-child {
      padding-left: 16px;
    }

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {
        background: #f8fafb;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      border-right: 1px solid rgba(0,0,0,0.1);
      white-space: nowrap;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .material-icons.align-middle {
    vertical-align: middle;
  }

  .pagination {
    padding: 0.5rem;
    text-align: center;
    strong {
      margin: 0 12px;
      vertical-align: top;
      line-height: 36px;
    }
  }
`

// Create an editable cell renderer
const EditableCell = ({
  cell: { column: { Header }, value: initialValue },
  row: { index, original },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editable,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  if(Header == 'logo_icon')  return <img
    style={{ height: '30px', margin: '-5px 0' }}
    src={`/teams/${
    original.id
  }.png`}
  />
  
  if(Header == 'date_start') return <Text>{moment(value).format('YYYY-MM-DD HH:mm')}</Text>;


  if(Header == 'results') return <Box
    flex
    direction="row"
  >
    <Text alignSelf="start">{original.teams.find(t => t.id == value[0].team_id).name}</Text><Text
      color={value[0].winner ? 'status-ok' : 'status-critical'}
      margin={{ left: 'small', right: 'xsmall' }}
      alignSelf="center"
    >{ value[0].score }
    </Text> <Text alignSelf="center">vs</Text> <Text
                                                                                              margin={{ right: 'small', left: 'xsmall' }}
                                                                                              color={value[1].winner ? 'status-ok' : 'status-critical'}
                                                                                              alignSelf="center"
                                                                                            >{value[1].score}
                                                                                            </Text> <Text
      alignSelf="end"
    >{original.teams.find(t => t.id == value[1].team_id).name}
    </Text>
  </Box>;

  const states = ['', 'Concluded'];

  if(typeof value === 'number') {
    if(states[value]) return <Text>{ states[value] }</Text>;
  }

  if(value && typeof value !== 'string') return <Text>{
    value.fullname || value.full_name || value.name || ''
  }
  </Text>;

  if (!editable) {
    return `${initialValue}`
  }

  return <TextInput
    plain
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  let timeout;

  return (
    <TextInput
      plain
      size="small"
      onChange={e => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(setFilter, 200, e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search (${count})`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Be sure to pass our updateMyData and the disablePageResetOnDataChange option
function Table({ columns, data, updateMyData, disablePageResetOnDataChange }) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    [],
  )

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      Cell: EditableCell,
    }),
    [],
  )

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // nestExpandedRows: true,
      initialState: { pageIndex: 0, pageSize: 5  },
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data
      disablePageResetOnDataChange,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  )

  const $table = useRef();

  useEffect(() => {
    const { parentNode : $c } = $table.current.parentNode;
    (function fit(n, tableHeight) {
      if(n > 50) return;
      requestAnimationFrame(next);
      setPageSize(n);
      function next() {
        if(!$table.current || tableHeight == $table.current.clientHeight) return;
        if($c.scrollHeight > $c.clientHeight) return setPageSize(n - 1);
        fit(n + 1, $table.current.clientHeight);
      }
    }(7));
  }, []);

  // Render the UI for your table
  return (
    <>
      <table ref={$table} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ?
                          <i className="material-icons">list</i> : 
                          <i className="material-icons">folder</i>}
                      </span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <i className="material-icons">arrow_drop_down</i>
                          : <i className="material-icons">arrow_drop_up</i>
                        : ''}
                    </span>
                  </div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            row => {
              prepareRow(row);
              const props = row.getExpandedToggleProps();
              props.className = 'material-icons align-middle';
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            {row.isExpanded ?
                              <i {...props}>arrow_drop_down</i> :
                              <i {...props}>arrow_right</i>}
                            {' '}
                            {cell.render('Cell', { editable: false })}
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render('Aggregated')
                        ) : cell.isRepeatedValue ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render('Cell', { editable: true })
                        )}
                      </td>
                    )
                  })}
                </tr>
              )},
          )}
        </tbody>
      </table>
      <div className="pagination">
        <Button
          label={<i className="material-icons">keyboard_arrow_left</i>}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        />
        <strong>
          {pageIndex + 1} / {pageOptions.length}
        </strong>
        <Button
          label={<i className="material-icons">keyboard_arrow_right</i>}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        />
      </div>
    </>
  )
}

function List({ type, items }) {
  const columns = Object.keys(items[0] || {}).reduce((memo, property) => {
    if([
      'id',
      'logo',
      'perid',
      'links',
      'tier_label',
      'version',
      'teams',
      'state_label',
      'last_modified',
    ].includes(property)) return memo;

    memo.push({
      Header: property,
      accessor: property,
      aggregate: ['sum', 'count'],
      Aggregated: ({ cell: { value } }) => `${value} results`,
    });

    return memo;
  }, [{
    id: 'selection',
    groupByBoundary: true,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Box align="center">
        <CheckBox {...getToggleAllRowsSelectedProps()} />
      </Box>
    ),
    Cell: ({ row }) => (
      <Box align="center">
        <CheckBox {...row.getToggleRowSelectedProps()} />
      </Box>
    ),
  }]);

  const [data, setData] = useState(() => items);

  const [originalData] = useState(data);

  const resetData = () => {
    // Don't reset the page when we do this
    skipPageResetRef.current = true
    setData(originalData)
  };

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.
  const skipPageResetRef = useRef(false);

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnID and new value to update the
  // original data
  const updateMyData = (rowIndex, columnID, value) => {
    // We also turn on the flag to not reset the page
    skipPageResetRef.current = true
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnID]: value,
          }
        }
        return row
      }),
    )
  }

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    skipPageResetRef.current = false
  }, [data])

  return (
    <Styles>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        disablePageResetOnDataChange={skipPageResetRef.current}
      />
    </Styles>
  )
}

export default List;