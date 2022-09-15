import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title1, Body3, Border1pxMercury, Body1 } from "@/styledMixins";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';

import {BROWSER_CONTENTS_AREA_TYPE} from '@COMMON/constant';
import BrowserContainer from "@/components/dashboard/BrowserContainer";
import ButtonOutline from "@/components/dashboard/ButtonOutline";
import { getSeriesStoryList } from "@/services/dashboardService";

const size = {
  no: 5,
  image: 8,
  title: 22,
  type: 10,
  category: 10,
  date: 8,
  status: 8,
  arrow: 5,
};

const text = {
  page_title :"シリーズリスト",
  add_series : "シリーズを追加",
  number : "番号",
  post_image : "表紙",
  title : "タイトル",
  type : "タイプ",
  category: "カテゴリ",
  date: "掲載日",
  status: "状態"
};

export default function DashboardSeries(props) {
  const [data, setData] = useState(undefined);
  const navigate = useNavigate();

  /**
  *
     시리즈 목록을 가져온다.
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesList = async () => {
    const { status, data : resultData } = await getSeriesStoryList();

    if( status === 200 ){
      setData(resultData);
    }
    else{
      //error 처리
      console.log("error", resultData);
    }
  };

  /**
  *
     시리즈 목록 Right arrow를 클릭이벤트를 처리
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {e} event
  */
  const handleItemClick = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
  };

  /**
  *
     upload 버튼 클릭 이벤트 처리
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {e} event
  */
  const handleClickUpload = (e) => {
    navigate('/dashboard/series/upload');
  }

  /**
  *
     시리즈 리스트 dom 생성
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const renderSeriesList = () => {
    if( data === undefined ){
      return;
    }

    return data.series.map((item, index) => {
      return (
        <Tr key={index}>
          <Td width={size.no}>{item.id}</Td>
          <Td width={size.image}>
            {/* thumbnailImage or coverImage */}
            <Image src={item.thumbnailImage} />      
          </Td>
          <Td width={size.title}>{item.title}</Td>
          <Td width={size.type}>{item.type.name}</Td>
          <Td width={size.category}>{item.category.name}</Td>
          <Td width={size.date}>{item.startAt}</Td>
          {/* // TODO 모르겠음 description or pauseUntil  completed paused */}
          <Td width={size.status}>{item.status}</Td>
          <Td width={size.arrow} data-id={item.id} onClick={handleItemClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Td>
        </Tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getSeriesList();
  }, []);

  return (
    <BrowserContainer
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD}
      >
      <TitleContainer>
        <Title>{text.page_title}</Title>
        <SeriesAddButtonContainer>
          <ButtonOutline
            width={"180px"}
            height={"40px"}
            marginRight={"16px"}
            borderRadius={"5px"}
            text={text.add_series}
            icon={"iconPathPlus"}
            handleClick={handleClickUpload}
          />
        </SeriesAddButtonContainer>
      </TitleContainer>
      <Table>
        <Header>
          <tr>
            <HeaderCell width={size.no}>{text.number}</HeaderCell>
            <HeaderCell width={size.image}>{text.post_image}</HeaderCell>
            <HeaderCell width={size.title}>{text.title}</HeaderCell>
            <HeaderCell width={size.type}>{text.type}</HeaderCell>
            <HeaderCell width={size.category}>{text.category}</HeaderCell>
            <HeaderCell width={size.date}>{text.date}</HeaderCell>
            <HeaderCell width={size.status}>{text.status}</HeaderCell>
            <HeaderCell width={size.arrow}></HeaderCell>
          </tr>
        </Header>
        <Tbody>
          { renderSeriesList() }
        </Tbody>
      </Table>
    </BrowserContainer>
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
  height: 21.299254526091588vh; /* 200px */
  border-bottom: 1px solid var(--mercury);
  background-color: var(--white);

  :hover{
    background-color: var(--desert-storm);
  }
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

const Image = styled.img`
  width: 5.945945945945946vw;
  /* height: 130px; */
  border-radius: 5px;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 110px;
  padding: 30px 0;
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
