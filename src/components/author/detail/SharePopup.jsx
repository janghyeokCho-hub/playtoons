import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import ToastPopup from "@COMPONENTS/ToastPopup";

const SharePopup = ({ onClose }) => {
  const url = window.location.href;
  const [isToastShow, setIsToastShow] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToastType("success");
        setToastMessage("コピーされました。");
        setIsToastShow(true);
        setTimeout(() => {
          setIsToastShow(false);
        }, 1500);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }, [url]);
  return (
    <>
      <div className="popup_dim">
        <div id="popShare" className="layerPopup pop_share">
          <div className="popup">
            <div className="pop_head">
              <h2 className="title">シェアーする</h2>
              <button
                type="button"
                className="btn_pop_close b-close"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faXmarkLarge} />
              </button>
            </div>
            <div className="pop_cont">
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
            </div>
          </div>
        </div>
      </div>

      <ToastPopup
        type={toastType}
        message={toastMessage}
        visible={isToastShow}
      />
    </>
  );
};

export default SharePopup;
