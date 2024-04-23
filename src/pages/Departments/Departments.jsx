import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./departments.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";

const Departments = () => {
  const [open, setOpen] = useState(false);
  const { departmentdata } = useContext(UserContext); //api data
  const departments = departmentdata.map(
    (department) => department.Department_name
  );
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Department_name",
      headerName: "Department",
      type: "Text",

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
        <h1>Departments</h1>
        <button onClick={() => setOpen(true)}>Add New Department</button>
      </div>
      <DataTable slug="users" columns={columns} rows={departmentdata} />

      {open && <Add slug="Department" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Departments;
