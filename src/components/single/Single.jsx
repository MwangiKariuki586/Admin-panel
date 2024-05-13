import React, { useContext } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import UserContext from "../../context/UserContext";
import { singleUser } from "../../data";
const Single = (props) => {
  const { selectedRow, locationdata, departmentdata, selectedUserData } =
    useContext(UserContext);
  const items = selectedUserData?.row || {}; // Perform null check on selectedUserData and set items to an empty object if it's null or undefined

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{items.staff_name}</h1>{" "}
            {/* Ensure selectedUserData.row exists before accessing properties */}
            <button>Update</button>
          </div>
          {selectedUserData && selectedUserData.row && (
            <div className="details">
              {Object.keys(selectedUserData.row).map((key) => {
                if (key !== "id" && items[key] !== null) {
                  const isDepartment =
                    key === "department_name" ||
                    key === "user_department" ||
                    key === "Department_name";
                  const isLocation =
                    key === "location_name" ||
                    key === "user_location" ||
                    key === "Location_name";

                  return (
                    <div className="item" key={key}>
                      <span className="itemTitle">{key}:</span>
                      {typeof items[key] === "boolean" ? (
                        <input type="checkbox" checked={items[key]} readOnly />
                      ) : typeof items[key] === "string" &&
                        items[key].includes("03:00") ? (
                        <span>{new Date(items[key]).toLocaleString()}</span>
                      ) : isDepartment ? (
                        <select
                          className="itemValue"
                          value={items[key]}
                          readOnly
                        >
                          {departmentdata?.map((option) => (
                            <option
                              key={option.id}
                              value={option.Department_name}
                            >
                              {option.Department_name}
                            </option>
                          ))}
                        </select>
                      ) : isLocation ? (
                        <select
                          className="itemValue"
                          value={items[key]}
                          readOnly
                        >
                          {locationdata?.map((option) => (
                            <option
                              key={option.id}
                              value={option.Location_name}
                            >
                              {option.Location_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="itemValue"
                          value={items[key]}
                          readOnly
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
        <hr />
        {/* Render chart and activities if provided */}
        {/* Chart rendering logic */}
        {singleUser.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={singleUser.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {singleUser.chart.dataKeys.map((dataKey) => (
                  <Line
                    key={dataKey.name}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {/* Activities rendering logic */}
        {singleUser.activities && (
          <ul>
            {singleUser.activities.map((activity, index) => (
              <li key={index}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Single;
