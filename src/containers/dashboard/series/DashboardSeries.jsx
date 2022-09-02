import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getSeriesStoryList } from "@/services/dashboardService";
import styled from "styled-components";
import { Title1, Body3, Border1pxMercury, Body1 } from "@/styledMixins";

import iconPathRight from "@ICONS/icon_arrow_right_gray.png";
import iconPathPlus from "@ICONS/icon_plus_blue.png";
//temp data
import tempImg1 from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempImg2 from "@IMAGES/mdashboardseries-rectangle.jpg";

import BrowserContainer from "@/components/dashboard/BrowserContainer";
import ButtonOutline from "@/components/dashboard/ButtonOutline";

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

function DashboardSeries(props) {
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

  const handleItemClick = (e) => {
    let no = e.target.getAttribute("data-id");

    console.log("data-id : ", no);
    navigate("/dashboard/series/detail/" + no);
  };

  const processRsultData = (result) => {
    const tempData = [
      {
        no: 1,
        image: tempImg1,
        title: "阿修羅ゲート",
        type: "ウェブトゥーン",
        category: "アクション",
        date: "2022/06/11",
        status: <React.Fragment>連載中</React.Fragment>,
      },
      {
        no: 2,
        image: tempImg2,
        title: "シェルターアーク",
        type: "ウェブトゥーン",
        category: "アクション",
        date: "2022/06/11",
        status: (
          <React.Fragment>
            休載中
            <br />
            (2022/06/10~)
          </React.Fragment>
        ),
      },
    ];

    return tempData.map((value, index) => {
      return (
        <Tr key={index}>
          <Td width={size.no}>{value.no}</Td>
          <Td width={size.image}>
            <Image src={value.image} />
          </Td>
          <Td width={size.title}>{value.title}</Td>
          <Td width={size.type}>{value.type}</Td>
          <Td width={size.category}>{value.category}</Td>
          <Td width={size.date}>{value.date}</Td>
          <Td width={size.status}>{value.status}</Td>
          <Td width={size.arrow} data-id={value.no} onClick={handleItemClick}>
            <AngleRight />
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
    <BrowserContainer
      type={"dashboard"}
      >
      <TitleContainer>
        <Title>{"シリーズリスト"}</Title>
        <SeriesAddButtonContainer>
          <ButtonOutline
            width={"180px"}
            height={"40px"}
            marginRight={"16px"}
            borderRadius={"5px"}
            text={"シリーズを追加"}
            icon={iconPathPlus}
          />
        </SeriesAddButtonContainer>
      </TitleContainer>
      <Table>
        <Header>
          <tr>
            <HeaderCell width={size.no}>{"番号"}</HeaderCell>
            <HeaderCell width={size.image}>{"表紙"}</HeaderCell>
            <HeaderCell width={size.title}>{"タイトル"}</HeaderCell>
            <HeaderCell width={size.type}>{"タイプ"}</HeaderCell>
            <HeaderCell width={size.category}>{"カテゴリ"}</HeaderCell>
            <HeaderCell width={size.date}>{"掲載日"}</HeaderCell>
            <HeaderCell width={size.status}>{"状態"}</HeaderCell>
            <HeaderCell width={size.arrow}></HeaderCell>
          </tr>
        </Header>
        <Tbody>{data}</Tbody>
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

const AngleRight = styled.div`
  width: 9px;
  height: 16px;
  margin-right: 20px;
  float: right;
  background-size: 100% 100%;
  background-image: url(${iconPathRight});
  pointer-events: none;
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

export default DashboardSeries;
