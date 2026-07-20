import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TopNavbar.css';
import logo from '../assets/logo.png';

const TopNavbar = () => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedName = window.localStorage.getItem("first_name");
      if (storedName) {
        setName(storedName.replace(/['"]+/g, ""));
      }
    }
  }, []);

  // Re-apply saved theme on every page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme-variables");
      // Sync the toggler button states
      document.querySelectorAll(".light-btn").forEach(btn => btn.classList.remove("active"));
      document.querySelectorAll(".dark-btn").forEach(btn => btn.classList.add("active"));
    }
  }, []);

  function changeColor() {
    const isDark = document.body.classList.toggle("dark-theme-variables");
    // Persist preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
    // Sync toggler button states
    document.querySelectorAll(".light-btn").forEach(btn => btn.classList.toggle("active"));
    document.querySelectorAll(".dark-btn").forEach(btn => btn.classList.toggle("active"));
  }

  return (
    <div className="top-navbar">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="CryptoNest Logo" />
          <h2>Crypto<span className="danger">Nest</span></h2>
        </Link>
      </div>

      <div className="top-right">
        <div className="theme-toggler" onClick={changeColor}>
          <span className="material-icons-sharp light-btn active">wb_sunny</span>
          <span className="material-icons-sharp dark-btn">bedtime</span>
        </div>

        {isLoggedIn && (
          <div className="profile">
            <span className="username-text">Hey, <b>{name || "User"}</b></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
