import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'
import { useLoading } from '../context/loadingContext';

const Register: React.FC<RegisterPageProps> = ({ onClick, onRegisterResult }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  const [registerMessageError, setRegisterMessageError] = useState('');
  const { setLoading } = useLoading();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (name === '' || username === '' || email === '' || password === '' || passwordConfirmation === '') {
        setRegisterMessageError('All fields are required');
        setLoading(false);
      } else if (password !== passwordConfirmation) {
        setRegisterMessageError('Password & Password Confirmation do not match');
      } else {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, email, password }),
        });

        if (!response.ok) {
          setRegisterMessageError('Failed to register new user. Please try again');
        } else {
          onRegisterResult('User registered successfully');
        }
      }
    } catch (error) {
      console.error('Error during register:', error);
      setRegisterMessageError('Failed to register new user. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='registerContainer'>
      <div id="form-ui">
        <form action="" method="post" id="form" onSubmit={handleRegister}>
          <div className="div_popcorn_icon"></div>
          <div id="form-body-register">
            <div id="welcome-lines">
              <div id="welcome-line-1">Movie Theater</div>
              <div id="welcome-line-2">Hi there! Fill up this form to register</div>
              <div className="message_error_register">{registerMessageError}</div>
            </div>
            <div className={registerMessageError.length > 0 ? "input-area-modified" : "input-area"}>
              <div className='div-inputs'>
                <div className="form-inp-register">
                  <input placeholder="Name" type="text" value={name}
                    onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="form-inp-register">
                  <input placeholder="Username" type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}></input>
                </div>
              </div>
              <div className='div-middle-inputs'>
                <div className="form-inp-register">
                  <input placeholder="Email Address" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
                </div>
              </div>
              <div className='div-inputs'>
                <div className="form-inp-register">
                  <input placeholder="Password" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="form-inp-register">
                  <input placeholder="Confirm password" type="password" value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
                </div>
              </div>
            </div>
            <div id="submit-button-cvr-register">
              <button id="submit-button-register" type="submit">Register</button>
            </div>
            <div id="bar"></div>
            <div className="div_action_btns">
              <button className='actionBtn' onClick={() => navigate("/")} title='Home'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="svgIcon">
                  <path className='svg-path' d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </button>
              <button className='actionBtn' onClick={() => onClick(false)} title='Login'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="svgIcon">
                  <path className='svg-path' d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
