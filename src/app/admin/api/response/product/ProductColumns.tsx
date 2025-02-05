import Checkbox from "@mui/material/Checkbox";
import { GridColDef } from "@mui/x-data-grid";
import ProductLinkIdCell from "app/admin/components/cell/ProductLinkIdCell";

export const getAllProductResponseColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: (params) => {
      return <ProductLinkIdCell id={Number(params.id)} />;
    },
  },
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
  {
    field: "shopDisplayable",
    headerName: "Shop Displayable",
    renderCell: (params) => {
      return <Checkbox checked={params.value} />;
    },
  },
  { field: "createdAt", headerName: "Created At" },
];
