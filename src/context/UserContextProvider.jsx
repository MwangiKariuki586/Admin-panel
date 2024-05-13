import { useState } from "react";

import UserContext from "./UserContext";
import axios from "axios";
import { useEffect } from "react";

const UserContextProvider = ({ children }) => {
  const [printerdata, setPrinterdata] = useState([]);
  const [locationdata, setLocationdata] = useState([]);
  const [tonerdata, setTonerdata] = useState([]);
  const [departmentdata, setDepartmentdata] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const rowdata = sessionStorage.getItem("selectedUserData");
  const selectedUserData = sessionStorage.getItem("selectedUserData")
    ? JSON.parse(rowdata)
    : null;

  useEffect(() => {
    getPrinters();
    getLocations();
    getToners();
    getDepartments();
    getUsers();
    console.log(selectedUserData?.row);
  }, []);
  const getDepartments = () => {
    axios
      .get("http://127.0.0.1:8000/toner/departments/")
      .then((response) => {
        console.log(response.data.Departments);
        setDepartmentdata(response.data.Departments); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getToners = () => {
    axios
      .get("http://127.0.0.1:8000/toner/toners/")
      .then((response) => {
        console.log(response.data.Toners);
        setTonerdata(response.data.Toners); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getLocations = () => {
    axios
      .get("http://127.0.0.1:8000/toner/locations/")
      .then((response) => {
        console.log(response.data.Locations);
        setLocationdata(response.data.Locations); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getPrinters = () => {
    axios
      .get("http://127.0.0.1:8000/toner/printers/")
      .then((response) => {
        console.log(response.data.Printer);
        setPrinterdata(response.data.Printer); // Assuming response.data contains the array of users
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  const getUsers = () => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        // console.log(response.data.Users);
        setUserdata(response.data); // Assuming response.data contains the array of users
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        // Handle error here, e.g., display an error message to the user
      });
  };
  return (
    <UserContext.Provider
      value={{
        printerdata,
        departmentdata,
        locationdata,
        tonerdata,
        userdata,
        setUserdata,
        selectedRow,
        setSelectedRow,
        selectedUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
