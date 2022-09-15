import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title1, Body3, Border1pxMercury, Body1 } from "@/styledMixins";
import {getResizedNumber} from '@/common/common';

import iconPathPlus from "@ICONS/icon_plus_blue.png";

import BrowerContainer from "@/components/dashboard/BrowserContainer";
import ButtonOutline from "@/components/dashboard/ButtonOutline";
import Dropdown from "@/components/dashboard/Dropdown";

const cellSize = {
  no: 5,
  content: 22,
  money: 10,
  good: 10,
  date: 10,
  button: 15,
};

let textData = {
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

const dataList = ["シリーズすべて", "シリーズすべて1", "シリーズすべて3"];

export default function DashboardReactionList(props) {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getSeriesStoryList = async () => {
    // 시리즈 스토리 리스트
    const params = {
      email: "emailValue",
      password: "passwordValue",
    };

    const { status, data } = await getSeriesStoryList(params);

    // if( status === 200 ){
    //   setList(handleGetSeriesStoryList(data));
    // }

    setData(processRsultData(data));
  };

  const handleButtonClick = (e) => {
    const no = e.target.getAttribute("data-id");
    const text = e.target.firstChild.innerText;
    
    switch(text){
      default: // move  
        navigate( "/dashboard/reaction/detail/" + no );
        break;
      case textData.fix:
            
        break;
      case textData.good:
            
        break;
      case textData.coment:
            
        break;
      case textData.report:
            
        break;
      case textData.delete:
            
        break;
    }
  };

  const handleClickPost = () => {
    navigate("/dashboard/reaction/upload/");
  };

  const handleDropItemClick = (value) => {
    console.log("drop item ", value);
  };

  const processRsultData = (result) => {
    const tempData = [
      {
        no: 1,
        content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな",
        money: "500CP",
        good: "お祭り楽しい！",
        date: "2022/06/11",
      },
      {
        no: 2,
        content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな",
        money: "500CP",
        good: "お祭り楽しい！",
        date: "2022/06/11",
      },
    ];

    return tempData.map((value, index) => {
      return (
        <Tr key={index}>
          <Td width={cellSize.no}>{value.no}</Td>
          <Td width={cellSize.content}>{value.content}</Td>
          <Td width={cellSize.money}>{value.money}</Td>
          <Td width={cellSize.good}>{value.good}</Td>
          <Td width={cellSize.date}>{value.date}</Td>
          <Td width={cellSize.button} data-id={value.no} >
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.move}
              dataId={value.no}
              handleClick={handleButtonClick}
              />
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.fix}
              dataId={value.no}
              handleClick={handleButtonClick}
              />
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.good}
              dataId={value.no}
              handleClick={handleButtonClick}
              />
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.coment}
              dataId={value.no}
              handleClick={handleButtonClick}
              />
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.report}
              dataId={value.no}
              handleClick={handleButtonClick}
              />
            <ButtonOutline
              width={"124px"}
              height={"32px"}
              marginLeft={"auto"}
              marginRight={"auto"}
              marginBottom={"12px"}
              borderRadius={"4px"}
              className={"reaction_list"}
              text={textData.delete}
              dataId={value.no}
              handleClick={handleButtonClick}
              />

          </Td>
        </Tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    setData(processRsultData());
  }, []);

  return (
    <BrowerContainer
      spaceWidth={"49px"}
      >
      <VerticalContainer>
        <TitleContainer>
          <Title>{textData.page_title}</Title>
          <SeriesAddButtonContainer>
            <ButtonOutline
              width={"128px"}
              height={"40px"}
              marginRight={"16px"}
              borderRadius={"5px"}
              text={textData.post}
              icon={iconPathPlus}
              padding={"7px 10px"}
              handleClick={handleClickPost}
            />
          </SeriesAddButtonContainer>
        </TitleContainer>

        <Dropdown
          dataList={dataList}
          handleItemClick={handleDropItemClick}
          width={"215px"}
          height={"45px"}
          borderRadius={"5px"}
          className={"post_detail"}
          selected={"シリーズすべて"}
        />
      </VerticalContainer>
      <Table>
        <Header>
          <tr>
            <HeaderCell width={cellSize.no}>{textData.number}</HeaderCell>
            <HeaderCell width={cellSize.content}>{textData.content}</HeaderCell>
            <HeaderCell width={cellSize.money}>{textData.money}</HeaderCell>
            <HeaderCell width={cellSize.user}>{textData.user}</HeaderCell>
            <HeaderCell width={cellSize.date}>{textData.date}</HeaderCell>
            <HeaderCell width={cellSize.button}></HeaderCell>
          </tr>
        </Header>
        <Tbody>{data}</Tbody>
      </Table>
    </BrowerContainer>
  );
}

const Table = styled.table`
  width: 100%;
  height: auto;
  margin: auto;
  border-collapse: collapse;
  border-spacing: 0 20px;
`;

const Header = styled.thead`
  ${Border1pxMercury}
  width: 100%;
  height: 6.389776357827476vh;
  background-color: var(--desert-storm);
`;

const HeaderCell = styled.th`
  ${Body1}
  width : ${(props) => props.width}%;
  min-width: ${(props) => props.minWidth}%;
  height: 60px;
  font-weight: 700;
  font-size: 1.6em;
  color: var(--vulcan);
  white-space: nowrap;
  text-align: center;
  padding: 1.5vh;
  vertical-align: middle;
`;

const Tbody = styled.tbody`
  width: 100%;
  height: auto;
`;

const Tr = styled.tr`
  width: 100%;
  height: 340px; /* 200px */
  border-bottom: 1px solid var(--mercury);
`;

const Td = styled.td`
  ${Body3}
  width : ${(props) => props.width}%;
  min-width: ${(props) => props.minWidth}%;
  font-size: 1.6em;
  color: var(--vulcan);
  text-align: center;
  vertical-align: middle;
`;


const TitleContainer = styled.div`
  width: 100%;
  padding: 30px 0;
  margin-bottom: 35px;
`;

const VerticalContainer = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  ${Title1}
  float: left;
  color: var(--vulcan);
  line-height: 36px;
  white-space: nowrap;
  font-size: 3.2em;
`;

const SeriesAddButtonContainer = styled.div`
  float: right;
`;


