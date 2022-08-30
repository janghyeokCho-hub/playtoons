import React, { useState } from "react";
import styled from "styled-components";
import { NotosansjpBoldCharade42px, Title3 } from "@/styledMixins";
import landingPageImg from "@IMAGES/landingpage-img.jpg";

const LandingPage = () => {
  const [isAlertShow, setIsAlertShow] = useState(false);

  return (
    <LandingPageDiv>
      {isAlertShow && <AlertDiv />}
      <FirstDiv>
        <FirstContentDiv>
          <FirstContentLeftTitle>
            あなたの好きなことが見つかる。
          </FirstContentLeftTitle>
          <FirstContentLeftContext>
            PlayToons「プレイトゥーンズ」は、
            <br />
            クリエイターと支援者を繋ぐコミュニティです。
            <br />
            イラスト、ウェブトゥーン、小説など、
            <br />
            数えきれない作品をご覧にいただけます。
          </FirstContentLeftContext>
          <StartBtn>
            <StartBtnText>はじめる</StartBtnText>
          </StartBtn>
        </FirstContentDiv>
        <FirstImage src={landingPageImg} />
      </FirstDiv>
    </LandingPageDiv>
  );
};

const LandingPageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AlertDiv = styled.div`
  width: 100vw;
  height: 100px;
`;

const FirstDiv = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  padding: 0 2em;
  background-color: var(--white);
  justify-content: center;
`;

const FirstContentDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FirstContentLeftTitle = styled.h1`
  ${NotosansjpBoldCharade42px}
  text-align: center;
  letter-spacing: 2.8px;
  line-height: 61px;
  white-space: nowrap;
`;

const FirstContentLeftContext = styled.h1`
  margin-top: 1em;
  margin-bottom: 2em;
  font-family: var(--font-family-noto_sans_jp);
  font-weight: 400;
  color: var(--nevada);
  font-size: var(--font-size-xxl);
  text-align: center;
  letter-spacing: 1.6px;
  line-height: 35px;
`;

const FirstImage = styled.img``;
const StartBtn = styled.div`
  margin-top: 3em;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 225px;
  background-color: var(--violet-blue);
  border-radius: 30px;
  box-shadow: 0px 6px 20px #394bc280;
`;

const StartBtnText = styled.h1`
  ${Title3}
  width: 100%;
  cursor: pointer;
  min-height: 28px;
  font-weight: 500;
  color: var(--white);
  text-align: center;
  line-height: 28px;
  white-space: nowrap;
`;

export default LandingPage;
