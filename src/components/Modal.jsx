import React, { useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';

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
    dispatch(
      showModal(
        {
          title: 'お知らせ', 
          contents: <ErrorPopup message={getErrorMessageFromResultCode(result)} buttonTitle={'確認'} />, 
          callback: ()=> {console.log('callback')}
        }
      )
    );
    dispatch(hideModal());
*
* @version 1.0.0
* @author 이현국
*/
export default forwardRef( function Modal(props, ref) {    
  const { show, title, contents } = props;
  const [ stateIsShow, setStateIsShow ] = useState(false);
  const [ stateTitle, setStateTitle ] = useState(undefined);
  const [ stateContent, setStateContent ] = useState(undefined);
  const dispatch = useDispatch();
  const refPopup = useRef();
  

  const handleClose = () => {
    setStateIsShow(false);
    dispatch(hideModal());
  }

  
  useImperativeHandle(ref, () => ({
    setContent: (title, content) => {
      setStateTitle(title);
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

  useEffect(() => {
    setStateTitle(title);
    
    return () => {
      setStateTitle(undefined);
    }
  }, [title]);


  return (
    <>
      {
        stateIsShow && 
          <div className="popup_dim" >
            <div ref={refPopup}  id="popTerms" className="layerPopup pop_terms">
              <div className="popup">
                <div className="pop_head">
                  <h2 className="title">{stateTitle}</h2>
                  <FontAwesomeIcon
                    icon={faXmarkLarge}
                    className="btn_pop_close"
                    onClick={handleClose}
                  />
                </div>
                <div className="pop_cont ta_center">
                  {stateContent}
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
})

