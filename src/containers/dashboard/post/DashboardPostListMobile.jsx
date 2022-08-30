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

const textData = {
  detail: "詳細",
  pageTitle: "投稿管理",
  status: "状態",
};

const dataList = ["シリーズすべて", "シリーズすべて2", "シリーズすべて3"];

function DashboardPostListMobile(props) {
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
        id: "1",
        item_image: tempRect1,
        item_title: "大学のリンゴ一個の重さで10メートル…",
        item_date: "掲載日：2022/06/01",
        item_category: "カテゴリ：アクション",
        item_type: "ウェブトゥーン",
        item_status: "連載中",
        view_count: "1,344,211",
        good_count: "124,512",
      },
      {
        id: "2",
        item_image: tempRect2,
        item_title: "大学のリンゴ一個の重さで10メートル…",
        item_date: "掲載日：2022/06/01",
        item_category: "カテゴリ：アクション",
        item_type: "ウェブトゥーン",
        item_status: "休載中(2022/06/10~)",
        view_count: "1,344,211",
        good_count: "124,512",
      },
      {
        id: "3",
        item_image: tempRect2,
        item_title: "大学のリンゴ一個の重さで10メートル…",
        item_date: "掲載日：2022/06/01",
        item_category: "カテゴリ：アクション",
        item_type: "ウェブトゥーン",
        item_status: "休載中(2022/06/10~)",
        view_count: "1,344,211",
        good_count: "124,512",
      },
    ];

    return tempData.map((item, index) => {
      return (
        <ItemContainer key={item.id}>
          <ItemContentContainer>
            <ImageTextContainer>
              <ImageContainer>
                <Image src={item.item_image} />
              </ImageContainer>
              <TextContainer>
                <ItemTitle>{item.item_title}</ItemTitle>
                <ItemDate>{item.item_date}</ItemDate>
                <TextCountContainer>
                  <IconCount src={iconView} />
                  <CountTextLabel>{item.view_count}</CountTextLabel>
                  <IconCount src={iconHeart} />
                  <CountTextLabel>{item.good_count}</CountTextLabel>
                </TextCountContainer>
              </TextContainer>
            </ImageTextContainer>
            <HorizontalLine />

            <StatusContainer>
              <StatusTextLabel >{textData.status}</StatusTextLabel>
              <StatusBoldTextLabel >{item.item_status}</StatusBoldTextLabel>
            </StatusContainer>
            <HorizontalLine marginBottom={"16px"} />

            <ButtonOutline
              height={"32px"}
              borderRadius={"4px"}
              dataId={item.id}
              text={textData.detail}
              handleClick={handleClick}
            />
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
    <MobileContainer>
      <HorizontalLine />
      <PageTitleContainer>
        <PageTitle>{textData.pageTitle}</PageTitle>
        <UnderLine />
      </PageTitleContainer>
      <HorizontalLine />

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
        <ButtonOutline
          height={"32px"}
          borderRadius={"5px"}
          width={"92px"}
          text={"投稿する"}
          className={"mobile"}
          icon={iconPathPlus}
          padding={""}
          handleClick={handleClickPost}
        />
      </ButtonContainer>

      <HorizontalBoldLine marginBottom={"16px"}/>

      {list}
    </MobileContainer>
  );
}

const IconCount = styled.img`
  width: 14px;
  height: 11px;
  margin-right: 4px;
`;

const CountTextLabel = styled.div`
  ${Body8}
  margin-right: 12px;
  min-height: 14px;
  color: var(--deep-space-sparkle);
  line-height: 14px;
  white-space: nowrap;
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

const ImageTextContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  margin-right: 16px;
`;

const TextContainer = styled.div`
  position: relative;
`;

const TextCountContainer = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
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

const Image = styled.img`
  width: 88px;
  height: 134px;
  border-radius: 4px;
  object-fit: cover;
`;

const ItemTitle = styled.div`
  ${Body7}
  min-height: 14px;
  margin-bottom: 4px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const ItemDate = styled.div`
  ${Body8}
  min-height: 14px;
  color: var(--manatee);
  line-height: 14px;
  white-space: nowrap;
`;

const ItemCategory = styled.div`
  ${Body8}
  min-height: 14px;
  margin-top: 4px;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const ItemType = styled.div`
  ${Body5}
  min-height: 16px;
  margin-top: 8px;
  font-weight: 500;
  color: var(--violet-blue);
  line-height: 16px;
  white-space: nowrap;
`;

const StatusContainer = styled.div`
  ${Body5}
  height: 48px;
  position: relative;
`;

const StatusTextLabel = styled.div`
  ${Body8}
  min-height: 14px;
  color: var(--deep-space-sparkle);
  line-height: 14px;
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

export default DashboardPostListMobile;
