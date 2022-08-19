import React from "react";
import styled from "styled-components";
import {
  Headline1Style,
  Title1,
  Title3,
  NotosansjpBoldCharade42px,
  Border1pxTiara,
  Body3,
  Title2,
} from "@/styledMixins";
import secondImgSrc from "@IMAGES/register2.png";
import registerGroupImg1 from "@IMAGES/registerGroupImg1.png";
import registerGroupImg2 from "@IMAGES/registerGroupImg2.png";
import registerGroupImg3 from "@IMAGES/registerGroupImg3.png";

const RegisterCompleted = () => {
  return (
    <Container>
      <FirstDiv imgSrc={require("@IMAGES/rectangle.jpg")}>
        <FirstContentDiv>
          <FirstTitleH1>誰でも感じられる創作の楽しさ</FirstTitleH1>
          <FirstContextH1>
            クリエイターになって自分の作品を
            <br />
            世界に広め、収益を得よう！
          </FirstContextH1>
          <BecomeCreatorDiv>
            <BecomeCreatorH1>クリエイターになる</BecomeCreatorH1>
          </BecomeCreatorDiv>
        </FirstContentDiv>
      </FirstDiv>
      <SecondDiv>
        <SecondContentDiv>
          <SecondTitleH1>コンテンツで繋ぐ</SecondTitleH1>
          <SecondContextH1>
            あなたが好きなファンのための
            <br />
            専用コンテンツを製作してシェアでき、
            <br />
            ファンともっと緊密にコミュニケーションする
            <br />
            ことができます。国境を越えて、
            <br />
            あなたのコンテンツがユーザーとつながる
            <br />
            素晴らしい経験を体験してみてください！
          </SecondContextH1>
        </SecondContentDiv>
        <SecondImage src={secondImgSrc} />
      </SecondDiv>
      <ThirdDiv>
        <ThirdContentDiv>
          <ThirdTitleH1>収益を得る活動</ThirdTitleH1>
          <ThirdContextDiv>
            <ThirdGroup>
              <GroupImageDiv imgSrc={require("@IMAGES/rectangle-copy-3.png")}>
                <GroupImage src={registerGroupImg1} />
              </GroupImageDiv>
              <GroupContentDiv>
                <GroupTitleDiv>投稿</GroupTitleDiv>
                <GroupContextDiv>
                  ウェブトゥーン、ウェブ小説、写真集など
                  <br />
                  様々な分野のコンテンツを
                  <br />
                  有料でアップできます。
                </GroupContextDiv>
              </GroupContentDiv>
            </ThirdGroup>
            <ThirdGroup>
              <GroupImageDiv imgSrc={require("@IMAGES/rectangle-copy-3.png")}>
                <GroupImage src={registerGroupImg2} />
              </GroupImageDiv>
              <GroupContentDiv>
                <GroupTitleDiv>支援</GroupTitleDiv>
                <GroupContextDiv>
                  「支援」という機能で、
                  <br />
                  ファンにコンテンツを限定的に
                  <br />
                  提供することができます。
                </GroupContextDiv>
              </GroupContentDiv>
            </ThirdGroup>
            <ThirdGroup>
              <GroupImageDiv imgSrc={require("@IMAGES/rectangle-copy-3.png")}>
                <GroupImage src={registerGroupImg3} />
              </GroupImageDiv>
              <GroupContentDiv>
                <GroupTitleDiv>マケットに登録</GroupTitleDiv>
                <GroupContextDiv>
                  ウェブトゥーンクリエイターのための
                  <br />
                  3Dアセット、企業向けAPI、ePubなどを
                  <br />
                  販売することができます。
                </GroupContextDiv>
              </GroupContentDiv>
            </ThirdGroup>
          </ThirdContextDiv>
        </ThirdContentDiv>
      </ThirdDiv>
    </Container>
  );
};

// rectangle
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const FirstDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.imgSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const FirstContentDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FirstTitleH1 = styled.h1`
  ${Headline1Style}
  color: var(--vulcan);
  line-height: 56px;
  white-space: nowrap;
`;

const FirstContextH1 = styled.h1`
  ${Title1}
  color: var(--nevada);
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const BecomeCreatorDiv = styled.div`
  cursor: pointer;
  height: 60px;
  display: flex;
  align-items: center;
  min-width: 349px;
  background-color: var(--violet-blue);
  border-radius: 30px;
  box-shadow: 0px 6px 20px #394bc280;
`;

const BecomeCreatorH1 = styled.h1`
  ${Title3}
  color: var(--white);
  line-height: 28px;
  white-space: nowrap;
  width: 100%;
  text-align: center;
`;

const SecondDiv = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const SecondContentDiv = styled.div`
  flex-direction: column;
`;

const SecondTitleH1 = styled.h1`
  ${NotosansjpBoldCharade42px}
  letter-spacing: 2.8px;
  white-space: nowrap;
  margin-bottom: 40px;
`;

const SecondContextH1 = styled.h1`
  ${Title3}
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
`;

const SecondImage = styled.img`
  margin-left: 150px;
  max-height: 600px;
`;

const ThirdDiv = styled.div`
  width: 100%;
  height: 800px;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: var(--selago);
`;

const ThirdContentDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-around;
`;

const ThirdTitleH1 = styled.div`
  ${NotosansjpBoldCharade42px}
  text-align: center;
  letter-spacing: 2.8px;
  line-height: 61px;
  white-space: nowrap;
`;

const ThirdContextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ThirdGroup = styled.div`
  ${Border1pxTiara}
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 452px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0px 6px 10px #00000029;
  margin-left: 15px;
  margin-right: 15px;
`;

const GroupImageDiv = styled.div`
  width: 380px;
  height: 250px;
  position: relative;
  background-image: url(${(props) => props.imgSrc});
  background-size: 100% 100%;
  background-color: var(--mercury);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GroupImage = styled.img`
  width: 210px;
  height: 176px;
`;

const GroupContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  position: relative;
  height: 200px;
  justify-content: space-evenly;
`;

const GroupTitleDiv = styled.div`
  ${Title2}
  min-height: 32px;
  font-weight: 700;
  color: var(--bright-gray);
  line-height: 32px;
  white-space: nowrap;
`;

const GroupContextDiv = styled.div`
  ${Body3}
  min-height: 70px;
  min-width: 317px;
  color: var(--nevada);
  text-align: center;
  line-height: 20px;
`;

export default RegisterCompleted;
