import { useSortBy, useTable } from "react-table";
import tableTemplate from "./table.template";

export const Table = ({ columns, data, onClickRowItem }) => {
  console.log("--------------", columns, data);
  const tableProps = useTable({columns, data}, useSortBy);

  return tableTemplate({ tableProps, onClickRowItem });
};