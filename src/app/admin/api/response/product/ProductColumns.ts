import { GridColDef } from "@mui/x-data-grid";

export const getAllProductResponseColumns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "description", headerName: "Description" },
  {
    field: "unitPrice",
    headerName: "Unit Price (₩)",

    type: "number",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",

    type: "number",
  },
  { field: "category", headerName: "Category" },
  { field: "size", headerName: "Size" },
];
