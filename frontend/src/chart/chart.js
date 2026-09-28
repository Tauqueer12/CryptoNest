import React from "react";
import "./chart.css";
import Chart from "react-apexcharts";

const COLORS = ["#8a3ffc", "#f4b97e", "#16c784", "#23ddf4", "#ced6e5", "#ff765e"];
const MAX_SLICES = 5;

const AChart = ({ coins = [] }) => {
  const holdings = coins
    .map((c) => ({
      label: c.stockId,
      value: (c.quantity || 0) * (c.current_market_price || 0),
    }))
    .filter((h) => h.value > 0)
    .sort((a, b) => b.value - a.value);

  if (holdings.length === 0) {
    return <p className="text-muted">No holdings to chart yet.</p>;
  }

  // Keep the top 5 as their own slices and group the rest into "Others"
  const top = holdings.slice(0, MAX_SLICES);
  const rest = holdings.slice(MAX_SLICES);
  if (rest.length > 0) {
    top.push({
      label: "Others",
      value: rest.reduce((sum, h) => sum + h.value, 0),
    });
  }

  const total = top.reduce((sum, h) => sum + h.value, 0);
  const inr = (val) => "₹" + Math.round(Number(val));

  return (
    <div>
      <Chart
        type="donut"
        width={400}
        height={400}
        series={top.map((h) => h.value)}
        options={{
          colors: COLORS,
          labels: top.map((h) => h.label),
          title: { text: "Portfolio Allocation" },
          dataLabels: { enabled: false },
          legend: { position: "bottom" },
          tooltip: { y: { formatter: inr } },
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
                labels: {
                  show: true,
                  value: { formatter: inr },
                  total: {
                    show: true,
                    label: "Total",
                    formatter: () => inr(total),
                  },
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default AChart;