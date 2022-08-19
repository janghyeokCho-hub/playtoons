import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import { Title3, Border1pxTiara, Body3, Body1, NotosansjpNormalDeepSpaceSparkle14p } from "@/styledMixins";

import NavBarDashboard from "@COMPONENTS/dashboard/NavBarDashboard3";
import FormDefault from "@COMPONENTS/FormDefault";

import DropDownGroup from "@/components/dashboard/DropDownGroup";
import TagGroup from "@/components/dashboard/SetTagGroup";
import RegisterButtonGroup from "@/components/dashboard/RegisterButtonGroup";
import PreviewButtonGroup from "@/components/dashboard/PreviewButtonGroup";
import Group63 from "@/components/dashboard/Group63";
import ImageUploadBox from '@COMPONENTS/dashboard/ImageUploadBox'
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";

import lineHorizontal from '@IMAGES/lines/authorplan-line.png';
import lineVertical from '@IMAGES/lines/dashboardeditseries-line-2.png';
import iconAdd from '@IMAGES/icons/icon_add.png';
import iconInfo from '@IMAGES/icons/icon_info.png';


const textData = {
  label_series_register: "シリーズ登録",
  label_post_image: "表紙",
  label_timeline: "タイムラインのサムネイル",
  label_drag_drop: "ドラッグ＆ドロップ",
  label_title: "タイトル",
  label_type: "タイプ",
  label_category: "カテゴリ",
  label_tag_setting: "タグ設定",
  label_register: "登録する",
  label_summary: "説明",
  label_adult: "年齢設定",
  label_r_19: "R-19"
};

const typeDataList = [
  "1", "2", "3"
];


function DashboardUploadSeries(props) {
  const refToggle = useRef();

  const handleRegister = () => {
    console.log("refToggle", refToggle);

  }

  const handlePostImageFile = (file) => {
      // 폼데이터 구성
      const formData = new FormData();
      const config = {
        header: {
          "content-type": "multipart/form-data",
        },
      };
      formData.append("file", file);
      console.log("postImage file", file);
    }
    
    const handleTimelineImageFile = (file) => {
      
      console.log("handleTimelineImageFile", file);
  }

  useEffect(() => {
    return () => {
    }
  }, []);

  return (
    <div className="container-center-horizontal">
      <Dashboarduploadseries className="screen">
        <OverlapGroup2>
          <Line src={lineHorizontal} />
          <NavBarDashboard/>
          <Line2 src={lineVertical} />
          <Rectangle></Rectangle>
          <Rectangle1></Rectangle1>
          <TextLabel>{textData.label_series_register}</TextLabel>
          <FormDefault className={"group-7-24"}>{textData.label_title}</FormDefault>
          <DropDownGroup text_Label={textData.label_type} className={"group-8-1"} dropdownClassName={"group-3-30"} dataList={typeDataList} />
          <DropDownGroup text_Label={textData.label_category} dropdownClassName={"group-3-31"} />
          <AbultGroup className={`group-10-1`}>
            <TextLabelAdult className="text_label-174">{textData.label_adult}</TextLabelAdult>
            <FlexRow className="flex-row-30">
              <Toggle ref={refToggle} className={"group-3-22"} />
              <R19 className="r-19-1">{textData.label_r_19}</R19>
            </FlexRow>
          </AbultGroup>
          <TagGroup text_Label1={textData.label_tag_setting} className={"group-13-4"} />
          <FormDefault className={"group-11-2"} inputClassName={"summary-big"}>{textData.label_summary}</FormDefault>
          <TextLabel1>{textData.label_post_image}</TextLabel1>
          <RectInnerPostImage></RectInnerPostImage>
          <IconAddPostimage style={{ backgroundImage: `url(${iconAdd})` }}></IconAddPostimage>
          <IconInfoPostimage style={{ backgroundImage: `url(${iconInfo})` }}></IconInfoPostimage>
          <TextLabel2>{textData.label_timeline}</TextLabel2>
          <RectInnerTimeline></RectInnerTimeline>
          <ImageUploadBox className={"dashboard_upload_timeline"} textDragNDrop={textData.label_drag_drop} handleFile={handleTimelineImageFile}></ImageUploadBox>
          <IconAddTimeline style={{ backgroundImage: `url(${iconAdd})` }}></IconAddTimeline>
          <IconInfoTimeline style={{ backgroundImage: `url(${iconInfo})` }}></IconInfoTimeline>
          <RegisterButtonGroup className={"padding-group-3-16"} handleClick={handleRegister}>{textData.label_register}</RegisterButtonGroup>
          <PreviewButtonGroup className={"padding-group-3-copy-10"} />
          {/* <Group63 text_Label={data.group63Props.label_title} /> */}
          <ImageUploadBox textDragNDrop={textData.label_drag_drop} handleFile={handlePostImageFile}></ImageUploadBox>
        </OverlapGroup2>
      </Dashboarduploadseries>
    </div>
  );
}


const Dashboarduploadseries = styled.div `
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  height: 1947px;
  min-width: 1920px;
  overflow-x: hidden;
`;



const OverlapGroup2 = styled.div`
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
  height: 3422px;
  top: 90px;
  left: 302px;
  background-color: var(--desert-storm);
`;

const Rectangle1 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 1523px;
  height: 1761px;
  top: 138px;
  left: 350px;
  background-color: var(--white);
  border-radius: 8px;
`;

const TextLabel = styled.div`
  ${Title3}
  position: absolute;
  top: 186px;
  left: 746px;
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
  white-space: nowrap;
`;

const TextLabel1 = styled.div`
  ${Body1}
  position: absolute;
  top: 1057px;
  left: 746px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const RectInnerPostImage = styled.div`
  position: absolute;
  width: 220px;
  height: 300px;
  top: 1097px;
  left: 746px;
  background-color: var(--desert-storm);
  border-radius: 4px;
`;

const RectangleCopy3 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 220px;
  height: 300px;
  top: 1099px;
  left: 746px;
  border-radius: 4px;
`;

const IconAddPostimage = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 1235px;
  left: 844px;
  background-size: 100% 100%;
`;

const IconInfoPostimage = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 1059px;
  left: 788px;
  background-size: 100% 100%;
`;

const TextLabel2 = styled.div`
  ${Body1}
  position: absolute;
  top: 1423px;
  left: 746px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const RectInnerTimeline = styled.div`
  position: absolute;
  width: 700px;
  height: 300px;
  top: 1463px;
  left: 746px;
  background-color: var(--desert-storm);
  border-radius: 4px;
`;

const IconAddTimeline = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 1601px;
  left: 1084px;
  background-size: 100% 100%;
`;

const IconInfoTimeline = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 1425px;
  left: 956px;
  background-size: 100% 100%;
`;



const Toggle = styled(ToggleOn)`
  position: static;
`;

const AbultGroup = styled.div`
  position: absolute;
  width: 100px;
  top: 589px;
  left: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 71px;

  &.group-10-1.group-6-20 {
    top: 1579px;
    left: 762px;
  }
`;

const TextLabelAdult = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const FlexRow = styled.div`
  height: 31px;
  position: relative;
  margin-top: 20px;
  display: flex;
  align-items: center;
  min-width: 103px;
`;

const R19 = styled.div`
  ${NotosansjpNormalDeepSpaceSparkle14p}
  min-height: 20px;
  margin-left: 10px;
  margin-bottom: 1px;
  min-width: 37px;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;


export default DashboardUploadSeries;
