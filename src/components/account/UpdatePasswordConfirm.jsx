import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { updateAccount } from "@API/accountService";
import { useNavigate } from "react-router-dom";

const UpdatePasswordConfirm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isRePasswordShow, setIsRePasswordShow] = useState(false);

  const handlePasswordConfirm = useCallback(async () => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    } else if (!rePassword) {
      alert("비밀번호를 재 확인하세요.");
      return;
    } else if (password !== rePassword) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }

    const response = await updateAccount({ password });
    const { status } = response;
    if (status === 200) {
      /**
       * @todo Update Email 을 들어오기 전 페이지로 이동
       * */
      navigate("/");
    } else if (status === 400) {
      alert("코드 참조");
    } else if (status === 409) {
      alert("이미 사용중인 메일 주소");
    } else if (status === 503) {
      alert("코드 참조");
    }
  }, [password, rePassword, navigate]);

  return (
    <>
      <h1 className="logo">パスワードの変更</h1>
      <div className="txt">
        <p>新しいパスワードを入力してください。</p>
      </div>

      <div className="area_member">
        <div className="inbox ty3">
          <div className="col">
            <label htmlFor="pwd" className="h">
              パスワード
            </label>
            <input
              type={`${isPasswordShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={`${isPasswordShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsPasswordShow(!isPasswordShow)}
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
            <label htmlFor="pwd" className="h">
              パスワード確認
            </label>
            <input
              type={`${isRePasswordShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={(e) => setRePassword(e.target.value)}
            />
            <button
              type="button"
              className={`${isRePasswordShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsRePasswordShow(!isRePasswordShow)}
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
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handlePasswordConfirm}
          >
            <span>パスワード変更</span>
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

export default UpdatePasswordConfirm;
