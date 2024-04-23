import React from "react";

import "./add.scss";

const Add = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    props.setOpen(false);
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
                  <input type={column.type} style={{ marginRight: "auto" }} />
                ) : column.type === "singleSelect" && column.valueOptions ? (
                  <select>
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
