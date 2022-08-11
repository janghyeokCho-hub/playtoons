import React from "react";
import styled from "styled-components";
import { Body1, Border05pxTiara } from "../../styledMixins";


function LoginBtnAnimate(props) {
  const { icoAnimate, loginTxtSns, className } = props;

  return (
    <LoginBtnSns className={`login_btn_sns ${className || ""}`}>
      <IcoAnimate className="ico-animate" src={icoAnimate} />
      <LoginTxtSns className="login-txt-sns">{loginTxtSns}</LoginTxtSns>
    </LoginBtnSns>
  );
}

const LoginBtnSns = styled.div`
  ${Border05pxTiara}
  width: 400px;
  height: 40px;
  margin-top: 24px;
  display: flex;
  border-radius: 20px;

  &.login_btn_sns.login_btn_google {
    margin-top: 12px;
  }

  &.login_btn_sns.login_btn_twitter {
    margin-top: 12px;
  }
`;

const IcoAnimate = styled.img`
  margin-top: 8px;
  width: 24px;
  height: 24px;
  margin-left: 30px;
`;

const LoginTxtSns = styled.div`
  ${Body1}
  margin-top: 10px;
  width: 278px;
  height: 20px;
  margin-left: 16px;
  margin-right: 53px;
  flex: 1;
  font-weight: 700;
  color: var(--vulcan);
  text-align: center;
  line-height: 20px;
  white-space: nowrap;
`;

export default LoginBtnAnimate;
