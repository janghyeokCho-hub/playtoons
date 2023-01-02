import { useCallback, useState } from "react";

import { useLocation } from "react-router-dom";
import Toast from "../dashboard/Toast";



const SharePopup = (props) => {
  const [ stateToast, setStateToast ] = useState({type: undefined, message: undefined, show: false});
  const loaction = useLocation();
  const url = window.location.href;

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
        console.log("error : ", e);
      });
  }, [url]);

  return (
    <>
      <ul>
        <li className="ico1">
          <a href="#">animate</a>
        </li>
        <li className="ico2">
          <a href="#">twitter</a>
        </li>
        <li className="ico3">
          <a href="#">facebook</a>
        </li>
      </ul>
      <div className="inp_btn">
        <div className="inp_txt w100p">{url}</div>
        <button
          type="button"
          className="btn-pk n blue2"
          onClick={() => handleCopy()}
        >
          コピー
        </button>
      </div>

      <Toast type={stateToast?.type} message={stateToast?.message} show={stateToast?.show} />
    </>
  );
};

export default SharePopup;
