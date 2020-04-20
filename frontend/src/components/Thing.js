import React, { useState } from 'react'

export default function Thing({ token }) {
  const [things, setThings] = useState([])

  const loadThings = () => {
    console.log("get DATA ", token);
    alert(token);
    fetch('http://127.0.0.1:8000/api/things/', {
      method: 'GET',
      headers: {
        'Authorization': `Token 431b81eec19e04b2d774b5319ac9ca31b05debfb`
      }
    }).then(resp => resp.json())
      .then(res => setThings(res))
      .catch(error => console.error(error))
  }


  return (
    <div>
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
