import React, { useContext } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./dataTable.scss";
import UserContext from "../../context/UserContext";

const DataTable = ({ slug, columns, rows, onRowSelection }) => {
  const { selectedRow } = useContext(UserContext);
  const handleRowClick = (row) => {
    onRowSelection(row); // Invoke the onRowSelection function with the clicked user data
    console.log("selectedRow:", selectedRow);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* Link to view details */}
          <Link to={`/${slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          {/* Link to delete item */}
          <Link className="delete" to={"/confirm"}>
            <img src="/delete.svg" alt="" />
          </Link>
        </div>
      );
    },
  };

  return (
    <Box className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[12]}
        checkboxSelection
        disableRowSelectionOnClick
        // disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        onRowClick={handleRowClick} // Call handleRowClick on row click
      />
    </Box>
  );
};

export default DataTable;
