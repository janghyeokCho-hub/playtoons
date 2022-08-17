import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import styled from "styled-components";
import {
  Title3,
  Border1pxTiara,
  Border2pxVioletBlue,
  Body1,
  Border1pxMercury,
  Body2,
  NotosansjpBoldManatee14px,
  NotosansjpBoldDeepSpaceSparkle18px,
} from "@/styledMixins";

import NavBarDashboard3 from "@/components/dashboard/NavBarDashboard3";
import lineHorizontal from '@LINES/authorplan-line.png';
import lineVertical from '@LINES/dashboardeditseries-line-2.png';

const textData = {
  label_timeline_thumb: "タイムラインのサムネイル",
  label_tag: "タグ",
  label_summary: "説明",
  label_category: "カテゴリ",
  label_grade: "指定",
  label_status: "状態",
  label_type: "タイプ",
  label_series_detail: "シリーズ詳細",
  label_series_detail_on_topbar: "シリーズ詳細",
};


function DashboardSeriesDetail(props) {

  let params = useParams('id');

  //init state
  const [data, setData] = useState({
    list_thumb: [],
    list_tag: [],
    summary: <React.Fragment></React.Fragment>,
    title: "",
    category: "",
    grade: "",
    status: "",
    type: "",
    main_image: "",
  });

  let getThumbList = () => {
    const list_data = ["/img/dashboardeditseries-rectangle-A6ABA42F-608D-4767-8DC4-E043B4D54714.png", "", "", "", "", ""];

    return list_data.map( (data, index) => {
      return "" === data ? <ImgThumbEmpty key={index}></ImgThumbEmpty> : <TmgThumb key={index} src={data} />;
    } );
  }

  let getTagList = () => {
    const list_data = ["#アクション", "#異世界"];

    return list_data.map( (data, index) => {
      return index === 0 ? <TagPaddingGroup key={index}><TagBox>{data}</TagBox></TagPaddingGroup> : 
        <TagPaddingGroupMargin key={index}><TagBox>{data}</TagBox></TagPaddingGroupMargin>;
    });
  }

  //put data to elements
  useEffect(() => {

    setData({
      list_thumb: [getThumbList()],
      list_tag: [getTagList()],
      summary: <React.Fragment>No.13の災害後、人類はシェルターにバラバラに散った。<br />そして、奇妙なロボット”クモ”の出現によりシェルター周辺に防壁が張り<br />巡らされた。クモと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。そこで、レンジャーたちは人間と機械を融合する<br />アダマ手術を施し、クモに挑むが…果たしてレンジャーたちの行く末は..? <br />クモの正体、そして突如現れた謎の組織カンパニーヌルの正体とは…?!</React.Fragment>,
      title: "シェルターアーク・世界を滅ぼすものたち",
      category: "アクション",
      grade: "R18",
      status: "連載中",
      type: "マンガ",
      main_image: "/img/seriesdetail-rectangle-687DCD34-070C-4921-9138-C8232C25D128.png",
    });
  
    return () => {
    }
  }, []);
  

  return (
    <div className="container-center-horizontal">
      <Dashboardseriesdetail className="screen">
        <OverlapGroup1>
          <Line src={lineHorizontal} />
          <NavBarDashboard3 />
          <Line2 src={lineVertical} />
          <Rectangle></Rectangle>
          <Rectangle1></Rectangle1>
          <Rectangle2></Rectangle2>
          <Group4>
            <TextLabel>{textData.label_timeline_thumb}</TextLabel>
            <FlexRow>
              {data.list_thumb}
            </FlexRow>
          </Group4>
          <Group7>
            <TextLabel>{textData.label_tag}</TextLabel>
            <TagContainer>
              {data.list_tag}
            </TagContainer>
          </Group7>
          <Group8>
            <TextLabel>{textData.label_summary}</TextLabel>
            <TextLabel1>{data.summary}</TextLabel1>
          </Group8>
          <TextLabel2>{data.title}</TextLabel2>
          <Group3>
            <TextLabelContainer>
              <TextLabel3>{textData.label_category}</TextLabel3>
              <TextLabel4>{textData.label_grade}</TextLabel4>
              <TextLabel5>{textData.label_status}</TextLabel5>
              <TextLabel5>{textData.label_type}</TextLabel5>
            </TextLabelContainer>
            <FlexCol>
              <TextLabel6>{data.category}</TextLabel6>
              <Price>{data.grade}</Price>
              <TextLabel7>{data.status}</TextLabel7>
              <TextLabel7>{data.type}</TextLabel7>
            </FlexCol>
          </Group3>
          <Rectangle4 src={data.main_image} />
          <TextLabel8>{textData.label_series_detail}</TextLabel8>
          {/* <TopbarTitle text_Label={textData.label_series_detail_on_topbar} /> */}
        </OverlapGroup1>
      </Dashboardseriesdetail>
    </div>
  );
}

const Dashboardseriesdetail = styled.div `
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  height: 1311px;
  min-width: 1920px;
  overflow-x: hidden;
`;



const OverlapGroup1 = styled.div`
  ${Title3}
  width: 1922px;
  height: 3512px;
  /* position: relative; */
`;

const Line = styled.img`
  position: absolute;
  width: 1922px;
  height: 2px;
  top: 88px;
  left: 0;
`;

const Line2 = styled.img`
  position: absolute;
  width: 2px;
  height: 3080px;
  top: 90px;
  left: 300px;
`;

const Rectangle = styled.div`
  position: absolute;
  width: 1619px;
  height: 2093px;
  top: 90px;
  left: 302px;
  background-color: var(--white);
`;

const Rectangle1 = styled.div`
  position: absolute;
  width: 1619px;
  height: 3422px;
  top: 90px;
  left: 302px;
  background-color: var(--desert-storm);
`;

const Rectangle2 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 1523px;
  height: 1125px;
  top: 138px;
  left: 350px;
  background-color: var(--white);
  border-radius: 8px;
`;

const Group4 = styled.div`
  position: absolute;
  width: 640px;
  top: 1026px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 189px;
`;

const TextLabel = styled.div`
  ${NotosansjpBoldDeepSpaceSparkle18px}
  min-height: 26px;
  font-weight: 700;
  letter-spacing: 1.64px;
  line-height: 26px;
  white-space: nowrap;
`;

const FlexRow = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  min-width: 640px;
`;

const TmgThumb = styled.img`
  ${Border2pxVioletBlue}
  width: 90px;
  height: 143px;
  border-radius: 5px;
  object-fit: cover;
`;

const ImgThumbEmpty = styled.div`
  width: 90px;
  height: 143px;
  margin-left: 20px;
  background-color: var(--desert-storm);
  border-radius: 5px;
`;

const Group7 = styled.div`
  position: absolute;
  width: 238px;
  top: 916px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 86px;
`;

const TagContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  min-width: 238px;
`;

const TagPaddingGroup = styled.div`
  ${Border1pxMercury}
  height: 40px;
  display: flex;
  padding: 9px 17.7px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 126px;
  background-color: var(--white);
  border-radius: 5px;
`;

const TagBox = styled.div`
  ${NotosansjpBoldManatee14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;

const TagPaddingGroupMargin = styled.div`
  ${Border1pxMercury}
  height: 40px;
  margin-left: 16px;
  display: flex;
  padding: 9px 17.7px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 96px;
  background-color: var(--white);
  border-radius: 5px;
`;

const Group8 = styled.div`
  position: absolute;
  width: 609px;
  top: 676px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 216px;
`;

const TextLabel1 = styled.div`
  ${Body2}
  min-height: 170px;
  margin-top: 20px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 20px;
`;

const TextLabel2 = styled.div`
  position: absolute;
  top: 268px;
  left: 746px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 28px;
  white-space: nowrap;
`;

const Group3 = styled.div`
  ${Body1}
  position: absolute;
  height: 187px;
  top: 328px;
  left: 994px;
  display: flex;
  align-items: flex-start;
  min-width: 174px;
`;

const TextLabelContainer = styled.div`
  width: 76px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 187px;
`;

const TextLabel3 = styled.div`
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel4 = styled.div`
  min-height: 20px;
  margin-top: 35px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel5 = styled.div`
  min-height: 20px;
  margin-top: 36px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const FlexCol = styled.div`
  width: 88px;
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 187px;
`;

const TextLabel6 = styled.div`
  min-height: 20px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Price = styled.div`
  min-height: 20px;
  margin-top: 35px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel7 = styled.div`
  min-height: 20px;
  margin-top: 36px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Rectangle4 = styled.img`
  position: absolute;
  width: 200px;
  height: 300px;
  top: 328px;
  left: 746px;
`;

const TextLabel8 = styled.div`
  position: absolute;
  top: 192px;
  left: 746px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
  white-space: nowrap;
`;

export default DashboardSeriesDetail;
