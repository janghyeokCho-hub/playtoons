import React, { useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import {hideModal} from '../modules/redux/ducks/modal'
import styled from 'styled-components';
import Button from '@COMPONENTS/dashboard/ButtonDefault';
import CloseButton from '@COMPONENTS/dashboard/ButtonOutline';

import iconClose from '@ICONS/icon_close_black.png'
import useOutSideClick from '@/common/useOutSideClick';

export const MODAL_TYPE = {
  DEFAULT: 0,
  CLOSE_BUTTON: 1,
  CONFIRM_BUTTON: 2,
  TWO_BUTTON: 3,
};

/**
* Common Modal 
  ex)
    import { useDispatch } from "react-redux";
    import {showModal} from '@/modules/redux/ducks/modal';
    
    const dispatch = useDispatch();
    dispatch(showModal(<>支援管理 準備しています。</>));
*
* @version 1.0.0
* @author 이현국
*/
export default function Modal({show, contents, callback, type }) {
  const refModal = useRef();
  const dispatch = useDispatch();
  

  const handleClose = () => {
    if( type === MODAL_TYPE.DEFAULT || type === MODAL_TYPE.CLOSE_BUTTON ){
      callback?.();
    }
    dispatch(hideModal());
  }

  useOutSideClick(refModal, handleClose);

  useEffect(() => {
    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = 'auto';
    }
  }, []);
  

  return (
      <Overlay id={"modal"} show={show}>
        <Modalwrap ref={refModal}>
          <TopCloseButton onClick={handleClose} />
          <Contents>
            {contents}
          </Contents>
        </Modalwrap>
      </Overlay>
  )
}

const TopCloseButton = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${iconClose});
  background-size: 100%;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Modalwrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const Contents = styled.div`
  margin: 40px 32px;
  h1{
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
`;
