import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'

import './css/createRiddle.css';

const CreateRiddle = () => {

  const [redirect, setRedirect] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = e => {
    e.preventDefault();
    const createRiddle = async () => {
      await axios.post(
        'http://localhost:3000/api/createRiddle/', {
          author,
          title,
          content,
        }
      );
    }
    createRiddle()
      .then(() => setRedirect(true));
  }

  useEffect(() => {
    console.log('create riddle use effect');
  }, []);

  if (redirect) {
    return <Redirect to='/'/>;
  }

  const handleOnChangeAuthor = e => {
    setAuthor(e.target.value);
  }

  const handleOnChangeTitle = e => {
    setTitle(e.target.value);
  }

  const handleOnChangeContent = e => {
    setContent(e.target.value);
  }

  return (
    <>
      <div id="body-UI">
        <h1>Make Your Own Riddle</h1>
        <form action='/api/create' method='POST'>
          <div className="input-UI">
            <input type='text' name='title' placeholder=" Title" onChange={handleOnChangeTitle} />
            <input type='text' name='author' placeholder=" Author"  onChange={handleOnChangeAuthor} />
            <textarea type='text' name='content' cols='30' rows='18' placeholder=" Story..." onChange={handleOnChangeContent}></textarea>
          </div>
          <div>
            <button className="button" onClick={handleCreate}>Done</button>
          </div>
        </form>
        <Link to="/" className="back-arrow">
          <svg width="65" height="40" viewBox="0 0 69 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4696 1.44463L2 20.9142L21.4696 40.3839" stroke="#D5E8DF" stroke-width="2"/>
            <path d="M2.91797 21.6362H69" stroke="#D5E8DF" stroke-width="2"/>
          </svg>
        </Link>
      </div>
    </>
  )
}

export default CreateRiddle;