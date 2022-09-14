import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { recoverConfirmPassword } from "@API/accountService";
import { navigate } from "@storybook/addon-links";

const RecoverConfirm = () => {
  const { state } = useLocation();
  const code = state?.code;
  const [newPwd, setNewPwd] = useState(null);
  const [newPwdCheck, setNewPwdCheck] = useState(null);

  const [isPwdShow, setIsPwdShow] = useState(false);
  const [isRePwdShow, setIsRePwdShow] = useState(false);

  const handleNewPwdChage = (e) => {
    setNewPwd(e.target.value);
  };
  const handleNewPwdCheckChage = (e) => {
    setNewPwdCheck(e.target.value);
  };

  const handlePwdConfirm = useCallback(async () => {
    if (newPwd === newPwdCheck) {
      const response = await recoverConfirmPassword({
        password: newPwd,
        code: code,
      });

      const { status } = response;
      if (status === 200) {
        navigate("/account");
      } else if (status === 404) {
        alert("코드 참조");
      } else if (status === 503) {
        alert("코드 참조");
      }
    }
  }, [newPwd, newPwdCheck, code]);

  return (
    <>
      <h1 className="logo">パスワードを再設定</h1>
      <div className="txt">
        <p>ログインIDとして使用中の</p>
        <p>メールアドレスを入力してください。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty1">
          <div className="col">
            <label for="pwd" className="h">
              パスワード
            </label>
            <input
              type={`${isPwdShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={handleNewPwdChage}
            />
            <button
              type="button"
              className={`${isPwdShow ? "active" : ""} btn_eyes`}
              onclick={() => setIsPwdShow(!isPwdShow)}
            >
              <span className="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>
          </div>
          <div className="col">
            <label for="pwd" className="h">
              パスワード確認
            </label>
            <input
              type={`${isRePwdShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={handleNewPwdCheckChage}
            />
            <button
              type="button"
              className={`${isRePwdShow ? "active" : ""} btn_eyes`}
              onclick={() => setIsRePwdShow(!isRePwdShow)}
            >
              <span className="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>
          </div>
        </div>
        <div className="btns ty1">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handlePwdConfirm}
          >
            <span>パスワード変更</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate("../recover")}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoverConfirm;
