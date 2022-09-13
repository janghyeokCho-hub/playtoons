import React, { useState, useCallback } from "react";

const Recover = () => {
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
            <label for="id" className="h">
              メールアドレス
            </label>
            <input type="text" id="id" className="inp_txt w100p" />
          </div>
        </div>
        <div className="btns ty1">
          <button type="submit" className="btn-pk mem blue">
            <span>次へ</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Recover;
