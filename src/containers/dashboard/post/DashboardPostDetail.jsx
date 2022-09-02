import React, { useEffect, useState } from "react";
import {
  Body1,
  NotosansjpNormalGunsmoke17px,
  NotosansjpBoldBlack16px,
} from "@/styledMixins";
import styled from "styled-components";

import BrowserContainer from "@COMPONENTS/dashboard/BrowserContainer";
import ButtonOutline from "@COMPONENTS/dashboard/ButtonOutline";
import ButtonDefault from "@COMPONENTS/dashboard/ButtonDefault";

import iconView from "@ICONS/icon_view_gray01.png";
import iconHeart from "@ICONS/icon_heart_gray02.png";
import iconComent from "@ICONS/icon_coment_gray01.png";

const text = {
  page_title: "投稿詳細",
  name: "シリーズ名",
  title: "タイトル",
  episode_count: "話数",
  public_date: "公開日",
  end_date: "終了日",
  status: "状態",
  reaction_management: "リアクション管理",
  modify: "修正する",
  register: "登録",
  good: "いいね",
  coment: "コメント",
  fix: "固定",
  report: "通報",
  delete: "削除",
  icon: "アイコン",
};

const tempData = {
  name: "シェルターアーク",
  title: "終わらない話",
  episode_count: "541話",
  public_date: "2022/06/07",
  end_date: "2022/06/07",
  status: "公開中",
  view_count: "1.2k",
  good_count: "1.2k",
  coment_count: "966",
  content_title: "シェルターアーク 2話",
  content_date: "2022.06.10",
  content_summary: (
    <React.Fragment>
      モと戦う為、特殊チームレンジャーを創設したが、
      <br />
      クモの圧倒的な力には勝てず。
    </React.Fragment>
  ),
  content_image:
    "/img/dashboardpostdetail-rectangle-3F15B08E-F381-4DB5-9F3D-63F6E781FDA3.jpg",
  content_next_summary:
    "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",

  my_icon_image:
    "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
};

const tempReactions = [
  {
    id: "12",
    profile:
      "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment:
      "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    good_count: "123",
  },
  {
    id: "15",
    profile:
      "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment:
      "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    good_count: "123",
  },
];

export default function DashboardPostDetail() {
  const [reactionList, setReactionList] = useState([]);
  const [data, setData] = useState({
    name: "",
    title: "",
    episode_count: "",
    public_date: "",
    end_date: "",
    status: "",
    view_count: "",
    good_count: "",
    coment_count: "",
    content_title: "",
    content_date: "",
    content_summary: "",
    content_image:"",
    content_next_summary:"",
    my_icon_image:"",
  });

  const handleReactionClick = (e) => {
    let type = e.target.innerText;
    let id = e.target.getAttribute("data-id");

    if (text.fix === type) {
      console.log("type Click", type, id);
    } else if (text.good === type) {
      console.log("good Click", type, id);
    } else if (text.coment === type) {
      console.log("coment Click", type, id);
    } else if (text.report === type) {
      console.log("report Click", type, id);
    } else if (text.delete === type) {
      console.log("delete Click", type, id);
    }
  };

  const getReactionList = (resultList) => {
    return resultList.map((item, index) => {
      return (
        <RactionFlexContainer key={index}>
          <ReactionListProfile src={item.profile} />
          <VerticalContainer>
            <FlexContainer>
              <ReactionListName>{item.name}</ReactionListName>
              <IconReactionHeart />
              <ReactionGoodCountr>{item.good_count}</ReactionGoodCountr>
            </FlexContainer>
            <ReactionListComent>{item.coment}</ReactionListComent>
            <FlexContainer>
              <ButtonOutline
                height={"40px"}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"71px"}
                text={text.fix}
                dataId={item.id}
                marginLeft={"auto"}
                handleClick={handleReactionClick}
              />
              <ButtonOutline
                height={"40px"}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"86px"}
                text={text.good}
                dataId={item.id}
                handleClick={handleReactionClick}
              />
              <ButtonOutline
                height={"40px"}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"102px"}
                text={text.coment}
                dataId={item.id}
                handleClick={handleReactionClick}
              />
              <ButtonOutline
                height={"40px"}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"71px"}
                text={text.report}
                dataId={item.id}
                handleClick={handleReactionClick}
              />
              <ButtonOutline
                height={"40px"}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"71px"}
                text={text.delete}
                dataId={item.id}
                handleClick={handleReactionClick}
              />
            </FlexContainer>
          </VerticalContainer>
        </RactionFlexContainer>
      );
    });
  };

  useEffect(() => {
    setData(tempData);
    setReactionList(getReactionList(tempReactions));
  }, []);

  return (
    <BrowserContainer
      backgroundColor={"var(--desert-storm)"}
      type={"dashboard"}
      spaceWidth={"7.024024024024023vw"}
      // padding={"50px 40px"}
    >
      <WhiteBoardContainer marginBottm={"40px"}>
        <LabelDataContainer>
          <LabelContainer>
            <Label>{text.name}</Label>
            <Label>{text.title}</Label>
            <Label>{text.episode_count}</Label>
            <Label>{text.public_date}</Label>
            <Label>{text.end_date}</Label>
            <Label>{text.status}</Label>
          </LabelContainer>
          <VerticalContainer>
            <Data>{data.name}</Data>
            <Data>{data.title}</Data>
            <Data>{data.episode_count}</Data>
            <Data>{data.public_date}</Data>
            <Data>{data.end_date}</Data>
            <Data>{data.status}</Data>
          </VerticalContainer>
        </LabelDataContainer>

        <FlexContainer>
          <IconView />
          <CountText>{data.view_count}</CountText>
          <IconHeart />
          <CountText>{data.good_count}</CountText>
          <IconComent />
          <CountText>{data.coment_count}</CountText>

          <FloatRightContainer>
            <ButtonOutline
              height={"40px"}
              marginRight={"16px"}
              borderRadius={"5px"}
              width={"162px"}
              text={text.reaction_management}
              padding={"10px 18px"}
              />
            <ButtonDefault 
              width={"86px"}
              height={"40px"} 
              borderRadius={"5px"}
              text={text.modify} 
              padding={"10px 18px"} 
              />
          </FloatRightContainer>
        </FlexContainer>
      </WhiteBoardContainer>

      <WhiteBoardContainer padding={"80px 55px"}>
        <ContentTitle>{data.content_title}</ContentTitle>
        <ContentDate>{data.content_date}</ContentDate>
        <ContentSummary>{data.content_summary}</ContentSummary>
        <ContentImage src={data.content_image} />
        <ContentNextSummary>{data.content_next_summary}</ContentNextSummary>

        <RactionFlexContainer>
          <ReactionListProfile src={data.my_icon_image} />
          <VerticalContainer>
            <InputComentContainer></InputComentContainer>
            <FlexContainer>
              <ButtonOutline
                text={text.icon}
                marginRight={"16px"}
                borderRadius={"5px"}
                width={"106px"}
                height={"32px"}
                className={"gray"}
              />
              <ButtonDefault
                width={"86px"}
                height={"33px"} 
                borderRadius={"5px"}
                text={text.register}
                marginLeft={"auto"}
              />
            </FlexContainer>
          </VerticalContainer>
        </RactionFlexContainer>

        {reactionList}
      </WhiteBoardContainer>
    </BrowserContainer>
  );
}

const FloatRightContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const ReactionGoodCountr = styled.div`
  min-height: 17px;
  font-family: var(--font-family-noto_sans_jp);
  font-weight: 700;
  color: var(--gray);
  font-size: var(--font-size-xs);
  letter-spacing: 0.8px;
  line-height: 17px;
  white-space: nowrap;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const RactionFlexContainer = styled(FlexContainer)`
  align-items: flex-start;
`;

const VerticalContainer = styled.div``;

const InputComentContainer = styled.textarea`
  width: 590px;
  height: 83px;
  padding: 10px 13px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
`;

const ReactionListComent = styled.div`
  width: 591px;
  min-height: 60px;
  margin-bottom: 5px;
  font-family: var(--font-family-noto_sans_jp);
  color: #454545;
  font-size: var(--font-size-m);
  letter-spacing: 0.93px;
  line-height: 20px;
`;

const ReactionListName = styled.div`
  ${NotosansjpBoldBlack16px}
  min-height: 24px;
  margin-bottom: 5px;
  font-weight: 700;
  letter-spacing: 1.07px;
  line-height: 24px;
  white-space: nowrap;
`;

const ReactionListProfile = styled.img`
  width: 48px;
  height: 48px;
  margin-left: auto;
  margin-right: 20px;
`;

const ContentNextSummary = styled.div`
  ${NotosansjpNormalGunsmoke17px}
  width: 660px;
  min-height: 75px;
  margin-left: auto;
  margin-bottom: 100px;
  letter-spacing: 0.94px;
  line-height: 25px;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const ContentSummary = styled.div`
  min-height: 62px;
  margin-bottom: 80px;
  font-family: var(--font-family-noto_sans_jp);
  color: var(--licorice);
  font-size: var(--font-size-xl);
  letter-spacing: 1px;
  line-height: 26px;
`;

const ContentDate = styled.div`
  min-height: 19px;
  margin-bottom: 10px;
  font-family: var(--font-family-noto_sans_jp);
  color: var(--gunsmoke);
  font-size: var(--font-size-s);
  letter-spacing: 0.72px;
  line-height: 19px;
  white-space: nowrap;
`;

const ContentTitle = styled.h1`
  min-width: 455px;
  min-height: 62px;
  margin-bottom: 5px;
  font-family: var(--font-family-noto_sans_jp);
  color: var(--licorice);
  font-size: var(--font-size-m);
  letter-spacing: 2.87px;
  line-height: 62px;
  white-space: nowrap;
`;

const CountText = styled.div`
  ${Body1}
  min-height: 24px;
  min-width: 41px;
  margin-right: 20px;
  font-weight: 700;
  color: var(--deep-space-sparkle);
  text-align: center;
  line-height: 24px;
  white-space: nowrap;
`;

const Icon = styled.div`
  width: 16px;
  height: 12px;
  margin-right: 10px;
  background-size: 100% 100%;
`;

const IconComent = styled(Icon)`
  background-image: url(${iconComent});
`;

const IconView = styled(Icon)`
  background-image: url(${iconView});
`;

const IconHeart = styled(Icon)`
  background-image: url(${iconHeart});
`;

const IconReactionHeart = styled(Icon)`
  margin-right: 3px;
  margin-left: auto;
  background-image: url(${iconHeart});
`;

const LabelDataContainer = styled.div`
  width: 100%;
  display: flex;
`;

const LabelContainer = styled.div`
  width: 110px;
`;

const TextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 20px;
  white-space: nowrap;
`;

const Label = styled(TextLabel)`
  color: var(--nevada);
`;

const WhiteBoardContainer = styled.div`
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : "50px")};
  margin-bottom: ${(props) => props.marginBottm};
  background-color: var(--white);
  border-radius: 4px;
  @media only screen and (max-width: 1200px) {
    padding: 50px;
  }
`;

const Data = styled(TextLabel)`
  color: var(--vulcan);
`;
