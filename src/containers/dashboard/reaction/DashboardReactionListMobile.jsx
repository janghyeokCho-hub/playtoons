import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Body8, Body5, Body7, Border1pxVioletBlue } from "@/styledMixins";

import MobileContainer from "@COMPONENTS/dashboard/MobileContainer";
import ButtonOutline from "@COMPONENTS/dashboard/ButtonOutline";
import HorizontalLine from "@/components/dashboard/HorizontalLine";
import Dropdown from "@COMPONENTS/dashboard/Dropdown";

import iconPathPlus from "@ICONS/icon_plus_blue.png";
import iconView from "@ICONS/icon_view_gray01.png";
import iconHeart from "@ICONS/icon_heart_gray01.png";
//temp data
import tempRect1 from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempRect2 from "@IMAGES/mdashboardseries-rectangle.jpg";

let textData = {
  detail: "詳細",
  pageTitle: "投稿管理",
  status: "状態",
  
  page_title : "リアクションリスト",
  post : "投稿する",
  number : "番号",
  content : "内容",
  money : "寄付金",
  user : "作成者",
  date : "掲載日",
  move : "移動",
  fix : "固定",
  good : "いいね",
  coment : "コメント",
  report : "通報",
  delete : "削除",
};


const dataList = ["シリーズすべて", "シリーズすべて2", "シリーズすべて3"];

export default function DashboardReactionListMobile(props) {
  const [list, setList] = useState(null);
  const refItem = useRef();
  const navigate = useNavigate();

  const getList = async () => {
    //request
    const params = {
      email: "emailValue",
      password: "passwordValue",
    };

    // const {status, data} = await getSeriesStoryList(params);

    // if( status === 200 ){
    //   setList(handleGetSeriesStoryList(data));
    // }

    setList(processResultData(null));
  };

  const processResultData = (result) => {
    const tempData = [
      {
        no: "1",
        content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
        date: "掲載日：2022/06/01",
        user: "作成者 : 七語つきみ@TFO7O7O7O7O…",
        money: "500CP",
      },
      {
        no: "2",
        content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな。",
        date: "掲載日：2022/06/01",
        user: "作成者 : 七語つきみ@TFO7O7O7O7O…",
        money: "500CP",
      },
    ];

    //item view
    return tempData.map((item, index) => {
      return (
        <ItemContainer key={item.no}>
          <ItemContentContainer>
            <ItemContent>{item.content}</ItemContent>
            <ItemDate>{item.date}</ItemDate>
            <ItemUser>{item.user}</ItemUser>

            <HorizontalLine />

            <StatusContainer>
              <StatusTextLabel >{textData.money}</StatusTextLabel>
              <StatusBoldTextLabel >{item.money}</StatusBoldTextLabel>
            </StatusContainer>
            <HorizontalLine marginBottom={"16px"} />

            <HorizontalContainer
              marginBottom={"8px"}>
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                marginRight={"15px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.move}
                handleClick={handleClick}
              />
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.fix}
                handleClick={handleClick}
              />
            </HorizontalContainer>

            <HorizontalContainer
              marginBottom={"8px"}>
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                marginRight={"15px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.good}
                handleClick={handleClick}
              />
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.coment}
                handleClick={handleClick}
              />
            </HorizontalContainer>

            <HorizontalContainer>
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                marginRight={"15px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.report}
                handleClick={handleClick}
              />
              <ButtonOutline
                width={"164px"}
                height={"32px"}
                borderRadius={"4px"}
                dataId={item.no}
                text={textData.delete}
                handleClick={handleClick}
              />
            </HorizontalContainer>

          </ItemContentContainer>
          {/* 16px */}
          <HorizontalBoldLine marginBottom={"32px"} />
        </ItemContainer>
      );
    });
  };

  const handleClickPost = () => {
    console.log("handleClickPost");
    navigate("/dashboard/post/upload/");
  };

  const handleClick = (event) => {
    //디테일로 이동
    console.log("first", event.target.getAttribute("data-id"));

    let id = event.target.getAttribute("data-id");
    navigate("/dashboard/series/detail/" + id);
  };

  useEffect(() => {
    setList(processResultData(null));
  }, []);

  return (
    <MobileContainer pageTitle={textData.page_title}>

      <ButtonContainer>
        <Dropdown
          dataList={dataList}
          width={"132px"}
          height={"22px"}
          borderRadius={"2px"}
          marginRight={"auto"}
          selected={"シリーズすべて"}
          className={"post_detail_mobile"}
        />
      </ButtonContainer>

      <HorizontalBoldLine marginBottom={"16px"}/>

      {list}
    </MobileContainer>
  );
}

const HorizontalContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
`;


const ButtonContainer = styled.div`
  width: 100%;
  height: 86px;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

const ItemContentContainer = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


const PageTitleContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const PageTitle = styled.div`
  ${Body5}
  font-weight: 500;
  color: var(--vulcan);
  white-space: nowrap;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

const UnderLine = styled.div`
  width: 60px;
  height: 2px;
  background-color: var(--violet-blue);
  position: absolute;
  top: 100%;
  transform: translate(0, -100%);
`;

const HorizontalBoldLine = styled.div`
  width: 100%;
  height: 5px;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--mercury);
`;


const ItemContent = styled.div`
  ${Body8}
  width: 100%;
  min-height: 72px;
  margin-bottom: 16px;
  color: var(--bright-gray);
  line-height: 14px;
`;

const ItemDate = styled.div`
  ${Body8}
  min-height: 14px;
  margin-bottom: 4px;
  color: var(--manatee);
  line-height: 14px;
  white-space: nowrap;
`;

const ItemUser = styled.div`
  ${Body8}
  min-height: 14px;
  margin-bottom: 35px;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;


const StatusContainer = styled.div`
  ${Body5}
  height: 48px;
  position: relative;
`;

const StatusTextLabel = styled.div`
  ${Body5}
  min-height: 16px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
  left: 16px;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
  `;


const StatusBoldTextLabel = styled.div`
  ${Body5}
  min-height: 16px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
  right: 16px;
  top: 50%;
  position: absolute;
  transform: translate(0, -50%);
`;

