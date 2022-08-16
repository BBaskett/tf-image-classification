import React from "react";

import "./Predictions.css";

function Predicitions({ data, status }) {
  if (status) {
    return (
      <div className="loading">
        <p>Loading . . .</p>
      </div>
    );
  }
  if (data.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Classification</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, idx) => (
            <tr key={idx}>
              <td>{p.className}</td>
              <td>
                <em>{(p.probability * 100).toString().slice(0, 6)}&nbsp;%</em>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <p>No Image Classified</p>;
  }
}

export default Predicitions;
