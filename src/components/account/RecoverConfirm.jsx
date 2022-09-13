import React, { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";

const RecoverConfirm = () => {
  /*
  const { state } = useLocation();
  const code = state?.code;
  const [newPwd, setNewPwd] = useState(null);
  const [newPwdCheck, setNewPwdCheck] = useState(null);

  const handleNewPwdChage = (e) => {
    setNewPwd(e.target.value);
  };
  const handleNewPwdCheckChage = (e) => {
    setNewPwdCheck(e.target.value);
  };

  const handlePwdConfirm = useCallback(async () => {
    if (newPwd === newPwdCheck) {
      const response = await recoverConfirm({
        password: newPwd,
        code: "wd9ebilugu",
      });
      console.log(response);
    }
  }, [newPwd, newPwdCheck, code]);
  */

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
            <input type="password" id="pwd" className="inp_txt w100p" />
            <button
              type="button"
              className="btn_eyes"
              onclick="$(this).toggleClass('active');"
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
            <input type="password" id="pwd" className="inp_txt w100p" />
            <button
              type="button"
              className="btn_eyes"
              onclick="$(this).toggleClass('active');"
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
          <button type="submit" className="btn-pk mem blue">
            <span>パスワード変更</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoverConfirm;
