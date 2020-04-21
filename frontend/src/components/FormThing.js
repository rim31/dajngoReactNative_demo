import React, { useState } from 'react'
import { Cookies } from 'react-cookie';

export default function FormThing(props, { token, data }) {// pass here props data
  const [things, setThings] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const cookies = new Cookies();
  const tokenCookies = cookies.get('token')

  function changeTitle(e) {
    setTitle(e.target.value);
    console.log(title)
  }

  function changeDescription(e) {
    setDescription(e.target.value);
    console.log(description)
  }

  // const isDisable = my_thing.title.length === 0 || my_thing.description.length === 0;
  const cancelClick = () => {
    alert('cancelForm()');// create that reference in parent
  }

  const saveClick = () => {
    console.log("save");
    fetch(`http://127.0.0.1:8000/api/things/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${tokenCookies}`
      },
      body: JSON.stringify({ title: title, description: description })
    }).then(resp => resp.json())
      .then(res => {
        console.log(res);
        const id = res.id;
        setThings(things => {
          return [...things, { id: id, title: title, description: description }]
        });
        console.log(things);
      })
      .catch(error => console.log(error));
  }

  // const updateClick = thing => {
  //   console.log("update thing", JSON.stringify(my_thing));
  //   fetch(`${process.env.REACT_APP_API_URL}/api/things/${id}/`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token ${cookieToken}`
  //     },
  //     body: JSON.stringify(my_thing)
  //   }).then(resp => resp.json())
  //     .then(res => editThing(res))
  //     .catch(error => console.log(error));
  // }


  return (
    <div>
      <h1>Formulaire</h1>
      {token}
      <h2>Title</h2>
      <input type="text" name="title" className="input is-info"
        placeholder={title} value={title} onChange={changeTitle}></input>
      <div>Description</div>
      <div><textarea name="description" className="input is-info"
        placeholder={description} value={description} onChange={changeDescription} /></div>
      {/* <button className="button is-primary" onClick={updateClick}>Update</button> */}
      <button className="button is-info" onClick={saveClick}>Save</button>
      <button onClick={cancelClick}>Cancel</button>
    </div>
  )
}
