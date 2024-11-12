import React, { PropsWithChildren } from "react";

import MUIDataTable, {
  MUIDataTableIsRowCheck,
  MUIDataTableProps,
} from "mui-datatables";
import { styled } from "@mui/material/styles";
import { PaginationColumns, PaginationTableOptions } from "./interface";
import { TableRow, TableCell } from "@mui/material";

const DataTable = styled(MUIDataTable)<MUIDataTableProps>(({ theme }) => ({
  ".MuiButton-root": {
    // padding: '0',
    // minWidth: 0,
  },
  ".MuiTableCell-root": {
    padding: "7px 15px",
  },
  ".MuiToolbar-root": {
    padding: "15px",
  },
  // paddingTop:'200px'
}));

interface Props<ROW> {
  columns: PaginationColumns[];
  data: ROW[];
  options?: PaginationTableOptions;
  tableTitle?: string;

  renderRowSubComponent?: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => React.ReactNode;
  handleRowClick?: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number }
  ) => void;
  isRowExpandable?: (
    dataIndex: number,
    expandedRows?: MUIDataTableIsRowCheck
  ) => boolean;
  rowIdsForExpand?: number[];
}

const PaginationTable = <ROW extends object>(
  props: PropsWithChildren<Props<ROW>>
) => {
  const {
    columns,
    data,
    options,
    tableTitle,
    renderRowSubComponent,
    handleRowClick,
    isRowExpandable,
    rowIdsForExpand,
  } = props;

  return (
    <DataTable
      title={tableTitle}
      data={data}
      columns={columns}
      options={{
        filter: false,
        filterType: "textField",
        // viewColumns: false,
        // download: false,
        // print: false,
        // search: false,
        responsive: "simple",
        elevation: 0,
        expandableRowsHeader: false,
        selectableRows: "none",
        expandableRows: !!renderRowSubComponent,
        expandableRowsOnClick: !!renderRowSubComponent,
        isRowExpandable: isRowExpandable,
        onRowClick: handleRowClick,
        rowsExpanded: rowIdsForExpand,
        renderExpandableRow: (
          rowData: string[],
          rowMeta: { dataIndex: number; rowIndex: number }
        ) => {
          if (renderRowSubComponent)
            return (
              <TableRow>
                <TableCell colSpan={4}>
                  {renderRowSubComponent(rowData, rowMeta)}{" "}
                </TableCell>
              </TableRow>
            );
        },
        ...options,
      }}
    />
  );
};

export default PaginationTable;
