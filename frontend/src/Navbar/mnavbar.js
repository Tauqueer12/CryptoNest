import React from "react";
import "./mnavbar.css";
import logo from '../SignIn/logo.png'
import { BiMenu } from 'react-icons/bi';
import { Link } from "react-router-dom";

const Mnavbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    window.location.href = '/'
  }
  return (
    <>


      <nav>
        <input className="hidden" type="checkbox" id="menuToggle" />
        <label className="menu-btn" for="menuToggle">

          <div className="menu menu123 ">
            <BiMenu />
          </div>



        </label>
        <div className="nav-container123">
          <ul className="nav-tabs">

            <Link to="/dashboard">
              <li className="nav-tab"><a href="/dashboard">DashBoard</a></li>
            </Link>
            <Link to="/market">
              <li className="nav-tab"><a href="/market">Market</a></li>
            </Link>
            <Link to="/messages">
              <li className="nav-tab"><a href="/messages">News-Info</a></li>
            </Link>





            <li className="nav-tab">
              <button onClick={logout} className="nav_btn">
                <a >logout</a>
              </button>
            </li>

          </ul>
        </div>
      </nav>

    </>
  );
};

export default Mnavbar;
