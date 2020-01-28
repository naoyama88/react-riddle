import React, { useState } from 'react';
import axios from 'axios';

import ThreeDotsSvg from './ThreeDotsSvg';
import AgreeSvg from './AgreeSvg';
import DisagreeSvg from './DisagreeSvg';

import './css/riddle_detail.css';
import './css/comment.css';

const Comment = props => {
  const { comment } = props;
  const [editComment, setEditComment] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countVote, setCountVote] = useState(comment.vote);
  const [author, setAuthor] = useState(comment.author);
  const [commentContent, setCommentContent] = useState(comment.comment);

  const commentId = comment._id;

  const handleOnChangeAuthor = e => {
    setAuthor(e.target.value);
  }

  const handleOnChangeComment = e => {
    setCommentContent(e.target.value);
  }

  const handleDeleteComment = e => {
    e.preventDefault();
    const deleteComment = async () => {
      await axios.post(
        'http://localhost:3000/api/comment/delete', {
          commentId: comment._id
        }
      );
    }
    deleteComment()
    .then(() => setRedirect(true));
  }

  const handleUpdateComment = e => {
    e.preventDefault();
    const updateComment = async () => {
      await axios.post(
        'http://localhost:3000/api/comment/update', {
          commentId: comment._id,
          author: author,
          comment: commentContent
        }
      );
    }
    updateComment()
    .then(() => setRedirect(true));
  }

  const handleVote = voteType => {
    const vote = async () => {
      await axios.post(
        'http://localhost:3000/api/comment/vote', {
          id: comment._id,
          vote: voteType,
          riddle_id: comment.riddle_id
        }
      );
    }
    if (voteType === 'agree') {
      setCountVote(1 + countVote);
    } else if (countVote > 0) {
      setCountVote(countVote - 1);
    }
    vote();
  }

  const handleClickThreeDots = () => {
    setEditComment(true);
  }

  const CommentForm = editComment ? (
    <form method="POST" onSubmit={handleUpdateComment}>
      <input
        type="text"
        name="author"
        value={author}
        placeholder="Your name"
        onChange={handleOnChangeAuthor}
      />
      <textarea
        name="comment"
        cols="20"
        rows="10"
        placeholder="How do you think?"
        onChange={handleOnChangeComment}
      >{commentContent}</textarea>
      <button
        className="button button-blue"
        onClick={handleUpdateComment}
      >
        Update
      </button>
      <button
        className="button button-blue"
        onClick={handleDeleteComment}
      >
        Delete
      </button>
    </form>
  ) : (
    <>
      <div className="menu" onClick={handleClickThreeDots}>
        <ThreeDotsSvg />
      </div>
      <div className="vote-count">{countVote} people think so too</div>
      <div className="author">{comment.author} thinks...</div>
      <div className="comment">{comment.comment}</div>
      <div className="wrap-vote">
        <form id={'up' + commentId} method="POST" onSubmit={() => handleVote('agree')}>
          <input type="hidden" name="id" value={commentId} />
          <input type="hidden" name="riddle_id" value={comment.riddle_id} />
          <div className="agree" onClick={() => handleVote('agree')}>
            <AgreeSvg />
            <div className="vote-text">agree</div>
          </div>
        </form>
        <form id={'down' + comment._id} method="POST" onSubmit={() => handleVote('disagree')}>
          <input type="hidden" name="id" value={comment._id} />
          <input type="hidden" name="riddle_id" value={comment.riddle_id} />
          <div className="disagree" onClick={() => handleVote('disagree')}>
            <DisagreeSvg />
            <div className="vote-text">disagree</div>
          </div>
        </form>
      </div>
    </>
  );

  if (redirect) {
    window.location.reload();
  }

  return (
    <div className="each-comment">
      {CommentForm}
    </div>
  )
}

export default Comment;
