import React, { useState } from 'react';
import axios from 'axios';

function Registration({ onRegistrationSuccess, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage(''); // Clear the error message when the username changes
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername('');
    setPassword('');
    setEmail('');
    setErrorMessage('');
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7065/api/Registration/registration', {
        username,
        password,
        email,
        isActive: '1', // Provide a valid value for IsActive field
      });

      if (response.status === 200) {
        console.log('Registration successful');
        onRegistrationSuccess();
      } else {
        console.log('Registration failed');
        // Add any error handling logic here
      }
    } catch (error) {
      console.log('Error occurred during registration:', error);

      // Log the error response data
      console.log('Error response:', error.response.data);

      // Display the error message to the user
      setErrorMessage(error.response.data);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://localhost:7065/api/Registration/login', {
        username,
        password,
      });
  
      if (response.status === 200) {
        console.log('Login successful');
        onLoginSuccess();
        // Perform any necessary actions upon successful login
      } else {
        console.log('Login failed');
        // Add any error handling logic here
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
  
      // Display error message for invalid user
      if (error.response && error.response.status === 400) {
        setErrorMessage('Invalid username or password');
      } else {
        setErrorMessage('An error occurred during login');
      }
  
      // Log the error response data
      console.log('Error response:', error.response.data);
    }
  };
  
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>{isLoginMode ? 'User Login' : 'User Registration'}</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={isLoginMode ? handleLogin : handleRegistration} className="w-50">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {!isLoginMode && (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        )}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            {isLoginMode ? 'Login' : 'Register'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleToggleMode}>
            {isLoginMode ? 'Switch to Registration' : 'Switch to Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
