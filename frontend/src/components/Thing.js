import React, { useState } from 'react'
import { withCookies, Cookies } from 'react-cookie';

export default function Thing({ token }) {
  const [things, setThings] = useState([])
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token')

  const loadThings = () => {
    console.log("get DATA ", token);
    fetch('http://127.0.0.1:8000/api/things/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${tokenCookies}`
      }
    }).then(resp => resp.json())
      .then(res => setThings(res))
      .catch(error => console.error(error))
  }


  return (
    <div>
      {tokenCookies}
      <h1>Task</h1>
      {token}
      <table className="table">
        {things.map((thing, i) => {
          return (
            <tbody key={i} >
              <tr>
                <td><h3> {thing.title}</h3></td>
                <td><i name="edit" className='fa fa-edit '></i></td>
                <td><i name="trash" className='fa fa-trash orange' ></i></td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <button className="button is-primary" onClick={loadThings}>load Things</button>
    </div>
  )
}
