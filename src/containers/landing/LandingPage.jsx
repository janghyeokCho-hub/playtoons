import React, { useState } from "react";
import styled from "styled-components";
import {
  NotosansjpBoldCharade42px,
  Title3,
  ApplecoloremojiNormalVulcan32px,
} from "@/styledMixins";
import landingPageImg from "@IMAGES/landingpage-img.jpg";
import Card from "@COMPONENTS/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-light-svg-icons";

const LandingPage = () => {
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardData1 = [
    {
      imgSrc: require("@IMAGES/landingpage-hot1.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "シェルターアーク",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-hot2.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "ファンタジー放…",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-hot3.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "ポリアモリー",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-hot4.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "最弱の魔法の総…",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-hot5.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "阿修羅ゲート",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-hot6.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "シェルターアーク",
      studio: "Studio reBorn・43話",
    },
  ];

  const cardData2 = [
    {
      imgSrc: require("@IMAGES/landingpage-new1.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "シェルターアーク",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-new2.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "ファンタジー放…",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-new3.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "ポリアモリー",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-new4.jpg"),
      like: 1200,
      category: "ウェブ小説",
      title: "最弱の魔法の総…",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-new5.png"),
      like: 1200,
      category: "ウェブ小説",
      title: "阿修羅ゲート",
      studio: "Studio reBorn・43話",
    },
    {
      imgSrc: require("@IMAGES/landingpage-new6.jpg"),
      like: 1200,
      category: "ウェブ小説",
      title: "シェルターアーク",
      studio: "Studio reBorn・43話",
    },
  ];

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
      <ContentDiv>
        <ContentTitleDiv>🔥人気</ContentTitleDiv>
        <HotDiv>
          {cardData1.map((data, index) => (
            <Card
              key={index}
              imgSrc={data.imgSrc}
              like={data.like}
              category={data.category}
              title={data.title}
              studio={data.studio}
            />
          ))}
        </HotDiv>
      </ContentDiv>
      <ContentDiv>
        <ContentTitleDiv>⚡最新</ContentTitleDiv>
        <HotDiv>
          {cardData2.map((data, index) => (
            <Card
              key={index}
              imgSrc={data.imgSrc}
              like={data.like}
              category={data.category}
              title={data.title}
              studio={data.studio}
            />
          ))}
        </HotDiv>
      </ContentDiv>
    </LandingPageDiv>
  );
};

const LandingPageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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

const ContentDiv = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`;

const ContentTitleDiv = styled.div`
  ${ApplecoloremojiNormalVulcan32px}
  align-self: flex-start;
  min-height: 36px;
  letter-spacing: 1px;
  line-height: 36px;
  white-space: nowrap;
`;

const HotDiv = styled.div`
  width: 1250px;
  height: auto;
  display: flex;
  flex: none;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
`;

const SliderDiv = styled.div`
  position: absolute;
  height: 50px;
  display: flex;
  padding: 11px 17px;
  align-items: flex-start;
  min-width: 50px;
  background-color: var(--white);
  border-radius: 50px;
  box-shadow: 0px 1px 5px #00000080;

  top: 50%;
  left: 97%;
  transform: translate(-50%, -97%);
`;

const SliderBtnDiv = styled.div`
  width: 15px;
  height: 27px;
  background-size: 100% 100%;
`;

export default LandingPage;
