import React from "react";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";

const Recovery = ({ handleAccountType }) => {
  //handleAccountType("LOGIN")
  return (
    <AccountBoxDiv>
      <RecoveryTitle>パスワードを再設定</RecoveryTitle>
      <RecoveryContent>ログインIDとして使用中の</RecoveryContent>
      <RecoveryContent>メールアドレスを入力してください。</RecoveryContent>
      <RecoveryInputDiv>
        <Input inputType="text" label="メールアドレス" />
      </RecoveryInputDiv>
      <Button text="次へ" color="--white" bgColor="--violet-blue" />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        callback={() => handleAccountType("LOGIN")}
      />
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

const RecoveryTitle = styled.h1`
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

const RecoveryContent = styled.div`
  align-self: center;
  color: var(--bright-gray);
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-m);
  letter-spacing: 1px;
  font-style: normal;
  margin-bottom: 10px;
`;

const RecoveryInputDiv = styled.div`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default Recovery;
