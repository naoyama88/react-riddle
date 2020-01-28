import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

import CommentSection from './CommentSection';

import './css/riddle_detail.css';

const Detail = props => {
  const [riddle, setRiddle] = useState([]);
  const [img, setImg] = useState('');
  const [countLike, setCountLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [isEditComment, setIsEditComment] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  const riddleId = props.match.params.riddleId;

  const fetchRiddle = async () => {
    console.log(riddleId);
    const result = await axios(
      'http://localhost:3000/api/getRiddle/' + riddleId,
    );
    setRiddle(result.data);
    setImg(result.data.image_url);
    setCountLike(result.data.like);
  }

  const fetchComments = async () => {
    const result = await axios(
      'http://localhost:3000/api/getComments/' + riddleId,
    );
    setComments(result.data);
  }

  useEffect(() => {
    fetchRiddle();
    fetchComments();
  }, []);

  const handleSubmitDelete = e => {
    e.preventDefault();
    const deleteRiddle = async () => {
      await axios.post(
        'http://localhost:3000/api/deleteRiddle/', {
          riddleId: riddleId
        }
      );
    }
    deleteRiddle()
    .then(() => setRedirect(true));
  }

  let imgStyle = {
    backgroundImage: `url(http://localhost:3000/${img})`
  }

  const onClickLike = () => {
    console.log(riddle._id);
    setCountLike(1 + countLike);
    axios.post('http://localhost:3000/api/like', {
      riddleId: riddle._id
    });
  }

  if (redirect) {
    return <Redirect to='/'/>;
  }

  return (
    <>
      <div className="riddle-detail-container" style={imgStyle} >
        <div className="riddle-detail">
          <h1 className="title">{riddle.title}</h1>
          <div className="riddle-info">
            <div className="author">Author: {riddle.author}</div>
            <div className="date">{riddle.date}</div>
          </div>
          <p className="content">{riddle.riddle}</p>
          <div className="form-like-container">
            <form action='/like' id="like" method='POST'>
              <input type='hidden' name='riddleId' value={riddle._id} />
              <div className="like-button" onClick={onClickLike}>
                <input type="hidden" name="imgUrl" value={riddle.image_url} />
                <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7226 4.41603L12 4.60093L12.2774 4.41603L17.9667 0.623115L23.5 5.23419V11.7658L12 21.3491L0.5 11.7658V5.23419L6.03329 0.623116L11.7226 4.41603Z" stroke="#46FFA6"/>
                </svg>
                <h1 className="like-count">{countLike}</h1>
              </div>
            </form>
          </div>
          <div className="form-delete-container">
            <form action='/delete' method='POST'>
              <input type='hidden' name='riddleId' value={riddle._id} />
              <button className="delete-button" name='delete' onClick={handleSubmitDelete}>DELETE</button>
            </form>
          </div>
        </div>
      </div>
      <CommentSection 
        comments={comments}
        riddleId={riddle._id}
        />
    </>
  )
}

export default Detail;