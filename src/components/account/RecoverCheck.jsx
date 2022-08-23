import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import Timer from "@COMPONENTS/Timer";

import { recoverCheck } from "@/services/accountService";
import moment from "moment";

const RecoverCheck = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, expireOn } = state;
  const [code, setCode] = useState(null);
  const countTime = moment(expireOn).diff(moment(), "seconds");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRecoverCheck = useCallback(async () => {
    const { status } = await recoverCheck({ email: email });
    console.log("status : ", status);
    if (status === 200) {
      // Success
      navigate("/account/recover-confirm", {
        state: { code: code },
      });
    } else if (status === 400) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 404) {
      // 코드 참조
      alert("코드 참조");
    } else if (status === 503) {
      // 코드 참조
      alert("코드 참조");
    }
  }, [email, code, navigate]);

  return (
    <AccountBoxDiv>
      <RecoverTitle>パスワードを再設定</RecoverTitle>
      <RecoverContent color="--violet-blue">{email}</RecoverContent>
      <RecoverContent color="--bright-gray">
        宛に認証用メールを送信しました。
      </RecoverContent>

      <RecoverInputDiv marginBottom="10px" marginTop="40px">
        <Input
          inputType="text"
          label="認証コード"
          callback={handleCodeChange}
        />
        <Timer countSec={countTime || 180} />
      </RecoverInputDiv>
      <Button
        text="確認する"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
        callback={() => handleRecoverCheck()}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => navigate(-1)}
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

export default RecoverCheck;
