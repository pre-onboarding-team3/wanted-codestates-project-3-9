import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';

const Comment = userId => {
  const dispatch = useDispatch();
  const inputText = useRef();
  const data = useSelector(state => state.data.data);

  const updateComment = () => {
    const regex = new RegExp(/^\s{1,}/gi);
    if (regex.test(inputText.current.value)) return;
    const nowDate = new Date().getTime();
    dispatch(
      addComment(userId.userId, 'userId', inputText.current.value, nowDate),
    );
    inputText.current.value = '';
  };

  const pressEnter = e => {
    if (e.code === 'Enter') {
      updateComment();
    }
  };

  const matched = data.filter(item => item.id === userId.userId)[0];

  const { comments } = matched;

  const elapsedTime = date => {
    const nowDate = new Date().getTime();
    const elapsedMSec = Math.floor((nowDate - date) / 1000);
    const elapsedMin = Math.floor(elapsedMSec / 60);
    const elapsedHour = Math.floor(elapsedMin / 60);
    const elapsedDay = Math.floor(elapsedHour / 24);

    if (elapsedMin === 0) {
      return '방금 작성';
    } else if (elapsedHour === 0) {
      return `${elapsedMin} 분 전`;
    } else if (elapsedDay === 0) {
      return `${elapsedHour}시간 전`;
    } else {
      return `${elapsedDay}일 전`;
    }
  };

  return (
    <Wrap>
      {comments.map((item, index) => {
        const { commentId, comment, commentDt } = item;
        return (
          <CommentUl key={index}>
            <li>
              <div>
                <UserId>{commentId}</UserId>
                <p>{comment}</p>
              </div>
              <span>{elapsedTime(commentDt)}</span>
            </li>
          </CommentUl>
        );
      })}
      <Input>
        <input
          onKeyPress={pressEnter}
          ref={inputText}
          type="text"
          placeholder="댓글을 입력해주세요."
        />
        <button onClick={updateComment} type="button">
          게시
        </button>
      </Input>
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #eee;
  padding-bottom: 10px;
  width: 100%;
`;

const CommentUl = styled.ul`
  li {
    padding: 15px 20px 0px;
    border-top: 1px solid #ccc;
  }
  span {
    line-height: 30px;
    color: #aaa;
    font-size: 14px;
  }
`;

const UserId = styled.p`
  padding-right: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.div`
  display: flex;
  width: calc(100% - 40px);
  height: 40px;
  margin: 15px 20px;
  border: 1px solid #ccc;
  border-radius: 40px;
  background-color: #fff;
  box-sizing: border-box;
  input {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 20px;
    border: none;
    border-radius: 40px;
    outline: none;
    box-sizing: border-box;
    font-size: 18px;
  }
  button {
    width: 100px;
    height: 100%;
    margin: 0;
    padding: 0 20px;
    border-radius: 40px;
    border: 0;
    background-color: #fff;
    font-size: 18px;
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
`;

Comment.propTypes = {
  commentData: PropTypes.array,
  id: PropTypes.string,
};

export default Comment;
