import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the user registration endpoint
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      if (response.ok) {
        // User registration successful
        console.log('Registration successful');
        // Add any further logic or redirect the user as needed
      } else {
        // User registration failed
        console.log('Registration failed');
        // Add any error handling logic here
      }
    } catch (error) {
      // Handle any network or server errors
      console.log('Error occurred during registration:', error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegistration}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Login;
