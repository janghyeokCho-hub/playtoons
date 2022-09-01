import React, { useState } from "react";
import styled from "styled-components";
import {
  NotosansjpBoldCharade42px,
  Title3,
  ApplecoloremojiNormalVulcan32px,
} from "@/styledMixins";
import landingPageImg from "@IMAGES/landingpage-img.jpg";
import HotToonList from "@COMPONENTS/landingpage/HotToonList";
import NewToonList from "@COMPONENTS/landingpage/NewToonList";
import ProducerList from "@COMPONENTS/landingpage/ProducerList";
import CategoryList from "@COMPONENTS/landingpage/CategoryList";
import RecommendedWebtoonList from "@COMPONENTS/landingpage/RecommendedWebtoonList";
import RecommendedWebNovelsList from "@COMPONENTS/landingpage/RecommendedWebNovelsList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-light-svg-icons";

const LandingPage = () => {
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hotToonsData = [
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

  const newToonsData = [
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

  const producerData = [
    {
      bgImgSrc: require("@IMAGES/accountrecoverconfirm.jpg"),
      profileImgSrc: require("@IMAGES/landingpage-profile1.png"),
      alias: "名前のない人間",
      intro:
        "はみんぐです。アニメーター、\nイラスト、MV制作🥀🥀 音楽、\nファッション、夜と光の絵…",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg2.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile2.png"),
      alias: "七語つきみ@TFO7",
      intro:
        "はみんぐです。アニメーター、\nイラスト、MV制作🥀🥀 音楽、\nファッション、夜と光の絵…",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg3.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile3.png"),
      alias: "名前のない人間",
      intro: "Yoneyama Mai - Illustrator,\nAnimator SSS by applibot所属",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg4.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile4.png"),
      alias: "名前のない人間",
      intro: "Yoneyama Mai - Illustrator,\nAnimator SSS by applibot所属",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg5.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile5.png"),
      alias: "名前のない人間",
      intro:
        "はみんぐです。アニメーター、\nイラスト、MV制作🥀🥀 音楽、\nファッション、夜と光の絵…",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg6.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile6.png"),
      alias: "名前のない人間",
      intro:
        "はみんぐです。アニメーター、\nイラスト、MV制作🥀🥀 音楽、\nファッション、夜と光の絵…",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg7.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile7.png"),
      alias: "名前のない人間",
      intro:
        "ゲームしたりジム行ったり絵描いた\nり気ままに過ごす北海道住みの\n社会人。アイコンや動画用…",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-profile-bgImg8.png"),
      profileImgSrc: require("@IMAGES/landingpage-profile8.png"),
      alias: "名前のない人間",
      intro:
        "はみんぐです。アニメーター、\nイラスト、MV制作🥀🥀 音楽、\nファッション、夜と光の絵…",
    },
  ];

  const categoryData = [
    {
      bgImgSrc: require("@IMAGES/landingpage-category1.png"),
      bgColor: "--governor-bay",
      name: "アート",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-category2.png"),
      bgColor: "--violet-blue",
      name: "素材",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-category3.png"),
      bgColor: "--bright-gray",
      name: "3Dアセット",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-category4.png"),
      bgColor: "--apple",
      name: "ウェブトゥーン",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-category5.png"),
      bgColor: "--indigo",
      name: "背景",
    },
    {
      bgImgSrc: require("@IMAGES/landingpage-category6.png"),
      bgColor: "--deep-space-sparkle",
      name: "小説",
    },
  ];

  const recommendedWebtoonData = [
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

  const recommendedWebNovelsData = [
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

      <HotToonList list={hotToonsData} />
      <NewToonList list={newToonsData} />
      <ProducerList list={producerData} />
      <CategoryList list={categoryData} />
      <RecommendedWebtoonList list={recommendedWebtoonData} />
      <RecommendedWebNovelsList list={recommendedWebNovelsData} />
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
