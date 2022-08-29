import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Border1pxGhost, Body6, Body3, Border1pxTiara } from "@/styledMixins";
import { agreementEula } from "@/services/accountService";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Button from "@COMPONENTS/Button";

const AgreementMobile = () => {
  const { state } = useLocation();
  const code = state?.code || "user";

  const [eulaContent, setEulaContent] = useState(null);

  const markdownTxt = `
  # 마크다운 테스트
  ## MarkdownPreview
  
  ## Header 2
  
  ### Header 3
  A paragraph with *emphasis* and **strong importance**.
  
  > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |
  `;

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
      <AgreementContextDiv>
        <MarkdownPreview source={markdownTxt} />
      </AgreementContextDiv>
      <CheckboxGroupDiv>
        <CheckboxInput type="checkbox" />
        <CheckboxLabel>利用規約に同意します。</CheckboxLabel>
      </CheckboxGroupDiv>
      <Button
        text="同意する"
        color="--white"
        bgColor="--violet-blue"
        width="100%"
      ></Button>
    </AccountBoxDiv>
  );
};

const AccountBoxDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
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

const AgreementContextDiv = styled.div`
  ${Body6}
  padding: 1em;
  width: 100%;
  height: 480px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    padding-left: 30px;
    background-color: var(--mercury);
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--manatee);
    border-radius: 10px;
  }
`;

const CheckboxGroupDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const CheckboxInput = styled.input`
  ${Border1pxTiara}
  width: 24px;
  height: 24px;
  border-radius: 2px;
`;

const CheckboxLabel = styled.div`
  ${Body3}
  color: var(--vulcan);
  white-space: nowrap;
  margin-left: 1em;
`;

export default AgreementMobile;
