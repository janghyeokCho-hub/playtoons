import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Body8, Border1pxTiara, Body7 } from "@/styledMixins";

import line from '@LINES/mdashboardseriesdetail-rectangle.png';
import roundRetangle from '@IMAGES/mdashboardseriesdetail-round-rectangle.png';

import Group37 from "@COMPONENTS/dashboard/Group37";
import PaddingGroup14Copy3 from "@COMPONENTS/dashboard/PaddingGroup14Copy3";
import PaddingGroup14Copy72 from "@COMPONENTS/dashboard/PaddingGroup14Copy72";
import TagePaddingGroup from "@/components/dashboard/DetailMobileTagContainer";

const textData = {
  label_title: "シリーズ詳細",
  label_category: "カテゴリ",
  label_grade: "指定",
  label_status: "状態",
  label_type: "タイプ",
  label_summary: "説明",
  label_tag: "タグ",
  label_timeline_thumb: "タイムラインのサムネイル",
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
    const list_data = ["/img/dashboardeditseries-rectangle-A6ABA42F-608D-4767-8DC4-E043B4D54714.png", "", "", "", "", ""];

    return list_data.map( (data, index) => {
      let leftPosition = (102 * index) + 32;
      leftPosition = leftPosition + "px";
      return "" === data ? <ImgThumbEmpty key={index} leftPosition={leftPosition}></ImgThumbEmpty> : 
        <ImgThumb src={data} key={index} leftPosition={leftPosition}  />;
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
      main_image: "/img/mdashboardseriesdetail-rectangle-828EA7C7-90D1-4C5E-86E4-1D097EC41C7D@2x.png",  //메인이미지
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
    <div className="container-center-horizontal">
      <MDashboardseriesdetail className="screen">
        {/* <Group37 text_Label={textData.label_title.text_Label} /> */}
        <OverlapGroup3>
          <Rectangle></Rectangle>
          <TagListContainer>
            {getTagList()}
          </TagListContainer>
          <TextLabelSummary>{textData.label_summary}</TextLabelSummary>
          <Line1 src={line} />
          <Line2 src={line} />
          <Line3 src={line} />
          <Title>{data.text_title}</Title>
          <Type>{data.text_type}</Type>
          <Category>{data.text_category}</Category>
          <Grade>{data.text_grade}</Grade>
          <Status>{data.text_status}</Status>
          <TextLabelType>{textData.label_type}</TextLabelType>
          <TextLabelTag>{textData.label_tag}</TextLabelTag>
          <TextLabelTimeLine>{textData.label_timeline_thumb}</TextLabelTimeLine>
          <TextLabelCategory>{textData.label_category}</TextLabelCategory>
          <Summary>{data.text_summary}</Summary>
          <TextLabelGrade>{textData.label_grade}</TextLabelGrade>
          <TextLabelStatus>{textData.label_status}</TextLabelStatus>
          <MainImage src={data.main_image} />
          {/* 가로 스크로 컨테이너 필요  */}
          {getThumbList()}    
          <BackgroudRoundRect src={roundRetangle} />
        </OverlapGroup3>
      </MDashboardseriesdetail>
    </div>
  );
}

const MDashboardseriesdetail = styled.div `
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  min-height: 964px;
  position: relative;
  width: 375px;
`;


const OverlapGroup3 = styled.div`
  width: 375px;
  height: 3177px;
  position: relative;
  background-color: var(--desert-storm);
`;

const Rectangle = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 343px;
  height: 808px;
  top: 32px;
  left: 16px;
  background-color: var(--white);
  border-radius: 4px;
`;

const TagListContainer = styled.div `
  height: 27px;
  display: flex;
  padding: 4px 7.9px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 68px;
  border-radius: 4px;
  position: absolute;
  top : 600px;
  left: 20px;
`;

const TextLabelSummary = styled.div`
  ${Body7}
  position: absolute;
  top: 344px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const Line1 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 327px;
  left: 32px;
`;

const Line2 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 552px;
  left: 32px;
`;

const Line3 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 638px;
  left: 32px;
`;

const Title = styled.div`
  ${Body7}
  position: absolute;
  top: 48px;
  left: 136px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
`;

const Type = styled.div`
  ${Body7}
  position: absolute;
  top: 297px;
  left: 304px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const Category = styled.div`
  ${Body7}
  position: absolute;
  top: 207px;
  left: 278px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const Grade = styled.div`
  ${Body7}
  position: absolute;
  top: 237px;
  left: 317px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const Status = styled.div`
  ${Body7}
  position: absolute;
  top: 267px;
  left: 304px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabelType = styled.div`
  ${Body7}
  position: absolute;
  top: 297px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabelTag = styled.div`
  ${Body7}
  position: absolute;
  top: 569px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabelTimeLine = styled.div`
  ${Body7}
  position: absolute;
  top: 655px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const Summary = styled.div`
  ${Body8}
  position: absolute;
  width: 312px;
  top: 370px;
  left: 32px;
  color: var(--nevada);
  line-height: 14px;
`;

const TextLabelCategory = styled.div`
  ${Body7}
  position: absolute;
  top: 207px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabelGrade = styled.div`
  ${Body7}
  position: absolute;
  top: 237px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabelStatus = styled.div`
  ${Body7}
  position: absolute;
  top: 267px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const MainImage = styled.img`
  position: absolute;
  width: 88px;
  height: 134px;
  top: 48px;
  left: 32px;
`;

const ImgThumb = styled.img`
  position: absolute;
  width: 90px;
  height: 143px;
  top: 681px;
  left: ${(props) => props.leftPosition};
`;

const ImgThumbEmpty = styled.div`
  position: absolute;
  width: 90px;
  height: 143px;
  top: 681px;
  left: ${(props) => props.leftPosition};
  background-color: var(--desert-storm);
  border-radius: 4px;
`;

const RectangleCopy2 = styled.div`
  position: absolute;
  width: 90px;
  height: 143px;
  top: 681px;
  left: 236px;
  background-color: var(--desert-storm);
  border-radius: 4px;
`;

const BackgroudRoundRect = styled.img`
  position: absolute;
  width: 20px;
  height: 143px;
  top: 681px;
  left: 338px;
`;

export default DashboardSeriesDetailMobile;
