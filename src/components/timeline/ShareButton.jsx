import { showPopup } from '@/common/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SharePopup from './SharePopup';

export default function ShareButton(props) {
  const { className, icon, children, onClick } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    
    onClick?.('loading');
    showPopup(dispatch, '', <SharePopup />, () => onClick?.('init') );
  };
  

  return (
    <>
      <button type="button" className={`${className}`} onClick={() => handleClick()}>
        <span className="i">
          <FontAwesomeIcon icon={icon} />
        </span>
        {children}
      </button>

    </>
  )
}
