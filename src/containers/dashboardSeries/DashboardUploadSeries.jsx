import React, {useRef, useEffect, useState, useCallback} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title3, Border1pxTiara, Body1, NotosansjpNormalDeepSpaceSparkle14p } from "@/styledMixins";

import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import FormDefault from "@COMPONENTS/FormDefault";

import DropDownGroup from "@/components/dashboard/DropDownGroup";
import TagGroup from "@/components/dashboard/TagGroup";
import RegisterButton from "@/components/dashboard/ButtonDefault";
import PreviewButton from "@/components/dashboard/ButtonOutline";
import ImageUploadBox from '@/components/dashboard/ImageUploadContainer'
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";

import lineHorizontal from '@IMAGES/lines/authorplan-line.png';
import lineVertical from '@IMAGES/lines/dashboardeditseries-line-2.png';
import iconInfo from '@IMAGES/icons/icon_info.png';

import tempImage from '@IMAGES/dashboardseries-rectangle-copy.png';


const textData = {
  label_series_register: "シリーズ登録",
  label_series_edit: "シリーズ修正",
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
  label_r_19: "R-19",
  label_preview: "プレビュー",
  label_can_not_edit: "編集不可",
};

const typeDataList = [
  "1", "2", "3"
];


function DashboardUploadSeries(props) {
  const refIsAdult = useRef();
  const [isModeUpload, setMode] = useState();
  const params = useParams();

  let seriesData = {};

  
  const handleRegister = () => {
    console.log("refToggle", refIsAdult);
    
  }
  
  const handlePreview = () => {
    console.log("refToggle", refIsAdult);
    
  }
  
  const handlePostImageFile = useCallback((file) => {
  // 폼데이터 구성
  const formData = new FormData();
  const config = {
    header: {
      "content-type": "multipart/form-data",
    },
  };
    formData.append("file", file);
    console.log("postImage file", file);
  },[]);
  
  const handleTimelineImageFile = (file) => {
    
    console.log("handleTimelineImageFile", file);
  }
  
  useEffect(() => {
    //분기 upload or edit
    setMode( params.id === undefined );

    return () => {
    }
  }, [isModeUpload]);

  return (
    <div className="container-center-horizontal">
      <Dashboarduploadseries className="screen">
        <OverlapGroup2>
          <Line src={lineHorizontal} />
          <NavBarDashboard/>
          <Line2 src={lineVertical} />
          <form>
            <Rectangle></Rectangle>
            <Rectangle1></Rectangle1>
            <TextLabel>{isModeUpload ? textData.label_series_register : textData.label_series_edit}</TextLabel>
            <FormDefault className={""} label={textData.label_title}>{seriesData.title}</FormDefault>
            <DropDownGroup label={textData.label_type} className={`type ${isModeUpload ? '' : 'disabled'}`} dataList={typeDataList} >{"1"}</DropDownGroup>
            <DropDownGroup label={textData.label_category} className={"category"}  dataList={typeDataList} ></DropDownGroup>
            <AbultGroup >
              <TextLabelAdult >{textData.label_adult}</TextLabelAdult>
              <FlexRow >
                <Toggle ref={refIsAdult} className={"group-3-22"} selected={false} />
                <R19 >{textData.label_r_19}</R19>
              </FlexRow>
            </AbultGroup>
            <TagGroup label={textData.label_tag_setting}  ></TagGroup>
            <FormDefault className={"group-11-2"} inputClassName={"summary-big"} label={textData.label_summary}></FormDefault>
            <TextLabel1>{textData.label_post_image}</TextLabel1>
            
            <IconInfoPostimage style={{ backgroundImage: `url(${iconInfo})` }}></IconInfoPostimage>
            <TextLabel2>{textData.label_timeline}</TextLabel2>
            <RectInnerTimeline></RectInnerTimeline>
            <ImageUploadBox className={"dashboard_upload_timeline"} textDragNDrop={textData.label_drag_drop} handleFile={handleTimelineImageFile}></ImageUploadBox>
            <IconInfoTimeline style={{ backgroundImage: `url(${iconInfo})` }}></IconInfoTimeline>
            <RegisterButton text={textData.label_register} className={"padding-group-3-16"} handleClick={handleRegister} />
            <PreviewButton className={"padding-group-3-copy-10"} text={textData.label_preview} handleClick={handlePreview} />
            {/* <Group63 text_Label={data.group63Props.label_title} /> */}
            <ImageUploadBox textDragNDrop={textData.label_drag_drop} handleFile={handlePostImageFile}>{tempImage}</ImageUploadBox>
          </form>
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
