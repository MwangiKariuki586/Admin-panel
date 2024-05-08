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

const Single = (props) => {
  const { selectedRow } = useContext(UserContext);
  const items = selectedRow?.row || {}; // Perform null check on selectedRow and set items to an empty object if it's null or undefined

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{items.staff_name}</h1>{" "}
            {/* Ensure selectedRow.row exists before accessing properties */}
            <button>Update</button>
          </div>
          {selectedRow && selectedRow.row && (
            <div className="details">
              {Object.keys(selectedRow.row).map((key) => {
                if (key !== "id") {
                  return (
                    <div className="item" key={key}>
                      <span className="itemTitle">{key}:</span>
                      {typeof items[key] === "boolean" ? (
                        <input type="checkbox" checked={items[key]} readOnly />
                      ) : typeof items[key] === "string" &&
                        items[key].includes("03:00") ? (
                        <span>{new Date(items[key]).toLocaleString()}</span>
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
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
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
                {props.chart.dataKeys.map((dataKey) => (
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
        {props.activities && (
          <ul>
            {props.activities.map((activity, index) => (
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
