import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateAccount } from "@API/accountService";

/**
 * 이메일 변경을 위해 새 이메일 입력 받는 폼
 */
const UpdateEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  const handleUpdateEmail = useCallback(async () => {
    const params = { email };
    const response = await updateAccount(params);
    const { status } = response;
    if (response.status === 200) {
      const { expireOn } = response.data;
      navigate("../update-email-verify", { state: { expireOn, email } });
    } else if (status === 400) {
      alert("코드 참조");
    } else if (status === 409) {
      alert("이미 사용중인 메일 주소");
    } else if (status === 503) {
      alert("코드 참조");
    }
  }, [email, navigate]);

  return (
    <>
      <h1 className="logo">メールアドレスの変更</h1>
      <div className="txt">
        <p>新しいメールアドレスを入力してください。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty2">
          <div className="col">
            <label htmlFor="id" className="h">
              新しいメールアドレス
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleUpdateEmail}
          >
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

export default UpdateEmail;
