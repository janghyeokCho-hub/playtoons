import { useEffect } from "react";
import { useCallback, useState } from "react";

import Toast from "./Toast";



export default function SharePopup(props){
  const { item } = props;
  const [ stateToast, setStateToast ] = useState({type: undefined, message: undefined, show: false});
  const url = `${window.location.origin}/post/detail/${item?.type?.code}/${item?.id}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setStateToast({
          type: "success",
          message: "コピーされました。",
          show: true
        });
      })
      .catch((e) => {
        setStateToast({
          type: "error",
          message: "コピーに失敗しました。 もう一度コピーしてください。",
          show: true
        });
      });
  }, [url]);

  useEffect(() => {
    if( stateToast.show ){
      setTimeout(() => {
        setStateToast({
          ...stateToast,
          show: false,
        });
      }, 1500);
    }
  }, [stateToast.show]);

  return (
    <>
      <ul>
        <li className="ico1 pointer">
          <a target="_blank" rel="noopener noreferrer" href={`http://twitter.com/share?text=${item.title}&url=${url}`}>animate</a>
        </li>
        <li className="ico2 pointer">
          <a target="_blank" rel="noopener noreferrer" href={`http://twitter.com/share?text=${item.title}&url=${url}`}>twitter</a>
        </li>
        <li className="ico3 pointer">
          <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>facebook</a>
        </li>
      </ul>
      <div className="inp_btn">
        <div className="inp_txt w100p">{url}</div>
        <button
          type="button"
          className="btn-pk n blue2"
          onClick={() => handleCopy()}
        >
          {`コピー`}
        </button>
      </div>

      <Toast type={stateToast?.type} message={stateToast?.message} show={stateToast?.show} />
    </>
  );
};
