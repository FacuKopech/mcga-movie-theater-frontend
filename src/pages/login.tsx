import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const { token } = await response.json();
      const decodedToken: any = jwtDecode(token);
      const { name } = decodedToken;

      navigate('/', { state: { name } });
      console.log('Login successful:', decodedToken);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='loginContainer'>
      <div id="form-ui">
        <form action="" method="post" id="form" onSubmit={handleLogin}>
        <div className="div_popcorn_icon"></div>
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Movie Theater</div>
              <div id="welcome-line-2">Welcome Back!</div>
            </div>
            <div id="input-area">
              <div className="form-inp">
                <input placeholder="Email Address" type="text" value={email}
                  onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className="form-inp">
                <input placeholder="Password" type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}></input>
              </div>
            </div>
            <div id="submit-button-cvr">
              <button id="submit-button" type="submit">Login</button>
            </div>
            <div id="bar"></div>
            <div className="div_home_button">
              <button className='btnHome' onClick={() => navigate("/")} title='Home'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svgHome">
                  <path className='pathHome' d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
