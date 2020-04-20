import React, { useState } from 'react'

export default function Login() {

  const [credentials, setCredentials] = useState({ credentials: { username: '', password: '', email: '' } })

  const inputChanged = (e) => {
    const cred = credentials;
    cred[e.target.name] = e.target.value;
    setCredentials(cred);
    console.log(cred);
  }

  const login = (e) => {
    alert('Login');
  }

  return (
    <div className="field">
      LOGIN
      <div className="control">
        <label>Username
        <input type="text" className="input is-info"
            name="username" value={credentials.username}
            onChange={inputChanged} />
        </label>
      </div>
      <div className="control">
        <label>password
        <input type="password" className="input is-info"
            name="password" value={credentials.password}
            onChange={inputChanged} />
        </label>
      </div>
      <div className="control">
        <label>email
        <input type="email" className="input is-info"
            name="email" value={credentials.email}
            onChange={inputChanged} />
        </label>
      </div>
      <button onClick={login} className="button is-link">Login</button>
    </div>
  )
}
