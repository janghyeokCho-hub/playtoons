import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import useActions from "@/hook/useActions";
import { loginRequest } from "@REDUX/ducks/login";
import { useCallback } from "react";
import { useEffect } from "react";

const Login = () => {
  /*
authFail
email
errMessage
errStatus
password
token
   */
  const dispatch = useDispatch();
  const token = useSelector(({ login }) => login.token);
  const isLogined = useSelector(({ login }) => login.isLogined);
  const errStatus = useSelector(({ login }) => login.errStatus);
  const errMessage = useSelector(({ login }) => login.errMessage);
  const loading = useSelector(({ loading }) => loading["login/REQUEST"]);
  const sync = useSelector(({ loading }) => loading["login/SYNC"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [onLogin] = useActions([loginRequest], []);

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
   * Password 보기 / 가림 함수
   */
  const handleShowPasswordChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  /**
   * 일반 로그인 시도
   */
  const handleLogin = useCallback(() => {
    console.log("handleLogin");
    const data = {
      email,
      password,
    };
    onLogin(data);
  }, [email, password, onLogin]);

  useEffect(() => {
    if (isLogined) {
      // 로그인 성공으로 라우터 변경
      console.log(isLogined);
    }
  }, [isLogined]);

  return (
    <>
      <h1 className="logo">
        <span className="icon">PlayToons</span>
      </h1>

      {errStatus && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">
            辺ようむる海視リずンぼ周場スネ心7場情サムマ事果ずられ情高びぴら急必のにわ陸強ゅょ
          </p>
        </div>
      )}

      <div className="area_member">
        <div className="col">
          <label htmlFor="id" className="h">
            メールアドレス
          </label>
          <input
            type="text"
            id="id"
            className="inp_txt w100p"
            onChange={handleEmailChange}
            value={email}
          />
        </div>
        <div className={`${errStatus ? "error" : ""} col`}>
          {/* <!-- 에러일때 error 추가 --> */}
          <label htmlFor="pwd" className="h">
            パスワード
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="pwd"
            className="inp_txt w100p"
            onChange={handlePasswordChange}
            value={password}
          />
          <button
            type="button"
            className={`${showPassword ? "active" : ""} btn_eyes`}
            onClick={() => handleShowPasswordChange()}
          >
            <span className="show">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="hide">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </button>

          {errStatus && (
            <p className="t_error">
              <span className="ico_error">Error message</span>
            </p>
          )}
          {/* <!-- 에러일때 error 추가 --> */}
        </div>
        <div className="col_link">
          <a className="a_link">パスワードをお忘れですか?</a>
        </div>
        <button
          type="submit"
          className="btn-pk mem blue"
          onClick={() => handleLogin()}
        >
          <span>ログイン</span>
        </button>
      </div>

      <div className="area_sns">
        <h2 className="tit">
          <span>または</span>
        </h2>

        <a href="#" className="btn-pk mem white mt0">
          <span className="ico i_log_animate">Animateで続行</span>
        </a>
        <a href="#" className="btn-pk mem white">
          <span className="ico i_log_google">Googleで続行</span>
        </a>
        <a href="#" className="btn-pk mem white">
          <span className="ico i_log_twitter">Twitterで続行</span>
        </a>
        <a href="#" className="btn-pk mem black">
          <span className="ico i_log_apple">Appleで続行</span>
        </a>
      </div>

      <div className="botm">
        <p className="t1">
          アカウントをお持ちでないですか? <a href="#" className="c-blue"></a>
        </p>
        <a href="#" className="t2">
          プライバシーポリシー
        </a>
      </div>
    </>
  );
};

export default Login;
