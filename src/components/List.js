import React, {
  useEffect,
  useMemo,
  useState,
  useRef
} from 'react';
import styled from 'styled-components';
import {
  Button,
  TextInput,
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
import matchSorter from 'match-sorter';

const Styles = styled.div`
  table {
    border-spacing: 0;
    border-bottom: 1px solid #F2F2F2;
    min-width: 100%;

    thead th {
      background: #F2F2F2;
      vertical-align: top;
      text-align: left;
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
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #F2F2F2;
      border-right: 1px solid #F2F2F2;

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
      float: right;
    }
  }
`

// Create an editable cell renderer
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
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

  if (!editable) {
    return `${initialValue}`
  }

  return <TextInput plain value={value} onChange={onChange} onBlur={onBlur} />
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
    state: {
      pageIndex
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // nestExpandedRows: true,
      initialState: { pageIndex: 0, pageSize: Math.floor((innerHeight - 100) / 48) },
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

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
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
                              <i {...props}>arrow_right</i>
                            }
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
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <strong>
          {pageIndex + 1} / {pageOptions.length}
        </strong>
        <Button label="<<" onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        {' '}
        <Button label="<" onClick={() => previousPage()} disabled={!canPreviousPage} />
        {' '}
        <Button label=">" onClick={() => nextPage()} disabled={!canNextPage} />
        {' '}
        <Button label=">>" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
      </div>
    </>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function List({ type, items }) {
  const columns = Object.keys(items[0]).reduce((memo, property) => {
    if(['id', 'perid', 'links', 'tier_label'].includes(property)) return memo;

    memo.push({
      Header: property,
      accessor: property,
      aggregate: ['sum', 'count'],
      Aggregated: ({ cell: { value } }) => `${value} results`
    });

    return memo;
  }, [{
    id: 'selection',
    groupByBoundary: true,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <CheckBox {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    Cell: ({ row }) => (
      <div>
        <CheckBox {...row.getToggleRowSelectedProps()} />
      </div>
    )
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