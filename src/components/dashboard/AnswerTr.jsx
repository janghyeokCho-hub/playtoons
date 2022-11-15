import { faShare } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';



export default forwardRef(function AnswerTr(props, ref) {
  const { item, text, index, type, callback } = props;
  const [stateShow, setStateShow] = useState(false);
  const refContainer = useRef();

  const handleShow = () => {
    callback?.(index);
    setStateShow( (isShow) => !isShow );
  };

  
  useImperativeHandle(ref, () => ({
    setShow: (isShow) => {
      setStateShow(isShow);
    },
    scrollIntoView: () => {
      refContainer.current.scrollIntoView({ behavior: 'smooth' });
    },
  }));

  return (
    <>
      {
        type === undefined && 
          <tr ref={refContainer} className={`tr_a ${stateShow ? 'on d_tr' : ''}`} >
            <td className="hide-m"></td>
            <td colSpan="5" className="ta-l">
              <div className="tx_a1" >
                <button type="button" className="arr view-m" id={item.id} onClick={handleShow} ></button>
                <p className="t1">{item.creator_comnent}</p>
              </div>
              <div className="tx_a2">
                <span className="re view-m"><FontAwesomeIcon icon={faShare} /></span>
                <p className="t2"><span className="i-txt">{text.saler}</span><span>{item.answer.time}時</span></p>
                <p className="t1">{item.answer.coment}</p>
              </div>
            </td>
            <td className="hide-m ta-c"></td>
          </tr>
      }

      {
        type === 'salesReview' && 
          <tr ref={refContainer} className={`tr_a ${stateShow ? 'on d_tr' : ''}`} >
            <td className="hide-m"></td>
            <td colSpan="5" className="ta-l">
              <div className="tx_a1" >
                <button type="button" className="arr view-m" id={item.id} onClick={handleShow} ></button>
                <p className="t1">{item.creator_comnent}</p>
              </div>
              <div className="tx_a2">
                <span className="re view-m"><FontAwesomeIcon icon={faShare} /></span>
                <p className="t2"><span className="i-txt">{text.saler}</span><span>{item.answer.time}時</span></p>
                <p className="t1">{item.answer.coment}</p>
              </div>
            </td>
            <td className="hide-m ta-c"></td>
            <td className="hide-m ta-c"></td>
          </tr>
      }
    
    </>
  )
});
