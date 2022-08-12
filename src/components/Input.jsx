import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Body5, Border1pxTiara } from "@/styledMixins";
// undisable 필요
import accIcoDisabled from "@ICONS/accountregister-ico-disabled.png";

const Input = ({ inputType, label }) => {
  const [isPwdDisabled, setIsPwdDisabled] = useState(true);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (inputType === "password" && isPwdDisabled) {
      setType("password");
    } else {
      setType("text");
    }

    return () => {
      setType(null);
    };
  }, [isPwdDisabled]);

  return (
    <LoginFormDiv
      className={`login_form_text_withicon login_form_text_withicon-9`}
    >
      <LoginTxtFormLabel className="login-txt-form-label">
        {label}
      </LoginTxtFormLabel>
      <OverlapGroup className="overlap-group-3" type={type} />
      {inputType === "password" && (
        <IcoDisabled
          src={accIcoDisabled}
          onClick={() => setIsPwdDisabled(!isPwdDisabled)}
        />
      )}
    </LoginFormDiv>
  );
};

const LoginFormDiv = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const LoginTxtFormLabel = styled.span`
  ${Body5}
  min-height: 16px;
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const OverlapGroup = styled.input`
  ${Border1pxTiara}
  height: 40px;
  margin-top: 8px;
  display: flex;
  padding: 10px 13px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 400px;
  border-radius: 4px;
`;

const IcoDisabled = styled.img`
  position: absolute;
  width: 24px;
  height: 19px;
  top: 222px;
  right: 50px;
  cursor: pointer;
`;

export default Input;
