import { showOneButtonPopup } from '@/common/common';
import useOutSideClick from '@/common/useOutSideClick';
import { insertLikeReaction, setReactionIdDislikeToServer } from '@/services/reactionService';
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function LikeButton(props) {
  const { item, callback  } = props;
  const [ stateIsShow, setIsShow ] = useState(false);
  const dispatch = useDispatch();
  const refEmoji = useRef();

  const setLike = async () => {
    
    const {status, data} = await insertLikeReaction(item.id);
    console.log('setLike', status, data);
    
    if( status === 201 ){
      callback?.();
      //좋아요 취소 status number
    }
    else{
      //toast
      // showOneButtonPopup(dispatch, data);
    }
  };

  const setDislike = async () => {
    
    const {status, data} = await setReactionIdDislikeToServer(item.id);
    console.log('setLike', status, data);
    
    if( status === 201 ){
      callback?.();
      //싫어요 취소 status number
    }
    else{
      //toast
      // showOneButtonPopup(dispatch, data);
    }
  };


  const handleShow = (event) => {
    setIsShow(!stateIsShow);
  };

  const handleLike = (event) => {
    setLike();
    
  };
  const handleDislike = (event) => {
    setDislike();
  };

  useOutSideClick(refEmoji, () => setIsShow(false));


  return (
    <>
      <button type="button" className="btn01" onClick={handleShow}>
        <FontAwesomeIcon icon={faHeart} /> {item?.likeCount}
      </button>
      {
        stateIsShow && (
          <div className="box_drop box_favorit" ref={refEmoji}>
            <ul>
              <li>
                <button type="button" onClick={handleLike}>
                  <span className="i_favorit1">{item?.likeCount}</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={handleDislike}>
                  <span className="i_favorit5">{item?.dislikeCount}</span>
                </button>
              </li>
            </ul>
          </div>
        )
      }
    </>
  )
}
