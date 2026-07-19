import "./Dashboard.css";

import React, { useState, useEffect } from "react";

function Singletable(props) {
  return (


        <tbody style={{width:"100vw"}}>
              <tr>
                <td className="td-primary">{props.stockId}</td>
                <td className="td-primary">{Math.round(props.total_amount)}</td>
                <td className="td-success">Completed</td>
                <td className="primary">Details</td>
              </tr>
        </tbody>
  );
}

export default Singletable;
