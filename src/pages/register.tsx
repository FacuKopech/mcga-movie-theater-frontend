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

        if (!response.ok && response.status == 400) {
          response.json().then(data => {
            setRegisterMessageError(data.message);
          });

        } else if (!response.ok) {
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
        <form action="" method="post" id="form-register" onSubmit={handleRegister}>
          <div className="div_popcorn_icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <g>
                  <path d="M341.881,97.693c-10.656-9.612-25.318-12.042-37.993-7.596c-2.653-10.104-10.093-18.77-20.66-22.513    c-8.211-2.909-17.067-2.447-24.934,1.302c-7.864,3.75-13.799,10.339-16.709,18.552c-1.609,4.552,0.774,9.55,5.326,11.163    c4.551,1.614,9.549-0.77,11.163-5.321c1.35-3.81,4.103-6.866,7.751-8.605c3.649-1.74,7.757-1.954,11.565-0.605    c7.864,2.787,11.995,11.452,9.209,19.318c-1.392,3.932,0.184,8.299,3.767,10.433c3.581,2.134,8.174,1.442,10.967-1.654    c7.543-8.359,20.477-9.025,28.833-1.484c4.243,3.828,6.635,9.084,6.737,14.798c0.085,4.776,3.983,8.588,8.74,8.588    c0.054,0,0.106,0,0.16-0.001c4.829-0.086,8.672-4.07,8.587-8.9C354.204,114.712,349.645,104.697,341.881,97.693z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M418.856,153.826c6.465-10.262,7.044-22.699,3.773-32.762c-3.78-11.633-13.573-22.819-27.82-26    c4.369-13.929-0.422-28.004-8.607-37.093c-8.184-9.09-21.682-15.326-35.991-12.437c-1.674-14.502-11.777-25.411-22.951-30.386    c-11.175-4.975-26.042-5.182-37.938,3.278C281.898,5.857,268.232,0,256.001,0c-12.23,0-25.897,5.858-33.325,18.424    c-11.895-8.458-26.765-8.251-37.936-3.277c-11.175,4.975-21.278,15.884-22.952,30.386c-14.307-2.888-27.809,3.349-35.991,12.437    c-8.185,9.089-12.976,23.164-8.607,37.093c-14.246,3.182-24.041,14.368-27.82,26c-3.269,10.063-2.692,22.501,3.773,32.762    c-11.604,4.736-19.804,16.137-19.804,29.423c0,13.606,8.598,25.236,20.644,29.755l30.229,207.296    c0.635,4.35,4.371,7.484,8.642,7.483c0.42,0,0.846-0.03,1.273-0.093c4.779-0.697,8.089-5.136,7.392-9.915l-29.567-202.755h59.798    l19.747,279.493h-38.79l-6.089-41.758c-0.698-4.779-5.143-8.087-9.915-7.391c-4.779,0.697-8.089,5.136-7.392,9.914l7.18,49.241    c0.627,4.298,4.312,7.483,8.654,7.483h55.721c0.002,0,0.004,0,0.006,0s0.006,0,0.008,0h110.238c0.002,0,0.006,0,0.008,0    c0.002,0,0.003,0,0.006,0h55.721c4.342,0,8.026-3.185,8.654-7.483l29.964-205.478c0.697-4.779-2.613-9.218-7.392-9.915    c-4.78-0.696-9.217,2.612-9.915,7.391l-28.873,197.996h-38.79l19.747-279.493h59.798l-6.782,46.518    c-0.697,4.779,2.613,9.218,7.392,9.914c4.779,0.696,9.217-2.612,9.915-7.391l7.445-51.056    c12.047-4.518,20.644-16.15,20.644-29.755C438.66,169.962,430.459,158.561,418.856,153.826z M247.256,494.511h-38.225    l-19.747-279.493h57.971V494.511z M302.969,494.511h-38.225V215.018h57.971L302.969,494.511z M409.081,197.342    c-0.043,0.006-0.086,0.005-0.129,0.01c-0.387,0.056-0.73,0.096-1.051,0.124c-0.335,0.025-0.668,0.051-1.009,0.051    c0,0-150.89,0-150.895,0H105.109c-0.688,0-1.378-0.076-2.059-0.175c-0.043-0.006-0.086-0.005-0.129-0.01    c-6.836-1.059-12.092-6.967-12.092-14.094c0.001-7.874,6.407-14.279,14.281-14.279h8.345h43.306c4.394,0,8.256-3.479,8.699-7.85    c0.478-4.703-3.103-9.115-7.805-9.595c-0.294-0.029-0.592-0.045-0.894-0.045h-41.207c-11.011-6.12-12.103-17.149-9.548-25.011    c2.676-8.234,10.631-16.926,24.232-14.338c3.648,0.695,7.348-0.996,9.208-4.218c1.86-3.221,1.478-7.266-0.95-10.083    c-9.045-10.489-5.492-21.723,0.301-28.156c5.794-6.433,16.593-11.144,27.971-3.243c3.055,2.121,7.117,2.079,10.128-0.108    c3.009-2.186,4.306-6.037,3.232-9.598c-3.997-13.262,3.818-22.079,11.728-25.599c7.906-3.521,19.692-3.429,26.871,8.415    c1.927,3.18,5.654,4.794,9.296,4.02c3.638-0.773,6.388-3.764,6.857-7.454c1.741-13.74,12.468-18.616,21.124-18.616    s19.383,4.875,21.126,18.616c0.468,3.69,3.219,6.68,6.858,7.454c3.642,0.774,7.368-0.841,9.296-4.02    c7.178-11.845,18.961-11.935,26.868-8.414c7.909,3.521,15.724,12.338,11.728,25.599c-1.074,3.561,0.223,7.412,3.232,9.598    c3.012,2.187,7.072,2.229,10.128,0.108c11.381-7.902,22.178-3.189,27.971,3.243c5.792,6.434,9.346,17.667,0.301,28.156    c-2.429,2.817-2.81,6.862-0.95,10.083c1.86,3.221,5.556,4.913,9.208,4.218c13.596-2.59,21.556,6.105,24.232,14.338    c2.553,7.861,1.463,18.891-9.548,25.011c0,0-204.547,0-204.712,0c-4.692,0-8.745,4.062-8.745,8.745    c0,4.748,3.996,8.745,8.745,8.745h206.809h8.345c7.874,0,14.279,6.406,14.279,14.279    C421.173,190.376,415.917,196.284,409.081,197.342z" />
                </g>
              </g>
            </svg>
          </div>
          <div id="welcome-lines">
            <div id="welcome-line-1">Movie Theater</div>
            <div id="welcome-line-2">Hi there! Fill up this form to register</div>
            <div className="message_error_register">{registerMessageError}</div>
          </div>

          <div id="form-body-register">
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
