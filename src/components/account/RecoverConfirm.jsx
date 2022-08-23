import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { recoverConfirm } from "@/services/accountService";

const RecoverConfirm = () => {
  const { state } = useLocation();
  const code = state?.code;
  const [newPwd, setNewPwd] = useState(null);
  const [newPwdCheck, setNewPwdCheck] = useState(null);

  const handleNewPwdChage = (e) => {
    setNewPwd(e.target.value);
  };
  const handleNewPwdCheckChage = (e) => {
    setNewPwdCheck(e.target.value);
  };

  const handlePwdConfirm = useCallback(async () => {
    if (newPwd === newPwdCheck) {
      const response = await recoverConfirm({
        password: newPwd,
        code: "wd9ebilugu",
      });
      console.log(response);
    }
  }, [newPwd, newPwdCheck, code]);

  return (
    <AccountBoxDiv>
      <RecoverTitle>パスワードを再設定</RecoverTitle>

      <RecoverContent color="--bright-gray">
        ログインIDとして使用中の
      </RecoverContent>
      <RecoverContent color="--bright-gray">
        メールアドレスを入力してください。
      </RecoverContent>

      <RecoverInputDiv marginBottom="10px" marginTop="40px">
        <Input
          inputType="password"
          label="パスワード"
          callback={handleNewPwdChage}
        />
        <Input
          inputType="password"
          label="パスワード確認"
          callback={handleNewPwdCheckChage}
        />
      </RecoverInputDiv>
      <Button
        text=">パスワード変更"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
        callback={() => handlePwdConfirm()}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
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

const RecoverTitle = styled.h1`
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

const RecoverContent = styled.div`
  align-self: center;
  color: var(${(props) => props.color});
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-m);
  letter-spacing: 1px;
  font-style: normal;
  margin-bottom: 10px;
`;

const RecoverInputDiv = styled.div`
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default RecoverConfirm;
