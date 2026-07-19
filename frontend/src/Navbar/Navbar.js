import React from 'react'
import './Navbar.css'
import Mnavbar from './mnavbar'
const Navbar = () => {
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        window.location.href = '/'
    }

  return (
    <>
    <div className='mobile'>
    <Mnavbar />
    </div>
    <div className='navbar-container'>
      <aside>
                <div className="sidebar">

                    <a href="/dashboard" >
                        <span className="material-icons-sharp">person_outline</span>
                        <h3>Dashboard</h3>
                    </a>
                    <a href="/market">
                        <span className="material-icons-sharp">insights</span>
                        <h3>Market</h3>
                    </a>
                    <a href="/messages">
                        <span className="material-icons-sharp">mail_outline</span>
                        <h3>News Info</h3>
                    </a>

                    <a onClick={logOut}>
                        <span className="material-icons-sharp">logout</span>
                        <h3>logout</h3>
                    </a>
                </div>
            </aside>
    </div>
    </>
  )
}

export default Navbar
