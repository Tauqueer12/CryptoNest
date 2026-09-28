import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import usePortfolio from "../hooks/usePortfolio";
import AChart from "../chart/chart";
import { Link } from "react-router-dom";


function timeAgo(dateString) {
  if (!dateString) return "";
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} Minute${minutes === 1 ? "" : "s"} Ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} Hour${hours === 1 ? "" : "s"} Ago`;
  const days = Math.floor(hours / 24);
  return `${days} Day${days === 1 ? "" : "s"} Ago`;
}

function HoldingsTable({ coins }) {
  if (coins.length === 0) {
    return <p className="text-muted">No holdings yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Coin</th>
          <th>Invested</th>
          <th>Current Value</th>
          <th>P&amp;L</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((c) => {
          const currentCost = c.quantity * c.current_market_price;
          const pnl =
            c.total_amount > 0
              ? ((currentCost - c.total_amount) / c.total_amount) * 100
              : 0;

          return (
            <tr key={c.stockId}>
              <td>
                {c.imagesmall && (
                  <img
                    src={c.imagesmall}
                    alt={c.stockId}
                    width="28"
                    height="28"
                    style={{ borderRadius: "50%", display: "block" }}
                  />
                )}
              </td>
              <td className="td-primary">{c.stockId}</td>
              <td className="td-primary">₹{Math.round(c.total_amount)}</td>
              <td className="td-primary">₹{Math.round(currentCost)}</td>
              <td className={pnl >= 0 ? "td-success" : "td-danger"}>
                {pnl >= 0 ? "+" : ""}
                {pnl.toFixed(2)}%
              </td>
              <td>
                <Link
                  to={"/dashboard/sell/".concat(c.stockId)}
                  state={{
                    stockId: c.stockId,
                    total_amount: c.total_amount,
                    current_cost: currentCost,
                    quantity: c.quantity,
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sell
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Dashboard = () => {
  const [name, setName] = React.useState("Admin");
  const { coins, balance, loading } = usePortfolio();
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://cryptonest-api.onrender.com/api/news");
        setNews(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setNewsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const investment = coins.reduce(
    (sum, c) => sum + (c.quantity || 0) * (c.current_market_price || 0),
    0
  );

  function changeColor() {
    document.body.classList.toggle("dark-theme-variables");
    document.querySelector(".light-btn").classList.toggle("active");
    document.querySelector(".dark-btn").classList.toggle("active");
  }

  useEffect(() => {
    const storedName = localStorage.getItem("first_name");
    setName(storedName);
  }, []);

  return (
    <div className="container1">
      <div className="navbar-area">
        <Navbar />
      </div>

      <main>
        <h1>DashBoard</h1>

        <div className="insights">
          <div className="sales">
            <span className="material-icons-sharp">analytics</span>
            <div className="middle">
              <div className="left">
                <h3>Balance Remaining</h3>
                <h1>₹{balance}</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div className="number">
                  <p>{(balance / 10000).toFixed(2)} %</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>

          <div className="expenses">
            <span className="material-icons-sharp">bar_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Investment</h3>
                <h1>₹{1000000 - balance}</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                % investments
                <div className="number">
                  <p>
                    {balance > 0
                      ? ((1000000 - balance) / balance).toFixed(2)
                      : "0.00"}
                    %
                  </p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>

          <div className="income">
            <span className="material-icons-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Current Price</h3>
                <h1>₹{Math.round(investment)}</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                {1000000 - balance === 0
                  ? "% Profits"
                  : (investment / (1000000 - balance)) * 100 - 100 >= 0
                    ? "% Profits"
                    : "% Loss"}
                <div className="number">
                  <p>
                    {1000000 - balance === 0
                      ? "0.00"
                      : (
                        (investment / (1000000 - balance)) * 100 -
                        100
                      ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 Hours</small>
          </div>
        </div>
        <h2>Your Holdings</h2>
        <div className="orders">
          {loading ? <p>Loading...</p> : <HoldingsTable coins={coins} />}
        </div>
      </main>

      <div className="right">
        <div className="top" style={{ display: 'none' }}>
          <button id="menu-btn">
            <span className="material-icons-sharp">menu</span>
          </button>
        </div>

        <div className="recent-updates">
          <h2>Recent Updates</h2>
          <div className="updates">
            {newsLoading ? (
              <p className="text-muted">Loading news...</p>
            ) : news.length === 0 ? (
              <p className="text-muted">No news available right now.</p>
            ) : (
              news
                .filter((item) => item.image)
                .slice(0, 3)
                .map((item, index) => (
                  <a key={index} className="update" href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="profile-photo">
                      <img src={item.image} alt={item.title || "News thumbnail"} />
                    </div>
                    <div className="message">
                      <p><b>{item.title}</b></p>
                      <small className="text-muted">
                        {item.source?.name ? `${item.source.name} · ` : ""}
                        {timeAgo(item.publishedAt)}
                      </small>
                    </div>
                  </a>
                ))
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            {loading ? null : <AChart coins={coins} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;