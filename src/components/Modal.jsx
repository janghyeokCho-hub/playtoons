import React, { useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
// import {hideModal, MODAL_DESIGN_TYPE} from '../modules/redux/ducks/modal'
import styled from 'styled-components';

import iconClose from '@ICONS/icon_close_black.png'
import useOutSideClick from '@/common/useOutSideClick';
import { useImperativeHandle, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkLarge } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import { hideModal } from '@/modules/redux/ducks/modal';


/**
* Common Modal 
  ex)
    import { useDispatch } from "react-redux";
    
    const dispatch = useDispatch();
    dispatch(showModal({contents: <>{no}支援管理 準備しています。</>, callback: ()=> {console.log('first')}}));
    dispatch(hideModal());
*
* @version 1.0.0
* @author 이현국
*/
export default forwardRef( function Modal(props, ref) {    
  const { show, contents, callback } = props;
  const [ stateIsShow, setStateIsShow ] = useState(false);
  const [ stateContent, setStateContent ] = useState(undefined);
  const dispatch = useDispatch();
  const refPopup = useRef();
  

  const handleClose = () => {
    setStateIsShow(false);
    dispatch(hideModal());

    callback?.();
  }

  
  useImperativeHandle(ref, () => ({
    setContent: (content) => {
      setStateContent(content);
      setStateIsShow(true);
    },
  }));

  useOutSideClick(refPopup, handleClose);

  useEffect(() => {
    setStateIsShow(show);
    
    return () => {
      setStateIsShow(false);
    }
  }, [show]);
  
  useEffect(() => {
    setStateContent(contents);
    
    return () => {
      setStateContent(undefined);
    }
  }, [contents]);


  return (
    <>
      {
        stateIsShow && 
          <div className="popup_dim" >
            <div ref={refPopup}  id="popTerms" className="layerPopup pop_terms">
              <div className="popup">
                <div className="pop_head">
                  <h2 className="title"> </h2>
                  <FontAwesomeIcon
                    icon={faXmarkLarge}
                    className="btn_pop_close"
                    onClick={handleClose}
                  />
                </div>
                <div className="pop_cont">
                  {stateContent}
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
})

