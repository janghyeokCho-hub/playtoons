import React, { useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginPasswordCheck } from "@API/loginService";

/**
 * 비밀번호 변경을 위해 기존 비밀번호 입력 폼
 */
const UpdatePasswordCheck = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);

  const handleUpdatePasswordCheck = useCallback(async () => {
    if (!password) {
      alert("패스워드를 입력하세요.");
      return;
    }
    const response = await loginPasswordCheck({ password });
    const { status } = response;
    if (status === 200) {
      navigate("../update-password-confirm");
    } else if (status === 400) {
      alert("파라미터 검증 실패");
    } else if (status === 403) {
      alert("인증 실패 / 권한 없음");
    } else if (status === 503) {
      alert("코드 참조");
    }
  }, [password, navigate]);
  return (
    <>
      <h1 className="logo">パスワードの変更</h1>
      <div className="txt">
        <p>既存のパスワードを入力してください。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty2">
          <div className="col">
            <label htmlFor="id" className="h">
              既存のパスワード
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleUpdatePasswordCheck}
          >
            <span>次へ</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate(-1)}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordCheck;
