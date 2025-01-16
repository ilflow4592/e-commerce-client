"use client";

import React from "react";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridSortItem,
  GridSortModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

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
  rowCount: number;
  paginationMode?: "client" | "server";
  sx?: object;
  sortModel?: GridSortItem[];
  handleSortModelChange?: (
    model: GridSortModel,
    details: GridCallbackDetails
  ) => void;
}

const DataList = <T,>({
  rows,
  columns,
  initialState,
  pageSizeOptions = [5, 10, 50, 100],
  paginationModel,
  onPaginationModelChange,
  rowCount,
  paginationMode = "server",
  sx = {},
  sortModel,
  handleSortModelChange,
}: DataListProps<T>) => {
  return (
    <Box sx={{ height: 578, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({
          ...col,
          flex: 1,
          headerAlign: "center",
          align: "center",
        }))}
        pagination
        paginationMode={paginationMode}
        rowCount={rowCount}
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        initialState={initialState}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        sx={{ ...sx }}
      />
    </Box>
  );
};

export default DataList;
