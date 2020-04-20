import React, { useState } from 'react';
import './App.css';
import Layout from './layouts/Layout';
import Login from './components/Login';
// import BaseRouter from './routes';
// import { BrowserRouter as Router } from 'react-router-dom';
function App() {

  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }

  return (
    <div>
      <Layout />
      <Login userLogin={userLogin} />
    </div>
  );
}

export default App;
