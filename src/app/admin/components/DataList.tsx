"use client";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import React from "react";

interface DataListProps<T> {
  rows: T[];
  columns: GridColDef[];
  initialState: object;
  pageSizeOptions?: number[];
  paginationModel: {
    pageSize: number;
    page: number;
  };
  onPaginationModelChange: (model: { pageSize: number; page: number }) => void;
  sx?: object;
}

const DataList = <T,>({
  rows,
  columns,
  initialState,
  pageSizeOptions = [5, 10],
  paginationModel,
  onPaginationModelChange,
  sx = {},
}: DataListProps<T>) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns.map((col) => ({
        ...col,
        flex: 1,
        headerAlign: "center",
        align: "center",
      }))}
      initialState={initialState}
      pageSizeOptions={pageSizeOptions}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      sx={{ height: "84vh", ...sx }}
    />
  );
};

export default DataList;
