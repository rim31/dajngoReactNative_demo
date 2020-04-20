import React, { useState } from 'react'
import { useCookies } from 'react-cookie';


export default function Login() {
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
  // const login = (e) => {
  //   // alert('Login');
  //   console.log("Login ", username, password);
  //   fetch('http://127.0.0.1:8000/auth/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ username: username, password: password })
  //   }).then(data => data.json())
  //     .then(
  //       data => { console.log(data); }
  //     ).catch(error => console.error(error))
  // }



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
          setCookie('token', res.token)
          console.log(cookies)
          // have to check the number of atempts
          if (res.token) {
            window.location.href = "https://parisrollerdance.fr"
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
    <div className="field">
      LOGIN
      <div className="control">
        <label>Username
        <input type="text" className="input is-info"
            name="username" value={username} onChange={changeUsername} />
        </label>
      </div>
      <div className="control">
        <label>password
        <input type="password" className="input is-info"
            name="password" value={password} onChange={changePassword} />
        </label>
      </div>
      {/* <button onClick={login} className="button is-link">Login</button> */}
      <div><button className="button is-link" onClick={login}
      >{isLoginView ? 'Login' : 'Register'}</button>
        <span onClick={toogleView}>Register</span></div>
      <div>
        <a href="www.google.com">forget login/password</a>
      </div>
    </div>
  )
}
