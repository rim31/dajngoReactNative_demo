import React, { useState } from 'react'
import { useCookies } from 'react-cookie';


export default function Login(props) {
  const [isLoginView, setView] = useState(true);// pour switcher entre boutton login ou register
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cookies, setCookie] = useCookies(['token']);


  function changeUsername(e) {
    setUsername(e.target.value);
    console.log(username)
  }

  function changePassword(e) {
    setPassword(e.target.value);
    console.log(password)
  }

  function toogleView() {
    setView(!isLoginView)
  }

  function login() {
    console.log(username, password)
    if (isLoginView) {
      // fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      fetch('http://127.0.0.1:8000/auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      }).then(resp => resp.json())
        .then(res => {
          console.log(res.token);//store the token in cookies
          setCookie('token', res.token);
          console.log(cookies);
          // props.userLogin(res.token);// pass token to props parent
          // have to check the number of atempts
          if (res.token) {
            console.log('token ok : ', res.token);
            window.location.href = "/things"
          }
        })
        .catch(error => console.log(error));
    } else {
      // fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
      fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
      }).then(resp => resp.json())
        .then(res => {
          setView(true)
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <span className="field">
      {isLoginView ? <h1>LOGIN</h1> : <h1>REGISTER</h1>}LOGIN
      <span className="control">
        <label>Username
        <input type="text" className="input is-info"
            name="username" value={username} onChange={changeUsername} />
        </label>
      </span>
      <span className="control">
        <label>password
        <input type="password" className="input is-info"
            name="password" value={password} onChange={changePassword} />
        </label>
      </span>
      {/* <button onClick={login} className="button is-link">Login</button> */}
      <span>
        {isLoginView ?
          <button className="button is-link" onClick={login}>LOGIN</button> :
          <button className="button is-link" onClick={login}>REGISTER</button>
        }
      </span>
      <div onClick={toogleView}>Register</div>
      <div>
        <a href="/">forget login/password</a>
      </div>
    </span>
  )
}
