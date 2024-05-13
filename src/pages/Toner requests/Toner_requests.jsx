import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Add from "../../components/add/Add";
import "./toner_requests.scss";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DataTable from "../../components/dataTable/DataTable";
import UserContext from "../../context/UserContext";
const columns = [
  { field: "id", headerName: "ID", width: 85 },
  {
    field: "user_staffname",
    headerName: "Staff name",
    width: 148,
  },
  {
    field: "user_staffid",
    headerName: "Staff id",
    width: 120,
  },
  {
    field: "user_department",
    headerName: "Department",
    width: 158,
  },
  {
    field: "user_location",
    headerName: "Location",
    width: 131,
  },

  { field: "toner", headerName: "Toner", width: 109 },
  { field: "printer_name", headerName: "Printer", width: 118 },
  {
    field: "issued",
    headerName: "Issued",
    type: "Checkbox",
    width: 115,
    renderCell: (params) => (params.value ? <CheckIcon /> : <ClearIcon />),
  },
  {
    field: "Date_of_request",
    headerName: "Date",
    type: "Date",
    width: 103,
  },
];

const Toner_requests = () => {
  const [userdata, setUserdata] = useState([]);
  const [open, setOpen] = useState(false);
  const { setSelectedRow } = useContext(UserContext);
  useEffect(() => {
    getTonerrequests();
  }, []);

  const getTonerrequests = () => {
    axios
      .get("http://localhost:8000/toner/toner_requests/")
      .then((response) => {
        console.log(response.data.Toner_requests);
        setUserdata(response.data.Toner_requests); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const handleRowSelection = (user) => {
    setSelectedRow(user); // Update selectedRow in context with the clicked user
    sessionStorage.setItem("selectedUserData", JSON.stringify(user));
  };
  return (
    <div className="users">
      <div className="info">
        <h1>Toner requests</h1>
        {/* <button onClick={() => setOpen(true)}>Add New Request</button> */}
      </div>
      <DataTable
        slug="toner_request"
        columns={columns}
        rows={userdata}
        onRowSelection={handleRowSelection}
      />

      {open && <Add slug="Request" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Toner_requests;
