import { getErrorMessageFromResultCode } from '@/common/common';
import { showModal } from '@/modules/redux/ducks/modal';
import { deleteReactionReactionIdPinFromServer, getReactionReactionIdPinFromServer } from '@/services/dashboardService';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';

export default function ReactionButtons(props) {
  const { type, text, item } = props;
  const [ stateType, setStateType ] = useState(type);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //==============================================================================
  // function
  //==============================================================================

  //==============================================================================
  // api
  //==============================================================================

  const setReactionPin = async () => {
    
    const params = {
      id: item.reactionId,
    };

    let response = undefined;
    if( item.pinned ){
      response = await deleteReactionReactionIdPinFromServer(params);
    }
    else{
      response = await getReactionReactionIdPinFromServer(params);
    }
    const { status, data } = response;
    console.log('pin', status, data);

    if( status === 200 ){
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={''} buttonTitle={'確認'} />, }) );
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, }) );
    }
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleButtonClick = (e) => {
    const id = e.target.getAttribute("data-id");
    const innerText = e.target.innerText;
    
    switch(innerText){
      default: // move  
        navigate( `/dashboard/post/detail/${id}` );
        break;
      case text.fix:
        console.log('fix');
        ///reaction/:reactionId/pin
        setReactionPin();
        break;
      case text.good:
        console.log('good');
        ///reaction/:reactionId/like
        break;
      case text.coment:
        console.log('coment');
        //POST /reaction 에 reactionId 항목을 해당 리액션의 아이디를 입력
        break;
      case text.report:
        console.log('report');
        //POST /reaction/:reactionId/report
        break;
      case text.delete:
        console.log('delete');
        //현재는 내가 작성한 댓글에 대해서만 삭제 가능합니다 DELETE /reaction/:reactionId
        break;
    }
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  useEffect(() => {
    setStateType(type);
  }, [type]);

  return (
    <>
      {/* reaction list */}
      {
        stateType === undefined && 
          <>
            <div data-id={item.postId} onClick={handleButtonClick} className="btn-pk s blue2">{text.move}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.fix}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.good}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.coment}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.report}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.delete}</div>
          </>
      }

      {/* post detail */}
      {
        stateType === 'postDetail' && 
          <>
            <div className="btn-pk s blue2" data-id={item.id} onClick={handleButtonClick}>{text.fix}</div>
            <div className="btn-pk s blue2" data-id={item.id} onClick={handleButtonClick}>{text.good}</div>
            <div className="btn-pk s blue2" data-id={item.id} onClick={handleButtonClick}>{text.coment}</div>
            <div className="btn-pk s blue2" data-id={item.id} onClick={handleButtonClick}>{text.report}</div>
            <div className="btn-pk s blue2" data-id={item.id} onClick={handleButtonClick}>{text.delete}</div>
          </>
      }
    </>
  )
}
