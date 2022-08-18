import React from "react";
import styled from "styled-components";
import { Title3, Border1pxTiara, Body3, Body1 } from "@/styledMixins";

import NavBarDashboard from "@COMPONENTS/dashboard/NavBarDashboard3";
import FormDefault from "@COMPONENTS/FormDefault";

import DropDownGroup from "@/components/dashboard/DropDownGroup";
import SetAdultGroup from "@/components/dashboard/SetAdultGroup";
import SetTagGroup from "@/components/dashboard/SetTagGroup";
import RegisterButtonGroup from "@/components/dashboard/RegisterButtonGroup";
import PreviewButtonGroup from "@/components/dashboard/PreviewButtonGroup";
import Group63 from "@/components/dashboard/Group63";

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
};

const typeDataList = [
  "1", "2", "3"
];


function DashboardUploadSeries(props) {

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
          <SetAdultGroup toggleOnProps={"group-3-22"} />
          <SetTagGroup text_Label1={textData.label_tag_setting} className={"group-13-4"} />
          <FormDefault className={"group-11-2"} inputClassName={"summary-big"}>{textData.label_summary}</FormDefault>
          <TextLabel1>{textData.label_post_image}</TextLabel1>
          <RectangleCopy></RectangleCopy>
          <RectangleCopy3></RectangleCopy3>
          <CirclePlusSolid style={{ backgroundImage: `url(${iconAdd})` }}></CirclePlusSolid>
          <CircleInfoSolid style={{ backgroundImage: `url(${iconInfo})` }}></CircleInfoSolid>
          <TextLabel2>{textData.label_timeline}</TextLabel2>
          <RectangleCopy1></RectangleCopy1>
          <RectTimeline>{textData.label_drag_drop}</RectTimeline>
          <RectangleCopy31></RectangleCopy31>
          <CirclePlusSolid1 style={{ backgroundImage: `url(${iconAdd})` }}></CirclePlusSolid1>
          <CircleInfoSolid1 style={{ backgroundImage: `url(${iconInfo})` }}></CircleInfoSolid1>
          <RegisterButtonGroup className={"padding-group-3-16"}>{textData.label_register}</RegisterButtonGroup>
          <PreviewButtonGroup className={"padding-group-3-copy-10"} />
          {/* <Group63 text_Label={data.group63Props.label_title} /> */}
          <RectPostImage>{textData.label_drag_drop}</RectPostImage>
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

const RectangleCopy = styled.div`
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

const CirclePlusSolid = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 1235px;
  left: 844px;
  background-size: 100% 100%;
`;

const CircleInfoSolid = styled.div`
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

const RectangleCopy1 = styled.div`
  position: absolute;
  width: 700px;
  height: 300px;
  top: 1463px;
  left: 746px;
  background-color: var(--desert-storm);
  border-radius: 4px;
`;

const RectTimeline = styled.div`
  ${Body3}
  position: absolute;
  top: 1637px;
  left: 1018px;
  color: var(--deep-space-sparkle);
  text-align: center;
  line-height: 24px;
  white-space: nowrap;
`;

const RectangleCopy31 = styled.div`
  ${Border1pxTiara}
  position: absolute;
  width: 699px;
  height: 300px;
  top: 1463px;
  left: 746px;
  border-radius: 4px;
`;

const CirclePlusSolid1 = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 1601px;
  left: 1084px;
  background-size: 100% 100%;
`;

const CircleInfoSolid1 = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  top: 1425px;
  left: 956px;
  background-size: 100% 100%;
`;

const RectPostImage = styled.div`
  ${Body3}
  position: absolute;
  top: 1271px;
  left: 778px;
  color: var(--deep-space-sparkle);
  text-align: center;
  line-height: 24px;
  white-space: nowrap;
`;

export default DashboardUploadSeries;
