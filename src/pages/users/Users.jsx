import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./Users.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
const Users = () => {
  const [userdata, setUserdata] = useState([]);
  const [open, setOpen] = useState(false);
  const { departmentdata } = useContext(UserContext); //api data
  const departments = departmentdata.map(
    (department) => department.Department_name
  );
  const { locationdata } = useContext(UserContext); //api data
  const locations = locationdata.map((location) => location.Location_name);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://127.0.0.1:8000/toner/users/")
      .then((response) => {
        // console.log(response.data.Users);
        setUserdata(response.data.Users); // Assuming response.data contains the array of users
        // console.log(departments);
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "staff_name",
      headerName: "Staff name",
      width: 150,
      editable: true,
    },
    { field: "staffid", headerName: "Staff ID", width: 150, editable: true },
    {
      field: "department_name",
      headerName: "Department",
      type: "singleSelect",
      valueOptions: departments,
      width: 110,
      editable: true,
    },
    {
      field: "location_name",
      headerName: "Location",
      type: "singleSelect",
      valueOptions: locations,
      width: 110,
      editable: true,
    },
    {
      field: "is_superuser",
      headerName: "Superuser",
      type: "Checkbox",
      width: 110,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "is_active",
      headerName: "Active",
      type: "Checkbox",
      width: 110,
      renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
    },
    {
      field: "date_joined",
      headerName: "Date Joined",
      type: "Date",
      width: 110,
      editable: true,
    },
    {
      field: "last_login",
      headerName: "Last Login",
      type: "Date",
      width: 110,
      editable: true,
    },
  ];
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userdata} />

      {open && <Add slug="User" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
