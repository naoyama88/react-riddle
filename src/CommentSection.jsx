import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'

import Comment from './Comment';

import BackArrowSvg from './BackArrowSvg';

const CommentSection = props => {

  const { comments, riddleId } = props;

  const [isCreateComment, setIsCreateComment] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [newComment, setNewCommentAuthor] = useState('');
  const [redirect, setRedirect] = useState(false);

  const backArrow = (!isCreateComment) ? (
    <a className="back-arrow" href="/">
      <BackArrowSvg />
    </a>
  ) : (
    <a className="back-arrow" href={"/riddles/" + riddleId}>
      <BackArrowSvg />
    </a>
  );

  const createComment = () => {
    setIsCreateComment(true);
  }

  const handleOnChangeAuthor = e => {
    setCommentAuthor(e.target.value);
  }

  const handleOnChangeComment = e => {
    setNewCommentAuthor(e.target.value);
  }

  const handleSubmitPostComment = e => {
    e.preventDefault();
    const createComment = async () => {
      await axios.post(
        'http://localhost:3000/api/createComment/', {
          riddleId: riddleId,
          author: commentAuthor,
          comment: newComment
        }
      );
    }
    createComment()
      .then(() => setRedirect(true));
  }

  if (redirect) {
    window.location.reload();
  }

  return (
    <div className="comment-section">
      { isCreateComment &&
        <form action="/comment/create" method="POST">
          <input type="text" name="author" value={commentAuthor} placeholder="Your name" onChange={handleOnChangeAuthor} />
          <textarea
            name="comment"
            cols="30"
            rows="10"
            placeholder="How do you think?"
            onChange={handleOnChangeComment}
          >{newComment}</textarea>
          <input type="hidden" name="riddleId" value={riddleId} />
          <button className="button button-blue button-comment" type="submit" onClick={handleSubmitPostComment}>Comment</button>
        </form>
      }
      { (!isCreateComment) &&
        <div className="button-wrapper">
          <div className="button button-blue" style={{cursor: "pointer"}} onClick={createComment}>Take A Guess</div>
        </div>
      }
      {comments.map(comment =>
        <Comment comment={comment} />
      )}
      {backArrow}
    </div>
  )
}

export default CommentSection;