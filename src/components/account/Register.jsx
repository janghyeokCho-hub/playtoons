import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { register } from "@API/accountService";
import { useSelector } from "react-redux";
import useActions from "@/hook/useActions";
import { loginRequest } from "@REDUX/ducks/login";

const Register = () => {
  const navigate = useNavigate();
  const [onLogin] = useActions([loginRequest], []);

  const isLogined = useSelector(({ login }) => login.isLogined);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [referralCode, setReferralCode] = useState(null);

  const [isPwdShow, setIsPwdShow] = useState(false);
  const [isRePwdShow, setIsRePwdShow] = useState(false);

  useEffect(() => {
    if (isLogined) {
      console.log(isLogined);
    }
  }, [isLogined]);
  /**
   * email State 변경 함수
   * @param {Event} e
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * password State 변경 함수
   * @param {Event} e
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * rePassword State 변경 함수
   * @param {Event} e
   */
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  /**
   * referralCode State 변경 함수
   * @param {Event} e
   */
  const handleReferralCodeChange = (e) => {
    setReferralCode(e.target.value);
  };

  const handleRegister = useCallback(async () => {
    if (!email) {
      // No Email
    } else if (password !== rePassword) {
      // Password 불일치
    } else {
      const response = await register({
        email,
        password,
        referralCode,
        eulaVersion: 0,
        privacyVersion: 0,
      });

      const { status } = response;
      if (status === 201) {
        const { expireOn } = response.data;

        const data = {
          email,
          password,
        };
        onLogin(data);

        navigate("../verify", { state: { email, password, expireOn } });
      } else if (status === 400) {
        alert("파라미터 검증 실패");
      } else if (status === 403) {
        alert("사용이 제한된 이메일 주소");
      } else if (status === 409) {
        alert("이미 등록된 이메일 주소");
      } else if (status === 403) {
        alert("코드 참조");
      }
    }
  }, [email, password, rePassword, referralCode, navigate]);

  return (
    <>
      <h1 className="logo">会員登録</h1>

      <div className="area_member">
        <div className="inbox">
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
          <div className="col">
            <label htmlFor="pwd" className="h">
              パスワード
            </label>
            <input
              type={isPwdShow ? "text" : "password"}
              id="pwd"
              className="inp_txt w100p"
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={`${isPwdShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsPwdShow(!isPwdShow)}
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
              type={isRePwdShow ? "text" : "password"}
              id="pwd"
              className="inp_txt w100p"
              onChange={handleRePasswordChange}
            />
            <button
              type="button"
              className={`${isRePwdShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsRePwdShow(!isRePwdShow)}
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
            <label htmlFor="id" className="h">
              紹介コード
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={handleReferralCodeChange}
            />
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleRegister}
          >
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
