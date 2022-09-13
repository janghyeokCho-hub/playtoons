import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";

const Register = () => {
  return (
    <>
      <h1 className="logo">会員登録</h1>

      <div className="area_member">
        <div className="inbox">
          <div className="col">
            <label for="id" className="h">
              メールアドレス
            </label>
            <input type="text" id="id" className="inp_txt w100p" />
          </div>
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
          <div className="col">
            <label for="id" className="h">
              紹介コード
            </label>
            <input type="text" id="id" className="inp_txt w100p" />
          </div>
        </div>
        <div className="btns">
          <button type="submit" className="btn-pk mem blue">
            <span>次へ</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>

      <div className="botm">
        <a href="#" className="t2">
          プライバシーポリシー
        </a>
      </div>
    </>
  );
};

export default Register;
