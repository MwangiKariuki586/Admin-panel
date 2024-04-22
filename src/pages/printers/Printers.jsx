import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./Printers.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";

const Printers = () => {
  const [open, setOpen] = useState(false);

  const { printerdata } = useContext(UserContext); //api data
  const printers = printerdata.map((printer) => printer.Printer_name);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Printer_name",
      headerName: "printer",
      type: "singleSelect",
      valueOptions: printers,
      width: 110,
      editable: true,
    },
    {
      field: "time_created",
      headerName: "time created",
      type: "Date",
      width: 110,
    },
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Printers</h1>
        <button onClick={() => setOpen(true)}>Add New Printer</button>
      </div>
      <DataTable slug="users" columns={columns} rows={printerdata} />

      {open && <Add slug="Printer" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Printers;
