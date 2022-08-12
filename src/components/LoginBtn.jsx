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
`;

const LoginBtn = ({ snsType, snsText }) => {
  let color, bgColor, bgImage;

  if (snsType === "google") {
    color = "--vlucan";
    bgColor = "--white";
    bgImage = require("@ICONS/authlogin-ico-google.png");
  } else if (snsType === "twitter") {
    color = "--vlucan";
    bgColor = "--white";
    bgImage = require("@ICONS/authlogin-ico-twitter.png");
  } else if (snsType === "apple") {
    color = "--white";
    bgColor = "--black";
    bgImage = require("@ICONS/authlogin-ico-apple.png");
  } else {
    color = "--white";
    bgColor = "--violet-blue";
  }

  return (
    <BtnStyle bgImage={bgImage} bgColor={bgColor}>
      <LoginTxtSns className="login-txt-sns" color={color}>
        {snsText}
      </LoginTxtSns>
    </BtnStyle>
  );
};

export default LoginBtn;
