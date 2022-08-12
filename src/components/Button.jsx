import React from "react";
import styled from "styled-components";
import { Body1, Border05pxTiara } from "@/styledMixins";

const LoginTxtSns = styled.span`
  ${Body1}
  flex: 1;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  align-self: center;
  color: var(${(props) => props.color});
`;

const BtnStyle = styled.div`
  ${Border05pxTiara}
  width: 400px;
  height: 40px;
  display: flex;
  margin-bottom: 15px;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  background-color: var(${(props) => props.bgColor});
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: 30px center;

  border-width: 1px;
  border-style: solid;
  border-color: var(${(props) => props.bdColor});
`;

const LoginBtn = ({ text, snsType, color, bgColor, bdColor, callback }) => {
  let bgImage;

  switch (snsType) {
    case "GOOGLE":
      bgImage = require("@ICONS/authlogin-ico-google.png");
      break;
    case "TWITTER":
      bgImage = require("@ICONS/authlogin-ico-twitter.png");
      break;
    case "APPLE":
      bgImage = require("@ICONS/authlogin-ico-apple.png");
      break;
    default:
  }

  return (
    <BtnStyle
      bgImage={bgImage}
      bgColor={bgColor}
      bdColor={bdColor}
      onClick={callback}
    >
      <LoginTxtSns className="login-txt-sns" color={color}>
        {text}
      </LoginTxtSns>
    </BtnStyle>
  );
};

export default LoginBtn;
