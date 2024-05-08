import React, { useState } from "react";
import "./add.scss";
import axios from "axios";

const Add = (props) => {
  const [formState, setFormState] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map location and department string values to primary keys
      const locationId = await getLocationId(formState.location);
      const departmentId = await getDepartmentId(formState.department);

      // Update form state with primary keys
      const updatedFormState = {
        ...formState,
        location: locationId,
        department: departmentId,
      };

      // Send the request with updated form state based on whether its a put/post request

      const response = await axios.post(props.endpoint, updatedFormState);

      if (props.onSuccess) {
        props.onSuccess(response.data);
        props.setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (props.onError) {
        props.onError(error);
      }
    }
  };

  // Function to fetch location ID based on its name
  const getLocationId = async (locationName) => {
    // Perform API request to fetch location ID
    // Replace this with your actual API call to retrieve the location ID
    const response = await axios.get(
      `http://localhost:8000/toner/locations/${locationName}`
    );
    const location = response.data;
    console.log(location.id);
    return location.id; // Assuming the response contains the location object with an ID field
    console.log(location.id);
  };

  // Function to fetch department ID based on its name
  const getDepartmentId = async (departmentName) => {
    // Perform API request to fetch department ID
    // Replace this with your actual API call to retrieve the department ID
    const response = await axios.get(
      `http://localhost:8000/toner/departments/${departmentName}`
    );
    const department = response.data;
    return department.id; // Assuming the response contains the department object with an ID field
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the password field, handle it separately
    if (name === "password" || name === "confirmPassword") {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    } else {
      // For other fields, update the form state as usual
      setFormState((prevFormState) => ({
        ...prevFormState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.type !== "Date"
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                {column.type === "Checkbox" ? (
                  <input
                    type="checkbox"
                    name={column.name}
                    value={formState[column.field] || false}
                    onChange={handleInputChange}
                    style={{ marginRight: "auto" }}
                  />
                ) : column.type === "singleSelect" && column.valueOptions ? (
                  <select
                    value={formState[column.name] || ""}
                    onChange={handleInputChange}
                    name={column.name}
                  >
                    <option value="">Select...</option>
                    {column.valueOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className=""
                    type={column.type}
                    placeholder={column.field}
                    value={formState[column.field] || ""}
                    onChange={handleInputChange}
                    name={column.name}
                  />
                )}
              </div>
            ))}
          {props.passwordfields && (
            <div style={{ width: "100%" }}>
              <div className="item">
                <label htmlFor="">password</label>
                <input
                  type="password"
                  placeholder="enter password"
                  onChange={handleInputChange}
                  name="password"
                />
              </div>
              <div className="item">
                <label htmlFor="">confirm password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={handleInputChange}
                  name="password_confirmation"
                />
              </div>
            </div>
          )}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
