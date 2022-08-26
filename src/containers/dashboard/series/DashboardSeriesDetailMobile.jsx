import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {  Body8, Border1pxTiara, Body7 } from "@/styledMixins";

import line from '@LINES/mdashboardseriesdetail-rectangle.png';

import TagePaddingGroup from "@/components/dashboard/DetailMobileTagContainer";
import MobileContainer from "@/components/dashboard/MobileContainer";

//temp
import tempImage from '@IMAGES/mdashboardseries-rectangle.jpg';

const textData = {
  label_page_title: "シリーズ詳細",
  label_category: "カテゴリ",
  label_grade: "指定",
  label_status: "状態",
  label_type: "タイプ",
  label_summary: "説明",
  label_tag: "タグ",
  label_timeline_thumb: "タイムラインのサムネイル",
};

const size = {
  textMarginBottom : 18,
  imageHeight : 90,
  imageMarginRight: 10
};

function DashboardSeriesDetailMobile(props) {

  const parmas = useParams();

  const [data, setData] = useState({
    rectangleCopy1681: "",
    rectangleCopy1682: "",
    rectangleCopy1683: "",
    text_title: <React.Fragment></React.Fragment>,
    text_type: "",
    text_category: "",
    text_grade: "",
    text_status: "",
    text_summary: <React.Fragment></React.Fragment>,
    main_image: "",
    rectangle2: "",
    rectangleCopy3: "",
    paddingGroup14Copy4Props_tag: "",
    classNamePaddingGroup14: "",
    classNamePaddingGroup14Copy: "",
  });

  let getThumbList = () => {
    const list_data = [tempImage, "", ""];

    return list_data.map( (data, index) => {
      return "" === data ? <ImgThumbEmpty key={index} ></ImgThumbEmpty> : 
        <ImgThumb src={data} key={index} />;
    } );
  }

  let getTagList = () => {
    const list_data = ["#初公開", "#SF", "#アクション"];

    return list_data.map( (data, index) => {
      return <TagePaddingGroup key={index}>{data}</TagePaddingGroup>;
    });
  }

  

  useEffect(() => {
    
    setData({
      rectangleCopy1681: "/img/mdashboardseriesdetail-rectangle-copy-168-24155562-1ED1-4030-A05F-F4C087A2186A.png",
      rectangleCopy1682: "/img/mdashboardseriesdetail-rectangle-copy-168-24155562-1ED1-4030-A05F-F4C087A2186A.png",
      rectangleCopy1683: "/img/mdashboardseriesdetail-rectangle-copy-168-24155562-1ED1-4030-A05F-F4C087A2186A.png",
      text_title: <React.Fragment>シェルターアーク・世界を滅ぼすも<br />のたち世界を滅ぼすものたち</React.Fragment>,
      text_type: "マンガ",
      text_category: "アクション",
      text_grade: "R18",
      text_status: "連載中",
      text_summary: <React.Fragment>No.13の災害後、人類はシェルターにバラバラに散っ<br />た。そして、奇妙なロボット”クモ”の出現により<br />シェルター周辺に防壁が張り巡らされた。クモと戦<br />う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。そこで、レンジャーた<br />ちは人間と機械を融合するアダマ手術を施し、クモ<br />に挑むが…果たしてレンジャーたちの行く末は..? <br />クモの正体、そして突如現れた謎の組織カンパニー<br />ヌルの正体とは…?!</React.Fragment>,
      main_image: tempImage,  //메인이미지
      rectangle2: "/img/mdashboardseriesdetail-rectangle-BF6A0071-A8D7-4934-8F59-62907027D07B@2x.png",  //타임라인 썸네일
      rectangleCopy3: "/img/mdashboardseriesdetail-round-rectangle.png", //배경라운드 이미지
      paddingGroup14Copy4Props_tag: "#初公開",
      classNamePaddingGroup14: "padding-group-14-copy-3-2",
      classNamePaddingGroup14Copy: "padding-group-14-copy-6-59",
    });
  
    return () => {
    }
  }, []);
  

  return (
    <MobileContainer isBorder={true} pageTitle={textData.label_page_title} >
        <ImageTitleContainer>
          <MainImage src={data.main_image} />
          <Title>{data.text_title}</Title>
        </ImageTitleContainer>

        <TextContainer>
          <TextWrapContainer>
            <TextLabel>{textData.label_category}</TextLabel>
            <TextLabel>{textData.label_grade}</TextLabel>
            <TextLabel>{textData.label_status}</TextLabel>
            <TextLabel>{textData.label_type}</TextLabel>
          </TextWrapContainer>
          <TextWrapContainer>
            <TextData>{data.text_category}</TextData>
            <TextData>{data.text_grade}</TextData>
            <TextData>{data.text_status}</TextData>
            <TextData>{data.text_type}</TextData>
          </TextWrapContainer>
        </TextContainer>
        <HorizontalLine src={line} />
        

        <TextLabel>{textData.label_summary}</TextLabel>
        <Summary>{data.text_summary}</Summary>
        <HorizontalLine src={line} />

        <TextLabel>{textData.label_tag}</TextLabel>
        <TagListContainer>
          {getTagList()}
        </TagListContainer>
        <HorizontalLine src={line} />
        
        <TextLabel>{textData.label_timeline_thumb}</TextLabel>
        <TimelineContainer>
          {getThumbList()}    
        </TimelineContainer>
    </MobileContainer>
  );
}



const TimelineContainer = styled.div`
  width: 100%;
  display: inline-flex;
`;

const ImageTitleContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
`;

const TextContainer = styled.div`
  width: 100%;
  margin-bottom: ${size.textMarginBottom}px;
  display: flex;
`;

const TextWrapContainer = styled.div`
  width: 50%;
`;


const TagListContainer = styled.div `
  margin-bottom: ${size.textMarginBottom}px;
  display: flex;
  justify-content: flex-start;
  `;


const HorizontalLine = styled.img`
  width: 100%;
  height: 1px;
  margin-bottom: ${size.textMarginBottom}px;
`;


const Title = styled.div`
  ${Body7}
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
`;


const TextData = styled.div`
  ${Body7}
  margin-bottom: 18px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
  text-align: right;
`;


const Summary = styled.div`
  ${Body8}
  width: 100%;
  min-height: 166px;
  color: var(--nevada);
  line-height: 14px;
  margin-bottom: ${size.textMarginBottom}px;
`;

const TextLabel = styled.div`
  ${Body7}
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
  margin-bottom: ${size.textMarginBottom}px;
`;


const MainImage = styled.img`
  width: 88px;
  height: 134px;
  margin-right: 18px;
`;

const ImgThumb = styled.img`
  width: ${size.imageHeight}px;
  height: 143px;
  margin-right: ${size.imageMarginRight}px;
`;

const ImgThumbEmpty = styled.div`
  width: ${size.imageHeight}px;
  height: 143px;
  margin-right: ${size.imageMarginRight}px;
  background-color: var(--desert-storm);
  border-radius: 4px;
`;


export default DashboardSeriesDetailMobile;
