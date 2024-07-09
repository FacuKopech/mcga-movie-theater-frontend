import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/login.css'
import { useLoading } from '../context/loadingContext';
import Register from './register';

const Login = ({ }: { closePopup: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const [loginMessageError, setLoginMessageError] = useState('');
  const [registerSuccessMessage, setRegisterResultMessage] = useState('');
  const { setLoading } = useLoading();

  const handleLogin = async (e: any) => {
    setLoginMessageError('');
    setRegisterResultMessage('');
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        response.status == 404 ? setLoginMessageError('User not found. Please try again') : setLoginMessageError('Failed to Login. Please try again');
        throw new Error('Failed to login');
      }

      const { token } = await response.json();
      const decodedToken: any = jwtDecode(token);
      const { name } = decodedToken;

      navigate('/', { state: { name } });
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (showRegister: boolean) => {
    setShowRegister(showRegister);
  }

  const handleRegisterResult = (message: string) => {
    setShowRegister(false);
    setRegisterResultMessage(message);
  }

  return (
    <div className='loginContainer'>
      {!showRegister ? <div id="form-ui">
        <form action="" method="post" id="form" onSubmit={handleLogin}>
          <div className="div_popcorn_icon"></div>
          <div id="form-body">
            <div id="welcome-lines">
              <div id="welcome-line-1">Movie Theater</div>
              <div id="welcome-line-2">Welcome Back!</div>
              <div className="message_error">{loginMessageError}</div>
              <div className={ registerSuccessMessage.includes('successfully') ? "message_success" : "message_error"}>{registerSuccessMessage}</div>
            </div>
            <div className={loginMessageError.length > 0 ? "input-area-modified" : "input-area"}>
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
            <div className="div_action_btns">
              <button className='actionBtn' onClick={() => navigate("/")} title='Home'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svgIcon">
                  <path className='svg-path' d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </button>
              <button className='actionBtn' onClick={() => [setShowRegister(true), setRegisterResultMessage(''), setLoginMessageError('')]} title='Home'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="svgIcon">
                  <path className='svg-path' d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div> : <Register onClick={handleLoginClick} onRegisterResult={handleRegisterResult}></Register>}
    </div>
  );
}

export default Login;
