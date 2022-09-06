import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import styled from "styled-components";
import {
  Title3,
  Body1,
  Border2pxVioletBlue,
  Border1pxMercury,
  Body2,
  NotosansjpBoldManatee14px,
  NotosansjpBoldDeepSpaceSparkle18px,
} from "@/styledMixins";


import BrowserContainer from "@/components/dashboard/BrowserContainer";
import {BROWSER_CONTENTS_AREA_TYPE} from '@COMMON/constant';

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
    <BrowserContainer 
      backgroundColor={"var(--desert-storm)"}
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITH_WHITE_BOX}
      >
      <Container>
        <Title>{textData.label_series_detail}</Title>
        <ContentTitle>{data.title}</ContentTitle>

        <MainContainer>
          <MainImageContainer>
            <MainImage src={data.main_image} />
          </MainImageContainer>
          <MainTextContainer>
            <MainTextRowContainer>
              <MainTextLabel  extLabel3>{textData.label_category}</MainTextLabel>
              <MainDataLabel>{data.category}</MainDataLabel>
            </MainTextRowContainer>
            <MainTextRowContainer>
              <MainTextLabel  extLabel3>{textData.label_grade}</MainTextLabel>
              <MainDataLabel>{data.grade}</MainDataLabel>
            </MainTextRowContainer>
            <MainTextRowContainer>
              <MainTextLabel  extLabel3>{textData.label_status}</MainTextLabel>
              <MainDataLabel>{data.status}</MainDataLabel>
            </MainTextRowContainer>
            <MainTextRowContainer>
              <MainTextLabel  extLabel3>{textData.label_type}</MainTextLabel>
              <MainDataLabel>{data.type}</MainDataLabel>
            </MainTextRowContainer>
          </MainTextContainer>
        </MainContainer>

        <BoldTextLabel>{textData.label_summary}</BoldTextLabel>
        <TextLabel1>{data.summary}</TextLabel1>

        <BoldTextLabel>{textData.label_tag}</BoldTextLabel>
        <TagContainer>
          {data.list_tag}
        </TagContainer>

        <BoldTextLabel>{textData.label_timeline_thumb}</BoldTextLabel>
        <TimeLineContainer>
          {data.list_thumb}
        </TimeLineContainer>
      </Container>
    </BrowserContainer>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5.296610169491525vh 20%; /** 50px 400px */
`;

const Title = styled.div`
  ${Title3}
  font-size: 2.4em;
  margin-bottom: 50px;
  font-weight: 500;
  color: var(--nevada);
  white-space: nowrap;
  `;

const ContentTitle = styled.div`
  ${Title3}
  font-size: 2.4em;
  margin-bottom: 30px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 28px;
  white-space: nowrap;
`;

const MainContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
`;

const MainImageContainer = styled.div`
  margin-right: 5vh;
  flex: 1;
`;

const MainTextContainer = styled.div`
  flex: 3;
`;

const MainTextRowContainer = styled.div`
  margin-bottom: 2vh;
  display: flex;
  flex-direction: row;
`;


const BoldTextLabel = styled.div`
  ${NotosansjpBoldDeepSpaceSparkle18px}
  font-size: 1.8em;
  margin-bottom: 20px;
  min-height: 26px;
  font-weight: 700;
  letter-spacing: 1.64px;
  line-height: 26px;
  white-space: nowrap;
`;

const TimeLineContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  min-width: 640px;
`;

const TmgThumb = styled.img`
  ${Border2pxVioletBlue}
  width: 6.756756756756757vw;
  height: 143px;
  border-radius: 5px;
  object-fit: cover;
`;

const ImgThumbEmpty = styled.div`
  width: 6.756756756756757vw;
  height: 143px;
  margin-left: 20px;
  background-color: var(--desert-storm);
  border-radius: 5px;
`;

const TagContainer = styled.div`
  margin-bottom: 30px;
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


const TextLabel1 = styled.div`
  ${Body2}
  font-size: 1.6em;
  min-height: 170px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 20px;
`;

const MainTextLabel = styled.div`
  ${Body1}
  font-size: 1.6em;
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
  flex: 1;
`;

const MainDataLabel = styled.div`
  ${Body1}
  font-size: 1.6em;
  min-height: 20px;
  font-weight: 700;
  line-height: 20px;
  color: var(--vulcan);
  white-space: nowrap;
  flex: 1;
`;

const MainImage = styled.img`
  width: 200px;
  height: 300px;
`;


export default DashboardSeriesDetail;
