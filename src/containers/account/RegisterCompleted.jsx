import React from "react";
import styled from "styled-components";
import { Headline1Style, Title1, Title3 } from "@/styledMixins";
import Button from "@COMPONENTS/Button";

const RegisterCompleted = () => {
  return (
    <FirstContainer>
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
    </FirstContainer>
  );
};

// rectangle
const FirstContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const FirstDiv = styled.div`
  width: 1920px;
  height: 1080px;
  background-image: url(${(props) => props.imgSrc});
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

export default RegisterCompleted;
