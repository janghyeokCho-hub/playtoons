import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getEulaVersion, updateAccount } from "@API/accountService";

const EulaPopup = ({ handleClose, readonly = false }) => {
  const [agree, setAgree] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState(false);
  const [eulaVersion, setEulaVersion] = useState(0);

  const [content, setContent] = useState(null);

  useEffect(() => {
    async function getEulaVersionFn() {
      const { data, status } = await getEulaVersion("author");
      if (status === 200) {
        const { version, content } = data.agreement;
        setEulaVersion(version);
        setContent(content);
      } else {
        setEulaVersion(null);
        setContent(null);
      }
    }
    getEulaVersionFn();
  }, []);

  const handleAgree = useCallback(async () => {
    if (!agree) {
      setIsErrorShow(true);
      return;
    }
    // patch account
    const params = {
      eulaVersion: eulaVersion,
    };
    const response = await updateAccount(params);

    const { status } = response;
    if (status === 200) {
      //
      console.log("status === 200");
    } else if (status === 400) {
      alert("코드 참조");
    } else if (status === 409) {
      alert("이미 사용중인 메일 주소");
    } else if (status === 503) {
      alert("코드 참조");
    }
  }, [agree, eulaVersion]);

  return (
    <div className="popup_dim">
      <div id="popTerms" className="layerPopup pop_terms">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">クリエイター登録</h2>
            <FontAwesomeIcon
              icon={faXmarkLarge}
              className="btn_pop_close"
              onClick={handleClose}
            />
          </div>
          <div className="pop_cont">
            <div className="wrap_login">
              <div className="area_terms">
                <div className="in scrollY">
                  <MarkdownPreview source={content} />
                </div>
              </div>

              {!readonly && (
                <div className={`${isErrorShow && !agree ? "error" : ""} inps`}>
                  <label className="inp_checkbox">
                    <input
                      type="checkbox"
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>案内事項に同意し、退会します。</span>
                  </label>
                  {isErrorShow && !agree && (
                    <p className="t_error">
                      <span className="ico_error">
                        必須項目をチェックしてください。
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {!readonly && (
            <div className="pop_botm">
              <button
                type="button"
                className="btn-pk blue"
                onClick={handleAgree}
              >
                クリエイターになる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EulaPopup;
