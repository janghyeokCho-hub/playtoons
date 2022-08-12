import React from "react";
import styled from "styled-components";
import { Body6, Border1pxGhost, Body3 } from "@/styledMixins";
import imgLogo from "@IMAGES/logo.png";
import line from "@IMAGES/lines/authlogin-line-txt.png";
import autoLoginLineRight from "@IMAGES/authlogin-line-right.png";

import Group2 from "@COMPONENTS/Group2";
import Group26 from "@COMPONENTS/Group26";
import LoginBtn from "@COMPONENTS/LoginBtn";
import LoginInput from "@COMPONENTS/LoginInput";

const Login = () => {
  return (
    <div className="container-center-horizontal">
      <div className="authlogin screen">
        <GroupContainer>
          <Group2 />
          <Group>
            <ImgLogo src={imgLogo} />
            <LoginInput inputType="text" />
            <LoginInput inputType="password" />
            <Group26 line={line} className="group-2-22" />
            <LoginBtn snsText="確認する" className="login_btn_default" />
            <Group4>
              <LineLeft src={autoLoginLineRight} />
              <Txt>または</Txt>
              <LineRight src={autoLoginLineRight} />
            </Group4>
            <LoginBtn
              snsType="google"
              snsText="Googleで続行"
              className="login_btn_google"
            />
            <LoginBtn
              snsType="twitter"
              snsText="Tiwtterで続行"
              className="login_btn_twitter"
            />
            <LoginBtn
              snsType="apple"
              snsText="Appleで続行"
              className="login_btn_apple"
            />

            <Group6>
              <TextLabel>アカウントをお持ちでないですか</TextLabel>
              <TextLabel1>登録する</TextLabel1>
            </Group6>
            <TextLabel2>プライバシーポリシー</TextLabel2>
          </Group>
        </GroupContainer>
      </div>
    </div>
  );
};

const GroupContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Group = styled.div`
  ${Border1pxGhost}
  position: absolute;
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: 39px;
  align-items: flex-start;
  min-height: 760px;
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
  width: 234px;
  min-height: 16px;
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const TextLabel1 = styled.div`
  min-height: 16px;
  margin-left: 3px;
  color: var(--violet-blue);
  line-height: 16px;
  white-space: nowrap;
`;

const TextLabel2 = styled.div`
  ${Body3}
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
