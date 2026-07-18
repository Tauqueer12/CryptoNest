import React from "react";
import "./chart.css";
import Chart from "react-apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";

const GAChart = (props) => {
  const [data, setdata] = useState([]);
  // const [arr,setarr]
  let arr = [];
  var day = Number(Math.random() * 10 + 1);
  useEffect(() => {


    const func = async () => {
      const url = `https://api.coingecko.com/api/v3/exchanges/binance/volume_chart?days=${Math.ceil(day)}`;
      const response = await fetch(url);
      const parseData = await response.json();

      for (let i = 1; i < parseData.length && i < 50; i++) {
        arr.push(Math.round(parseData[i][1]));
      }
      setdata(arr);

    };
    func();
  }, []);

  return (
    <div>

      <Chart
        type="line"
        width={800}
        height={400}
        series={[
          {
            name: "product",
            data: data,
          },
        ]}
        options={{
          title: { text: "Token Allocation" },

          xaxis: {
            title: { text: "production sell for today (volumes)" },

          },
        }}
      />
    </div>
  );
};

export default GAChart;
