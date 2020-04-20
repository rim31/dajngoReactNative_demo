import React from 'react';
import './App.css';
import Layout from './layouts/Layout';
import Login from './components/Login';
// import BaseRouter from './routes';
// import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div>
      <Layout />
      <Login />
    </div>
  );
}

export default App;
