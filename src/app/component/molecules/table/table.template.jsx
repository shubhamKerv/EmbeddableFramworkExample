import React from 'react';
import { backgroundImages, dataCell, dataRow, headerCell } from './table.style';

export default ({ tableProps, onClickContact, onClickRowItem }) => {
  let sortedColumnIndex = 0;
  const columnWidth = 100/tableProps.headers.length+1 + "%";
  const rowLength = tableProps.rows.length;
	console.log(tableProps);

  return (
    <table {...tableProps.getTableProps()} style={{width: "100%"}}>
      <thead>
        <tr>
          {tableProps.headers.map((header, index) => {
            let className, backgroundImageUrl;
            if(header.isSorted) {
              sortedColumnIndex = index+1;
              if(header.isSortedDesc) {
                className = "sort-desc";
                backgroundImageUrl = backgroundImages.sortDesc;
              }
              else {
                className = 'sort-asc';
                backgroundImageUrl = backgroundImages.sortAcs;
              }
            }
            else {
              className = "";
              backgroundImageUrl = backgroundImages.both;
            }

            return (
              <th 
                {...header.getHeaderProps(header.getSortByToggleProps())}
                className={className}
                style={headerCell(backgroundImageUrl, columnWidth)}
              >
                {header.render("Header")}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody {...tableProps.getTableBodyProps()}>
        {tableProps.rows.map((row, rowIndex) => {
          tableProps.prepareRow(row);

          return (
            <tr 
              {...row.getRowProps()}
              style={dataRow(rowIndex)}
              onClick = {() => onClickRowItem(row)}
            >
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td 
                    {...cell.getCellProps()}
                    style={dataCell(rowIndex, rowLength, sortedColumnIndex, cellIndex, rowIndex)}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};