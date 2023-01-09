import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useOutSideClick from '@/common/useOutSideClick';
import { hideModal } from '@/modules/redux/ducks/modal';
import { faXmarkLarge } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useImperativeHandle, useState } from 'react';


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
export default forwardRef( function Modal(props) {    
  const { show, title, contents, className } = props;
  const [ stateIsAnimation, setStateIsAnimation ] = useState(false);
  const dispatch = useDispatch();
  const refPopup = useRef();
  

  const handleClose = () => {
    document.body.style = `overflow: auto`
    dispatch(hideModal());
  }

  const handleKeydown = (event) => {
    if( event.key === 'Esc' || event.key === 'Escape' ){
      handleClose();
    }
  };


  useOutSideClick(refPopup, handleClose);

  useEffect(() => {
    setTimeout(() => {
      setStateIsAnimation(show);
    }, [1]);
  }, [show]);
  

  useEffect(() => {
    document.body.style= `overflow: hidden`;
    window.addEventListener("beforeunload", (e) => handleClose());     //창닫기, 주소창을 통항 이동시 
    window.addEventListener("keydown", (e) => handleKeydown(e));       //키 이벤트작동시
    
    return () => {
      handleClose();
      window.removeEventListener("beforeunload", (e) => handleClose());
      window.removeEventListener("keydown", (e) => handleKeydown(e));
    }
  }, []);


  return (
    <>
      {
        show && 
          <div className="popup_dim" >
            {/* popTerms */}
            <div ref={refPopup}  id="popTerms" className={`layerPopup transition ${stateIsAnimation ? 'open' : 'close'} modal ${className}`}>
              <div className="popup">
                <div className="pop_head">
                  <h2 className="title">{title}</h2>
                  <div className='btn_pop_close'>
                    <FontAwesomeIcon
                      icon={faXmarkLarge}
                      className="fa-solid"
                      onClick={handleClose}
                    />
                  </div>
                </div>
                <div className="pop_cont ta_center">
                  {contents || ''}
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
})

