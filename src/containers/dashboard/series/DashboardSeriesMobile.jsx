import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Body8, Body5, Body7, Border1pxVioletBlue } from "@/styledMixins";

import MobileContainer from '@COMPONENTS/dashboard/MobileContainer';
import ButtonOutline from '@COMPONENTS/dashboard/ButtonOutline';
import VerticalLine from '@COMPONENTS/dashboard/VerticalLine';

//temp data
import tempRect1 from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempRect2 from "@IMAGES/mdashboardseries-rectangle.jpg";

const textData = {
  detail : "詳細",
  pageTitle: "シリーズリスト",
  status: "状態",
};


function DashboardSeriesMobile(props) {
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
      },
      {
        id: "2",
        item_image: tempRect2,
        item_title: "大学のリンゴ一個の重さで10メートル…",
        item_date: "掲載日：2022/06/01",
        item_category: "カテゴリ：アクション",
        item_type: "ウェブトゥーン",
        item_status: "休載中(2022/06/10~)",
      },
      {
        id: "3",
        item_image: tempRect2,
        item_title: "大学のリンゴ一個の重さで10メートル…",
        item_date: "掲載日：2022/06/01",
        item_category: "カテゴリ：アクション",
        item_type: "ウェブトゥーン",
        item_status: "休載中(2022/06/10~)",
      },
    ];

    return tempData.map( (item, index) => {
      return <ItemContainer key={item.id}>
              <ItemContentContainer>
                <ImageTextContainer>
                  <ImageContainer>
                    <Image src={item.item_image} />
                  </ImageContainer>
                  <TextContainer>
                    <ItemTitle>{item.item_title}</ItemTitle>
                    <ItemDate>{item.item_date}</ItemDate>
                    <ItemCategory>{item.item_category}</ItemCategory>
                    <ItemType>{item.item_type}</ItemType>
                  </TextContainer>
                </ImageTextContainer>
                <VerticalLine />

                <StatusContainer>
                  <StatusTextLabel left={20}>{textData.status}</StatusTextLabel>
                  <StatusTextLabel right={20}>{item.item_status}</StatusTextLabel>
                </StatusContainer>
                <VerticalLine marginBottom={10} />

                <ButtonOutline height={32} dataId={item.id} text={textData.detail} handleClick={handleClick}/>
              </ItemContentContainer>
              <ItemLine marginTop={10} marginBottom={10} />
            </ItemContainer>;
      });
  }
  
  const handleClick = (event) => {
    //디테일로 이동
    console.log("first", event.target.getAttribute("data-id"));
    
    let id = event.target.getAttribute("data-id");
    navigate( "/dashboard/series/detail/" + id );
  }
  
  useEffect(() => {
    setList(processResultData(null));

  }, []);

  return (
    <MobileContainer>
      <PageTitleContainer>
        <PageTitle>{textData.pageTitle}</PageTitle>
        <TitleUnderLine />
      </PageTitleContainer>

      <VerticalLine />
      <ItemLine marginTop={37} marginBottom={10} />

      {list}
      
    </MobileContainer>
  );
}

const ItemContainer = styled.div`
  width: 100%;
`;

const ItemContentContainer =  styled.div`
width: 100%;
padding: 0 10px;
display: flex;
flex-direction: column;
justify-content: center;
`;


const ImageTextContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  margin-right: 10px;
  flex: 1;
`;

const TextContainer = styled.div`
  flex: 5;
`;

const PageTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


const PageTitle = styled.div`
  ${Body5}
  min-height: 16px;
  margin: 10px auto 5px auto;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const TitleUnderLine = styled.div`
  width: 100px;
  height: 2px;
  margin: auto;
  background-color: var(--violet-blue);
`;

const ItemLine = styled.div`
  width: 100%;
  height: 5px;
  margin-top: ${(props) => props.marginTop}px;
  margin-bottom: ${(props) => props.marginBottom}px;
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
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const ItemDate = styled.div`
  ${Body8}
  min-height: 14px;
  margin-top: 4px;
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
  min-width: 314px;
  height: 16px;
  padding: 0 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  position: relative;
`;

const StatusTextLabel = styled.div`
  min-height: 16px;
  min-width: 33px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
  position: absolute;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
`;


export default DashboardSeriesMobile;
