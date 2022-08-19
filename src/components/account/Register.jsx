import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Border1pxGhost } from "@/styledMixins";
import Input from "@COMPONENTS/Input";
import Button from "@COMPONENTS/Button";
import { createRegisterUser } from "@/services/accountService";

const Register = ({ handleAccountType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [referralCode, setReferralCode] = useState(null);
  const [eulaVersion, setEulaVersion] = useState(null);
  const [privacyVersion, setPrivacyVersion] = useState(null);

  useEffect(() => {
    if (!!password && !!passwordConfirm) {
      // 패스워드에 값이 있고 패스워드 확인의 값이 있을 경우 둘의 값이 같은지 확인
    }
  }, [password, passwordConfirm]);

  // Register action
  const handleRegister = useCallback(async () => {
    const params = {
      email,
      password,
      referralCode,
      eulaVersion,
      privacyVersion,
    };
    console.log(params);
    const { status, data } = await createRegisterUser(params);
    if (status === 201) {
      // Create Success
      navigate("/account/verify-check", { email, expireOn: data.expireOn });
    } else if (status === 400) {
      // 파라미터 검증 실패
    } else if (status === 403) {
      // 사용이 제한된 이메일 주소
    } else if (status === 409) {
      // 중복된 메일일 경우
    } else if (status === 503) {
      // 코드 참조
    }

    // 회원 가입 입력 폼 조건 충족시 이메일 인증으로 이동
    // window.location.href = "/register-completed";
  }, [email, password, referralCode, eulaVersion, privacyVersion]);

  return (
    <AccountBoxDiv>
      <RegisterTitle>会員登録</RegisterTitle>
      <RegisterInputDiv>
        <Input
          inputType="text"
          label="メールアドレス"
          callback={({ nativeEvent }) => setEmail(nativeEvent?.target?.value)}
        />
        <Input
          inputType="password"
          label="パスワード"
          callback={({ nativeEvent }) =>
            setPassword(nativeEvent?.target?.value)
          }
        />
        <Input
          inputType="password"
          label="パスワード確認"
          callback={({ nativeEvent }) =>
            setPasswordConfirm(nativeEvent?.target?.value)
          }
        />
        <Input
          inputType="text"
          label="紹介コード"
          callback={({ nativeEvent }) =>
            setReferralCode(nativeEvent?.target?.value)
          }
        />
      </RegisterInputDiv>
      <Button
        text="次へ"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => handleRegister()}
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
        callback={() => handleAccountType("LOGIN")}
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

const RegisterTitle = styled.h1`
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

const RegisterInputDiv = styled.div`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default Register;
