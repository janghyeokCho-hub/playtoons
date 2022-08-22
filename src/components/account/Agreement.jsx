import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { emailValidation } from "@COMMON/common";
import Timer from "@COMPONENTS/Timer";
import { agreementEula } from "@/services/accountService";

const Agreement = () => {
  const { state } = useLocation();
  const code = state?.code || "user";

  const [eulaContent, setEulaContent] = useState(null);

  useEffect(() => {
    const getEulaContent = async () => {
      const response = await agreementEula(code);
      console.log(response);
    };

    if (!eulaContent) {
      getEulaContent();
    }
  }, [code, eulaContent]);
  return (
    <AccountBoxDiv>
      <AgreementTitle>利用規約</AgreementTitle>
    </AccountBoxDiv>
  );
};

const AccountBoxDiv = styled.div`
  ${Border1pxGhost}
  position: absolute;
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AgreementTitle = styled.h1`
  align-self: center;
  color: var(--vulcan);
  font-weight: 500;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-xxl);
  letter-spacing: 1px;
  font-style: normal;
  margin-bottom: 50px;
`;

export default Agreement;