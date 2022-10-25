import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReactionButtons(props) {
  const { type, text, item } = props;
  const [ stateType, setStateType ] = useState(undefined);
  const navigate = useNavigate();

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

  useEffect(() => {
    setStateType(type);
  }, [type]);

  return (
    <>
      {/* reaction list */}
      {
        stateType === undefined && 
          <>
            <div data-id={item.post.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.move}</div>
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
