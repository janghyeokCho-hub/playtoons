import React, { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import Timer from "@COMPONENTS/Timer";
import moment from "moment";

import { verifyCheck } from "@/services/accountService";

/**
 * 인증 번호 입력 폼
 * @param {*} param0
 * @returns
 */
const CheckVerify = ({ email, expireOn }) => {
  const navigate = useNavigate();
  const countTime = moment(expireOn).diff(moment(), "seconds");
  const [code, setCode] = useState(null);

  const handleVerifyCheck = useCallback(async () => {
    // navigate("/account/agreement")
    console.log("code : ", code);
    const { status, data } = await verifyCheck({ code: code });

    console.log(status, data);
    if (status === 200) {
      // Success
      navigate("/account/agreement", { state: { code: "user" } });
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
  }, [code, navigate]);
  return (
    <>
      <VerifyTitle>パスワードを再設定</VerifyTitle>
      <VerifyContent color="--violet-blue">{email}</VerifyContent>
      <VerifyContent color="--bright-gray">
        宛に認証用メールを送信しました。
      </VerifyContent>

      <VerifyInputDiv marginBottom="10px" marginTop="40px">
        <Input
          inputType="text"
          label="認証コード"
          width="100%"
          callback={({ nativeEvent }) => setCode(nativeEvent?.target?.value)}
        />
        <Timer countSec={countTime} />
      </VerifyInputDiv>
      <Button
        text="確認する"
        color="--white"
        bgColor="--violet-blue"
        width="100%"
        marginBottom="15px"
        callback={() => handleVerifyCheck()}
      />
      <Button
        text="戻る"
        color="--violet-blue"
        bgColor="--white"
        bdColor="--violet-blue"
        width="100%"
        marginBottom="15px"
        callback={() => navigate(-1)}
      />
    </>
  );
};

const VerifyCheck = () => {
  const { state } = useLocation();
  const { email, expireOn } = state;
  console.log(email, expireOn);
  return (
    <AccountBoxDiv>
      <CheckVerify email={email} expireOn={expireOn} />
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
  width: 100%;
  align-self: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
`;

export default VerifyCheck;
