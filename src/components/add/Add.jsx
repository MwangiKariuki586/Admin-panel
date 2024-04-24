import React, { useState } from "react";

import "./add.scss";
import axios from "axios";

const Add = (props) => {
  const [formState, setFormState] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(props.endpoint, formState)
      .then((response) => {
        if (onSuccess) {
          onSuccess(response.data);
          props.setOpen(false);
        }
      })
      .catch((error) => {
        // if (onError) {
        //   onError(error);

        // }
        alert("error");
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
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
                    value={formState[column.field]}
                    onChange={handleInputChange}
                    type={column.type}
                    style={{ marginRight: "auto" }}
                  />
                ) : column.type === "singleSelect" && column.valueOptions ? (
                  <select
                    value={formState[column.field]}
                    onChange={handleInputChange}
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
                    value={formState[column.field]}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
