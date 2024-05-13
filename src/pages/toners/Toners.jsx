import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./Toners.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";

const Toners = () => {
  const [open, setOpen] = useState(false);
  const { tonerdata } = useContext(UserContext); //api data
  const { printerdata } = useContext(UserContext); //api data
  const printers = printerdata.map((printer) => printer.Printer_name);
  const toners = tonerdata.map((toner) => toner.Toner_name);
  const { setSelectedRow } = useContext(UserContext);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Toner_name",
      headerName: "Toner",
      type: "singleSelect",
      valueOptions: toners,
      width: 150,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "quantity",
      type: "Number",
      width: 150,
      editable: true,
    },
    {
      field: "printer_name",
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
  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Toners</h1>
        <button onClick={() => setOpen(true)}>Add New Toner</button>
      </div>
      <DataTable
        slug="toner"
        columns={columns}
        rows={tonerdata}
        onRowSelection={handleRowSelection}
      />

      {open && <Add slug="Toner" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Toners;
