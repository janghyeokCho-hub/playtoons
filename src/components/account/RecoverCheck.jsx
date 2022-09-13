import React, { useState, useCallback } from "react";

const RecoverCheck = () => {
  return (
    <>
      <h1 className="logo">パスワードを再設定</h1>
      <div className="txt">
        <p className="c-blue">jin@rocketstaff.com</p>
        <p>宛に認証用メールを送信しました。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty1">
          <div className="col">
            <label for="id" className="h">
              認証コード
            </label>
            <input type="text" id="id" className="inp_txt w100p" />
          </div>
          <div className="col_link">
            <span className="t c-gray">残り59秒</span>
            {/*<!-- 인증코드 남은시간 -->*/}
            <button type="button" className="btn-pk s blue bdrs" disabled>
              <span>再転送</span>
            </button>
            {/*<!-- 재전송 버튼 활성화 시 disabled 제거 -->*/}
          </div>
        </div>
        <div className="btns ty1">
          <button type="submit" className="btn-pk mem blue">
            <span>確認する</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoverCheck;
