import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";

const UpdatePasswordConfirm = () => {
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
        code: code,
      });
      console.log(response);
    }
  }, [newPwd, newPwdCheck, code]);
  */

  return (
    <>
      <h1 class="logo">パスワードの変更</h1>
      <div class="txt">
        <p>新しいパスワードを入力してください。</p>
      </div>

      <div class="area_member">
        <div class="inbox ty3">
          <div class="col">
            <label for="pwd" class="h">
              パスワード
            </label>
            <input type="password" id="pwd" class="inp_txt w100p" />
            <button
              type="button"
              class="btn_eyes"
              onclick="$(this).toggleClass('active');"
            >
              <span class="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span class="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>
          </div>
          <div class="col">
            <label for="pwd" class="h">
              パスワード確認
            </label>
            <input type="password" id="pwd" class="inp_txt w100p" />
            <button
              type="button"
              class="btn_eyes"
              onclick="$(this).toggleClass('active');"
            >
              <span class="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span class="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>
          </div>
        </div>
        <div class="btns">
          <button type="submit" class="btn-pk mem blue">
            <span>パスワード変更</span>
          </button>
          <button type="submit" class="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordConfirm;
