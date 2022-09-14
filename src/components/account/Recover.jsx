import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { recover } from "@API/accountService";

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  /**
   * email State 변경 함수
   * @param {Event} e
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecover = useCallback(async () => {
    if (email) {
      const response = await recover({ email });
      const { status } = response;
      if (status === 200) {
        const { expireOn } = response.data;
        navigate("../recover-check", { state: { expireOn } });
      } else if (status === 404) {
        alert("코드 참조");
      } else if (status === 503) {
        alert("코드 참조");
      }
    }
  }, [email]);

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
            <label htmlFor="id" className="h">
              メールアドレス
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div className="btns ty1">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleRecover}
          >
            <span>次へ</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate("/account")}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Recover;
