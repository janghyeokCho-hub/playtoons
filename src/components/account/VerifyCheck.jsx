import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import Timer from "@COMPONENTS/Timer";

/**
 * 인증 번호 입력 폼
 * @param {*} param0
 * @returns
 */
const CheckVerify = ({ setIsShowType, email }) => {
  const navigate = useNavigate();
  return (
    <>
      <VerifyTitle>パスワードを再設定</VerifyTitle>
      <VerifyContent color="--violet-blue">{email}</VerifyContent>
      <VerifyContent color="--bright-gray">
        宛に認証用メールを送信しました。
      </VerifyContent>

      <VerifyInputDiv marginBottom="10px" marginTop="40px">
        <Input inputType="text" label="認証コード" />
        <Timer />
      </VerifyInputDiv>
      <Button
        text="確認する"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => navigate("/account/agreement")}
        borderRadius={20}
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
    </>
  );
};

const VerifyCheck = ({ email, expireOn }) => {
  console.log(email, expireOn);
  return (
    <AccountBoxDiv>
      <CheckVerify email={email} />
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

const VerifyTitle = styled.h1`
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

const VerifyContent = styled.div`
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

const VerifyInputDiv = styled.div`
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default VerifyCheck;
