import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./SignIn/login";
import Signup from "./SignIn/signup";
import CoinBuy from "./routes/Coin_buy";
import Coins from "./Market/Coins";
import axios from "axios";

import React, { useState, useEffect } from 'react'
import CoinSell from "./routes/Coin_sell";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./Messages/Messages";
import TopNavbar from "./Navbar/TopNavbar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr'

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/sell/:coinId"
            element={
              <PrivateRoute>
                <CoinSell />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path="/market"
            element={
              <PrivateRoute>
                <Coins coins={coins} />
              </PrivateRoute>
            }
          />
          <Route
            path="/coin/:coinId"
            element={
              <PrivateRoute>
                <CoinBuy />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
