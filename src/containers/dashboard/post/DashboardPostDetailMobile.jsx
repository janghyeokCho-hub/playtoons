import React, {useEffect, useState} from 'react';
import { Body1, Body7, Body8, Body6, Body9, Border1pxTiara } from "@/styledMixins";
import styled from "styled-components";

import MobileContainer from "@COMPONENTS/dashboard/MobileContainer";
import ButtonOutline from '@COMPONENTS/dashboard/ButtonOutline';
import ButtonDefault from '@COMPONENTS/dashboard/ButtonDefault';

import iconView from '@ICONS/icon_view_gray01.png';
import iconHeart from '@ICONS/icon_heart_gray02.png';
import iconComent from '@ICONS/icon_coment_gray01.png';
import iconThreePoint from '@ICONS/icon_vertical_three_point_gray01.png';
import bgProfile from '@IMAGES/bacground_m_dashboard_profile.png';

import tempMyProfile from '@IMAGES/authorseries-btnauthorgnb.png';

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
  follow: "フォロー",
  support: "支援する",
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
  content_summary: <React.Fragment>モと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。</React.Fragment>,
  content_image: "/img/dashboardpostdetail-rectangle-3F15B08E-F381-4DB5-9F3D-63F6E781FDA3.jpg",
  content_next_summary: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",
  
  my_icon_image: tempMyProfile,
  
};

const tempReactions= [
  {
    id: "12",
    profile: "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    coment_date: "3日前",
    good_count: "123",
  },
  {
    id: "15",
    profile: "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
    name: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
    coment: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
    coment_date: "3日前",
    good_count: "1223",
  },
];




export default function DashboardPostDetail() {
  const [reactionList, setReactionList] = useState([]);
  const [data, setData] = useState({
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
    content_summary: <React.Fragment>モと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。</React.Fragment>,
    content_image: "/img/dashboardpostdetail-rectangle-3F15B08E-F381-4DB5-9F3D-63F6E781FDA3.jpg",
    content_next_summary: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。",
    
    my_icon_image: "/img/dashboardpostdetail-oval-copy-A74BAE99-7E7C-4FC9-A864-C9DCC025808F@2x.png",
  });

  const handleReactionClick = (e) => {
    let type = e.target.innerText;
    let id = e.target.getAttribute("data-id");

    if( text.fix === type ){

      console.log("type Click", type, id);
    }
    else if( text.good === type ){

      console.log("good Click", type, id);
    }
    else if( text.coment === type ){

      console.log("coment Click", type, id);
    }
    else if( text.report === type ){

      console.log("report Click", type, id);
    }
    else if( text.delete === type ){

      console.log("delete Click", type, id);
    }

  };

  const getReactionList = (resultList) => {
    return resultList.map((item, index) => {
      return <RactionVerticalContainer key={index}>
              <ReactionHeadContainer>
                <ReactionListProfile src={item.profile} />
                <VerticalContainer>
                  <ReactionListName>{item.name}</ReactionListName>
                  <FlexContainer>
                    <ReactionListDate>{item.coment_date}</ReactionListDate>
                    <ReactionListDate>{text.coment}</ReactionListDate>
                  </FlexContainer>
                </VerticalContainer>
                <FlexContainer>
                  <IconReactionHeart />
                  <ReactionGoodCount>{item.good_count}</ReactionGoodCount>  
                  <IconThreePoint src={iconThreePoint} />
                </FlexContainer>
              </ReactionHeadContainer>

              <ReactionListComent>{item.coment}</ReactionListComent>
              <FlexContainer>
                <ButtonOutline text={text.fix} dataId={item.id} className={"mobile"} marginLeft={"auto"} handleClick={handleReactionClick}/>
                <ButtonOutline text={text.good} dataId={item.id} className={"mobile"} handleClick={handleReactionClick}/>
                <ButtonOutline text={text.coment} dataId={item.id} className={"mobile"} handleClick={handleReactionClick}/>
                <ButtonOutline text={text.report} dataId={item.id} className={"mobile"} handleClick={handleReactionClick}/>
                <ButtonOutline text={text.delete} dataId={item.id} className={"mobile"} marginRight={""} handleClick={handleReactionClick}/>
              </FlexContainer>
              <Space height={20}/>

              <ReactionHorizontalLine />
            </RactionVerticalContainer>;
    });
  }

  
  useEffect(() => {
    
    setData(tempData);
    setReactionList( getReactionList(tempReactions) );
  }, []);
  


  return (
    <MobileContainer 
      pageTitle={text.page_title} >
      <Space height={35} />
      <PaddingWrapContainer>
        <WhiteBoardContainer >
          <LabelDataContainer>
            <LabelContainer>
              <Label>{text.name}</Label>
              <Label>{text.title}</Label>
              <Label>{text.episode_count}</Label>
              <Label>{text.public_date}</Label>
              <Label>{text.end_date}</Label>
              <Label>{text.status}</Label>
            </LabelContainer>
            <VerticalRightContainer>
              <Data>{data.name}</Data>
              <Data>{data.title}</Data>
              <Data>{data.episode_count}</Data>
              <Data>{data.public_date}</Data>
              <Data>{data.end_date}</Data>
              <Data>{data.status}</Data>
            </VerticalRightContainer>        
          </LabelDataContainer>

          <FlexContainer>
            <IconView />
            <CountText>{data.view_count}</CountText>
            <IconHeart />
            <CountText>{data.good_count}</CountText>
            <IconComent />
            <CountText>{data.coment_count}</CountText>
          </FlexContainer>
          <Space height={35} />

            <ButtonContainer>
              <ButtonOutline 
                className={"blue mobile"}
                height={32}
                text={text.reaction_management} 
                padding={"5px 8px"} />
              <ButtonDefault 
                className={"mobile"} 
                height={32}
                text={text.modify} 
                padding={"5px 8px"}  />
            </ButtonContainer>
        </WhiteBoardContainer>
        <Space height={90} />

        <ContentTitle>{data.content_title}</ContentTitle>
        <ContentDate>{data.content_date}</ContentDate>
        <ContentSummary>{data.content_summary}</ContentSummary>
        <ContentImage src={data.content_image} />
        <ContentNextSummary>{data.content_next_summary}</ContentNextSummary>
      </PaddingWrapContainer>
      <HorizontalLine marginBottom={10} />

      <PaddingWrapContainer>
        <ProfileContainer>
          <ProfileBackgroundImage src={bgProfile}/>
          <ProfileOval src={data.my_icon_image} />

          <ProfileButtonContainer>  
            <ButtonDefault text={text.follow} className={"mobile12"} marginRight={"5px"} marginBottom={"10px"}/>
            <ButtonOutline text={text.support} className={"mobile12"} marginRight={""} marginBottom={"10px"}/>
          </ProfileButtonContainer>
        </ProfileContainer>
      </PaddingWrapContainer>
      <HorizontalLine marginBottom={30} />

      <PaddingWrapContainer>
        <RactionVerticalContainer>
          <ReactionListProfile src={data.my_icon_image} />
          <VerticalContainer>
            <InputComentContainer />
            <FlexContainer>
              <ButtonOutline text={text.icon} className={"gray mobile12"} marginLeft={"0px"}/>
              <ButtonDefault text={text.register} className={"mobile12"} marginLeft={"auto"}/>
            </FlexContainer>
          </VerticalContainer>
        </RactionVerticalContainer>
        <ReactionHorizontalLine />
        {reactionList}


      </PaddingWrapContainer>



      <Space height={35}/>
    </MobileContainer>
  );
}

const ReactionListDate = styled.div`
  ${Body9}
  margin-right: 10px;
  min-height: 12px;
  font-weight: 500;
  color: var(--manatee);
  line-height: 12px;
  white-space: nowrap;
`;

const IconThreePoint = styled.img`
  width: 2px;
  height: 12px;
  margin-right: 15px;
`;

const ReactionHorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 15px;
  background-color: var(--mercury);
`;

const ProfileButtonContainer = styled.div`
  display: inline-flex;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
`;

const ProfileOval = styled.img`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileBackgroundImage = styled.img`
  width: 100%;
  height: 70px;
`;

const ProfileContainer = styled.div`
  ${Border1pxTiara}
  width: 100%;
  height: 150px;
  position: relative;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 3px;
  margin-bottom: ${(props) => props.marginBottom}px;
  background-color: var(--desert-storm);
`;

const Space = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
`;


const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  `;

const ReactionGoodCount = styled.div`
  margin-right: 15px;
  ${Body7}
  min-height: 14px;
  font-weight: 700;
  color: var(--deep-space-sparkle);
  line-height: 14px;
  white-space: nowrap;
  `;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ReactionHeadContainer = styled(FlexContainer)`
  margin-bottom: 10px;
  align-items: flex-start;
`;


const VerticalContainer = styled.div`
`;

const RactionVerticalContainer = styled(VerticalContainer)`
  align-items: flex-start;
  margin-bottom: 20px;
`;

const VerticalRightContainer = styled.div`
  margin-left: auto;
`;


const InputComentContainer = styled.textarea`
  width: 100%;
  height: 83px;
  padding: 10px 13px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
`;

const ReactionListComent = styled.div`
  ${Body8}
  margin-bottom: 15px;
  color: var(--vulcan);
  line-height: 14px;
  word-break:break-all;
`;

const ReactionListName = styled.div`
  ${Body7}
  margin-bottom: 5px;
  min-height: 14px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const ReactionListProfile = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

const ContentNextSummary = styled.div`
  ${Body6}
  width: 344px;
  min-height: 121px;
  color: var(--nevada);
  line-height: 16px;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 500px;
  margin-bottom: 25px;
  object-fit: cover;
`;

const ContentSummary = styled.div`
  ${Body8}
  width: 344px;
  min-height: 33px;
  margin-bottom: 55px;
  color: var(--nevada);
  line-height: 14px;
`;

const ContentDate = styled.div`
  ${Body8}
  margin-bottom: 5px;
  min-height: 14px;
  color: var(--manatee);
  line-height: 14px;
  white-space: nowrap;
`;

const ContentTitle = styled.div`
  ${Body1}
  margin-bottom: 3px;
  min-height: 20px;
  font-weight: 700;
  color: var(--bright-gray);
  line-height: 20px;
  white-space: nowrap;
`;

const CountText = styled.div`
  ${Body8}
  min-height: 14px;
  margin-right: 10px;
  color: var(--deep-space-sparkle);
  line-height: 14px;
  white-space: nowrap;
`;


const Icon = styled.div`
  width: 14px;
  height: 11px;
  margin-right: 5px;
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
  margin-right: 5px;
  margin-left: auto;
  background-image: url(${iconHeart});
`;

const LabelDataContainer = styled.div`
  width: 100%;
  margin-bottom: 25px;
  display: flex;
`;

const LabelContainer = styled.div`
  width: 110px;
`;


const TextLabel = styled.div`
  ${Body7}
  min-height: 14px;
  margin-bottom: 10px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const Label = styled(TextLabel)`
  color: var(--nevada);
`;

const PaddingWrapContainer = styled.div`
  width: 100%;
  padding: 0 8px;
`;

const WhiteBoardContainer = styled.div`
  ${Border1pxTiara}
  width: 100%;
  padding:13px;
  margin-bottom: 40px;
  background-color: var(--white);
  border-radius: 4px;
`;

const Data = styled(TextLabel)`
  color: var(--vulcan);
  text-align: right;
`;
