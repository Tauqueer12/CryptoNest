import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import profile1 from "../assets/profile-1.jpg";
import profile2 from "../assets/profile-2.jpg";
import profile3 from "../assets/profile-3.jpg";
import profile4 from "../assets/profile-4.jpg";
import Navbar from "../Navbar/Navbar";

import axios from "axios";
import Single from "./singlediv";
import { toast } from "react-toastify";
import Singletable from "./singletable";
import AChart from "../chart/chart";

function usePortfolio() {
  const [coins, setCoins] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPortfolio() {
      try {
        const token = localStorage.getItem("token");
        let userId = localStorage.getItem("userId");
        userId = userId.replace(/['"]+/g, "");

        const res = await fetch(
          "https://cryptonest-api.onrender.com/api/user/portfolio",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const json = await res.json();
        const stocks = json.data.stocks;

        let enriched = stocks;

        if (stocks.length > 0) {
          const ids = stocks.map((s) => s.stockId).join(",");
          const { data: marketData } = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${ids}`
          );

          const marketMap = new Map(marketData.map((m) => [m.id, m]));

          enriched = stocks.map((stock) => {
            const market = marketMap.get(stock.stockId);
            return {
              ...stock,
              imagesmall: market?.image?.replace('/large/', '/small/') || "",
              current_market_price: market?.current_price || 0,
            };
          });
        }

        if (!cancelled) {
          setCoins(enriched);
          setBalance(Math.round(json.data.credits));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          toast.error("Something went wrong");
          setLoading(false);
        }
      }
    }

    fetchPortfolio();
    return () => {
      cancelled = true;
    };
  }, []);

  return { coins, balance, loading };
}

function RenderingArrayOfObjects({ coins }) {
  return (
    <div>
      {coins.map((element) => (
        <Single
          key={element.stockId}
          stockId={element.stockId}
          imagesmall={element.imagesmall}
          total_amount={element.total_amount}
          quantity={element.quantity}
          current_market_price={element.current_market_price}
          current_cost={element.quantity * element.current_market_price}
        />
      ))}
    </div>
  );
}

function RenderingArrayOfLists({ coins }) {
  return (
    <>
      {coins.map((element) => (
        <Singletable
          key={element.stockId}
          stockId={element.stockId}
          imagesmall={element.imagesmall}
          total_amount={element.total_amount}
          quantity={element.quantity}
          current_market_price={element.current_market_price}
          current_cost={element.quantity * element.current_market_price}
        />
      ))}
    </>
  );
}

const Dashboard = () => {
  const [name, setName] = React.useState("Admin");
  const { coins, balance, loading } = usePortfolio();

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
    const storedName = window.localStorage.getItem("first_name");
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

        <h2>Recent Coins</h2>
        {loading ? <p>Loading...</p> : <RenderingArrayOfObjects coins={coins} />}

        <div className="orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Number</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            {loading ? null : <RenderingArrayOfLists coins={coins} />}
          </table>
          <a href="#">Show All</a>
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
            <div className="update">
              <div className="profile-photo">
                <img src={profile2} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Mike{" "}
                    <b>
                      Crypto Faces a Banking Crisis. For Some, It's a
                      Conspiracy
                    </b>
                  </b>
                </p>
                <small className="text-muted">2 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <img src={profile3} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Rhea{" "}
                    <b>
                      Biden Budget Plan Would Close Crypto Tax Loss
                      Harvesting Loophole
                    </b>
                  </b>
                </p>
                <small className="text-muted">3 Minutes Ago</small>
              </div>
            </div>
            <div className="update">
              <div className="profile-photo">
                <img src={profile4} alt="hero" />
              </div>
              <div className="message">
                <p>
                  <b>
                    Zoya{" "}
                    <b>
                      More pain for the crypto industry means a chance for
                      startups to pivot
                    </b>
                  </b>
                </p>
                <small className="text-muted">5 Minutes Ago</small>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "10px" }}>
            <AChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;