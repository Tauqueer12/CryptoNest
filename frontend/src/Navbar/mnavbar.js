import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./mnavbar.css";
import logo from '../SignIn/logo.png'
import { BiMenu } from 'react-icons/bi';

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

            <li className="nav-tab"><Link to="/dashboard">DashBoard</Link></li>
            <li className="nav-tab"><Link to="/market">Market</Link></li>
            <li className="nav-tab"><Link to="/messages">News-Info</Link></li>





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
