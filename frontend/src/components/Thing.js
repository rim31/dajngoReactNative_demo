import React, { useState } from 'react'

export default function Thing(props) {
  const [things, setThings] = useState([])

  const loadThings = () => {
    console.log("get DATA ");
    fetch('http://127.0.0.1:8000/api/things/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ username: 'test', password: 'test' })
    }).then(data => data.json())
      .then(
        data => {
          console.log(data);
          setThings(data);
        }
      ).catch(error => console.error(error))
  }


  return (
    <div>
      <h1>Task</h1>
      <table>
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
