import React, { useState } from 'react'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function changeUsername(e) {
    setUsername(e.target.value);
    console.log(username)
  }

  function changePassword(e) {
    setPassword(e.target.value);
    console.log(password)
  }
  const login = (e) => {
    // alert('Login');
    console.log("Login ", username, password);
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }).then(
      data => { console.log(data); }
    ).catch(error => console.error(error))
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
      <button onClick={login} className="button is-link">Login</button>
    </div>
  )
}
