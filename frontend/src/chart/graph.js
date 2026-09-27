import React from "react";
import "./chart.css";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const DAYS = 7;

const GAChart = ({ coinId }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!coinId) {
      setLoading(false);
      setError(true);
      return;
    }

    const fetchPriceHistory = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=inr&days=${DAYS}`;
        const res = await fetch(url);
        const parsed = await res.json();

        const points = (parsed.prices || []).map(([timestamp, price]) => ({
          x: timestamp,
          y: Math.round(price * 100) / 100,
        }));
        setdata(points);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceHistory();
  }, [coinId]);

  if (loading) return <div className="graph-status">Loading price history...</div>;
  if (error || data.length === 0) {
    return <div className="graph-status">Price history unavailable right now.</div>;
  }

  return (
    <div>
      <Chart
        type="line"
        width={800}
        height={400}
        series={[{ name: "Price (INR)", data }]}
        options={{
          title: { text: `Price History (${DAYS} Days)` },
          xaxis: { type: "datetime", title: { text: "Date" } },
          yaxis: { title: { text: "Price (INR)" } },
          tooltip: { x: { format: "dd MMM, HH:mm" } },
        }}
      />
    </div>
  );
};

export default GAChart;