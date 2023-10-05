import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CRUD from './CRUD';
import Registration from './Registration';
import './App.css';

function App() {
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistered(true);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={loggedIn || registered ? <CRUD /> : <Registration onRegistrationSuccess={handleRegistrationSuccess} onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
