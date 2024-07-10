import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import '../interfaces/NavbarProps'

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className='divContainer'>
          <div className="navbar-logo"></div>
          <div className='title'>
            <p>Movie Theater</p>
          </div>
        </div>
        <div className="navbar-links">
          {!name ? (
            <Link to="/login">
              <button className="btnLogin" title='Login'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svgLogin">
                  <path className='pathLogin' strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                </svg>
              </button>
            </Link>
          ) : (
            <div className="right_navbar_content">
              <div className='div_welcome_text'>
                <p>Welcome, {name}</p>
              </div>
              <div className="">
                <button className="btnLogout" title='Logout' onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svgLogout">
                    <path className='pathLogout' strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar