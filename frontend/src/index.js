import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';

const routing = (
  <BrowserRouter>
    <CookiesProvider>
      <Route exact path="/" component={Login}></Route>
      <Route path="/things" component={App}></Route>
    </CookiesProvider>
  </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();