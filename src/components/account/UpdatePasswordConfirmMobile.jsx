import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { recoverConfirm } from "@/services/accountService";

const UpdatePasswordConfirmMobile = () => {
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
        code: code,
      });
      console.log(response);
    }
  }, [newPwd, newPwdCheck, code]);

  return (
    <AccountBoxDiv>
      <UpdatePasswordConfirmTitle>パスワードの変更</UpdatePasswordConfirmTitle>

      <UpdatePasswordConfirmContent color="--bright-gray">
        新しいパスワードを入力してください。
      </UpdatePasswordConfirmContent>

      <UpdatePasswordConfirmInputDiv marginBottom="10px" marginTop="40px">
        <Input
          inputType="password"
          label="パスワード"
          width="100%"
          callback={handleNewPwdChage}
        />
        <Input
          inputType="password"
          label="パスワード確認"
          width="100%"
          callback={handleNewPwdCheckChage}
        />
      </UpdatePasswordConfirmInputDiv>
      <Button
        text=">パスワード変更"
        color="--white"
        bgColor="--violet-blue"
        width="100%"
        marginTop="10px"
        marginBottom="10px"
        callback={() => handlePwdConfirm()}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width="100%"
        marginBottom="10px"
      />
    </AccountBoxDiv>
  );
};

const AccountBoxDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
  align-items: center;
`;

const UpdatePasswordConfirmTitle = styled.h1`
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

const UpdatePasswordConfirmContent = styled.div`
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

const UpdatePasswordConfirmInputDiv = styled.div`
  width: 100%;
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default UpdatePasswordConfirmMobile;
