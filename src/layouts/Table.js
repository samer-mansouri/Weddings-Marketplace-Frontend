import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce  } from "react-table";
import GlobalFilter from "../components/GlobalFilter";

function Table({ table, adminCats }) {

  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    //new
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

    state,
    preGlobalFilteredRows, // new
    setGlobalFilter,
  } = useTable({
      columns,
    data,
  },
  useGlobalFilter,
    usePagination,
      // new
  )


  // Render the UI for your table
  return (
    <div className="h-screen bg-gray-100 pt-5 px-8">
    <div className="flex mb-4 ml-3 justify-between">
    <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />  
      {
        adminCats ?
        <Link to="/addcategory" className="text-base font-medium text-white hover:bg-blue-700 py-2 rounded-md px-2  bg-blue-500">
              Ajouter une catégorie
            </Link> :''
      }
    </div>
    <table {...getTableProps()} border="1" className="min-w-full divide-y divide-gray-200 shadow-md mb-5 rounded-lg">
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th 
              scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      {
        data.length > 0 ?
        <tbody {...getTableBodyProps()}
      className="bg-white divide-y divide-gray-200"
      >
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td 
                className="px-6 py-4 w-24 whitespace-nowrap text-sm font-medium overflow-x-auto"
                {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody> : <div>
      <h2
        className="py-4 w-full flex justify-center
        text-xl font-bold uppercase text-gray-500">
      Pas de données à afficher</h2>
      </div>
      }
    </table>

    <div className="pagination mx-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}
        className="bg-white rounded border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
        >
        {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}
                className="bg-white rounded border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
        >
        {'<'}
        </button>{' '}
        <button 
                className="bg-white rounded border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
        onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
        </button>{' '}
        <button 
                className="bg-white rounded border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
        onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
        </button>{' '}
        <span className="ml-16">
        Page{' '}
        <strong>
            {state.pageIndex + 1} parmis {pageOptions.length}
        </strong>{' '}
        </span>
        <select
        value={state.pageSize}
        onChange={e => {
            setPageSize(Number(e.target.value))
        }}
        className="appearance-none rounded-lg bg-white relative ml-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-[#ffc65e] focus:border-[#ffc65e] focus:z-10 sm:text-sm"

        >
        {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
            Voir {pageSize}
            </option>
        ))}
        </select>
    </div>
    </div>
  );
}

export default Table;