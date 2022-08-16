import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Body6, Border1pxGhost, Body3 } from "@/styledMixins";
import imgLogo from "@IMAGES/logo.png";
import autoLoginLineRight from "@IMAGES/authlogin-line-right.png";
import recoveryLine from "@IMAGES/lines/authlogin-line-txt.png";

import Button from "@COMPONENTS/Button";
import Input from "@COMPONENTS/Input";
import { login } from "@/services/userService";

const Login = ({ handleAccountType }) => {
  const [errorShow, setErrorShow] = useState(false);

  const handleLogin = useCallback(() => {
    const params = {
      email: "jh.cho@raonworks.co.kr",
      password: "1234",
    };
    login(params);
  }, []);
  return (
    <AccountBoxDiv>
      <ImgLogo src={imgLogo} />
      {errorShow && <ErrorBoxDiv />}
      <Input inputType="text" label="メールアドレス" />
      <Input inputType="password" label="パスワード" />

      <RecoveryDiv
        className="group-2-21 group-2-22"
        onClick={() => {
          handleAccountType("RECOVERY");
        }}
      >
        <RecoverLabel className="text_label-220" color="--violet-blue">
          パスワードをお忘れですか?
        </RecoverLabel>
        <Line className="line-8" src={recoveryLine} />
      </RecoveryDiv>
      <Button
        text="確認する"
        className="login_btn_default"
        color="--white"
        bgColor="--violet-blue"
        width={400}
        height={40}
        marginBottom={15}
        callback={() => handleLogin()}
        borderRadius={20}
      />
      <Group4>
        <LineLeft src={autoLoginLineRight} />
        <Txt>または</Txt>
        <LineRight src={autoLoginLineRight} />
      </Group4>
      <Button
        text="Googleで続行"
        snsType="GOOGLE"
        className="login_btn_google"
        color="--vlucan"
        bgColor="--white"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
      />
      <Button
        text="Tiwtterで続行"
        snsType="TWITTER"
        className="login_btn_twitter"
        color="--vlucan"
        bgColor="--white"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
      />
      <Button
        text="Appleで続行"
        snsType="APPLE"
        className="login_btn_apple"
        color="--white"
        bgColor="--black"
        width={400}
        height={40}
        marginBottom={15}
        borderRadius={20}
      />

      <Group6>
        <TextLabel color="--vulcan">アカウントをお持ちでないですか</TextLabel>
        <TextLabel1
          onClick={() => {
            handleAccountType("REGISTER");
          }}
        >
          登録する
        </TextLabel1>
      </Group6>
      <TextLabel2>プライバシーポリシー</TextLabel2>
    </AccountBoxDiv>
  );
};

const ErrorBoxDiv = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid red;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const RecoveryDiv = styled.div`
  cursor: pointer;
  align-self: flex-end;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 18px;

  &.group-2-21.group-2-22 {
    margin-right: 2px;
    min-height: 19px;
  }

  &.group-2-21.group-2-23 {
    margin-right: 16px;
  }
`;

const Line = styled.img`
  width: 190px;
  height: 3px;
  margin-left: -0.5px;
`;

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

const ImgLogo = styled.img`
  width: 230px;
  height: 37px;
  align-self: center;
  margin-bottom: 39px;
`;

const Group4 = styled.div`
  height: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 399px;
`;

const LineLeft = styled.img`
  width: 170px;
  height: 2px;
  margin-top: 4px;
`;

const Txt = styled.div`
  ${Body6}
  width: 48px;
  min-height: 16px;
  margin-left: 7px;
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const LineRight = styled.img`
  width: 170px;
  height: 2px;
  margin-left: 6px;
  margin-top: 4px;
`;

const Group6 = styled.div`
  ${Body6}
  height: 16px;
  align-self: center;
  margin-top: 32px;
  margin-right: 1px;
  display: flex;
  align-items: flex-start;
  min-width: 301px;
`;

const TextLabel = styled.div`
  min-height: 16px;
  color: var(${(props) => props.color});
  line-height: 16px;
  white-space: nowrap;
`;

const RecoverLabel = styled(TextLabel)`
  ${Body6}
`;

const TextLabel1 = styled.div`
  cursor: pointer;
  min-height: 16px;
  margin-left: 3px;
  color: var(--violet-blue);
  line-height: 16px;
  white-space: nowrap;
`;

const TextLabel2 = styled.div`
  ${Body3}
  cursor: pointer;
  width: 173px;
  min-height: 20px;
  align-self: center;
  margin-top: 32px;
  margin-right: 1px;
  color: var(--manatee);
  line-height: 20px;
  white-space: nowrap;
`;

export default Login;
