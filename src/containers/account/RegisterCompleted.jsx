import React from "react";
import styled from "styled-components";
import {
  Headline1Style,
  Title1,
  Title3,
  NotosansjpBoldCharade42px,
} from "@/styledMixins";
import secondImgSrc from "@IMAGES/register2.png";

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

export default RegisterCompleted;
