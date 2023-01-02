import { showOneButtonPopup, showTwoButtonPopup } from '@/common/common';
import { setAuthorFollow } from '@/services/authorService';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../dashboard/Button';

export default function FollowButton(props) {
  const { className, author, onClick } = props;
  const [ stateText, setStateText ] = useState('フォロー');
  const dispatch = useDispatch();
  const refButton = useRef();

  //==============================================================================
  // function
  //==============================================================================
  const initButtonStatus = () => {
    refButton.current.setStatus(undefined);
    onClick?.('init');
  };
  //==============================================================================
  // handler
  //==============================================================================
  const handleClick = (event) => {
    onClick?.('loading');
    setFollowAuthor('post');
  };
  //==============================================================================
  // api
  //==============================================================================
  const setFollowAuthor = async (method) => {
    const {status, data} = await setAuthorFollow(method, author?.id);
    
    if( status === 201 || status === 200 ){
      setStateText( method === 'post' ? 'フォロー中' : 'フォロー' );
    } else if( status === 409 ){
      showTwoButtonPopup(dispatch, 'unfollow', setFollowAuthor());
    } else {
      showOneButtonPopup(dispatch, data);
    }
    initButtonStatus();
  };
  //==============================================================================
  // hook & render
  //==============================================================================

  return (
    <>
      <Button 
        ref={refButton} 
        className={`btn-pk n blue ${className}`}
        onClick={handleClick} >
        {stateText}
      </Button>
    </>
  )
}
