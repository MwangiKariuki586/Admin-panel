import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./locations.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";

const Locations = () => {
  const [open, setOpen] = useState(false);
  const { locationdata } = useContext(UserContext); //api data
  const locations = locationdata.map((location) => location.Location_name);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Location_name",
      headerName: "Location",
      type: "singleSelect",
      valueOptions: locations,
      width: 110,
      editable: true,
    },
    {
      field: "time_created",
      type: "Date",
      headerName: "time created",
      width: 110,
    },
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Locations</h1>
        <button onClick={() => setOpen(true)}>Add New Location</button>
      </div>
      <DataTable slug="users" columns={columns} rows={locationdata} />

      {open && <Add slug="Location" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Locations;
