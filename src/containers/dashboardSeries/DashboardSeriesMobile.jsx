import React, { useEffect } from "react";
import styled from "styled-components";
import { Body8, Body5, Body7 } from "../../styledMixins";

import Group411 from "@COMPONENTS/Group411";

// import {requestPromise} from '../../utils';

//temp data
import rectCopy from "@IMAGES/dashboardseries-rectangle-copy.png";
import rect from "@IMAGES/mdashboardseries-rectangle.jpg";

const data = {
  barsLight1:
    "/img/mdashboardreactionlist-shape-9D9900B8-B5B9-4BC7-808B-EE0ADFC96C58@2x.png",
  group19: "/img/mwebtoon-image-1-66D56EC8-5C41-493B-94B2-0CD30EE806ED@2x.png",
  magnifyingGlassLight1:
    "/img/mregisterauthor-shape-65A9CAC0-DFF6-47B9-ABB3-0702BE83D6CE@2x.png",
  squarePenLight:
    "/img/mauthorpost-shape-943C049B-C045-4279-8169-EF71E55D6790@2x.png",
  text_Label1: "シリーズリスト",

  rectangle1:
    "/img/mdashboardseries-rectangle-C81FC714-6BCF-4E31-A0B0-3854433EEF8A.jpg",
  text_Label2: "大学のリンゴ一個の重さで10メートル…",
  x202206011: "掲載日：2022/06/01",
  text_Label3: "カテゴリ：アクション",
  text_Label4: "ウェブトゥーン",
  text_Label5: "状態",
  text_Label6: "連載中",

  rectangle2:
    "/img/mdashboardseries-rectangle-1233195B-5FA1-451B-8732-1104A315AF0D@2x.png",
  text_Label7: "大学のリンゴ一個の重さで10メートル…",
  x202206012: "掲載日：2022/06/01",
  text_Label8: "カテゴリ：アクション",
  text_Label9: "ウェブトゥーン",
  text_Label10: "状態",
  x20220610: " 休載中(2022/06/10~)",
};

function DashboardSeriesMobile(props) {
  useEffect(() => {
    console.log("useEffect");
    // get dashboard list
    // let params = {};
    // requestPromise("POST", params)
    // .then((response) => {

    //   <Group>
    //     <FlexRow>
    //       <Rectangle2 src={rectCopy} />
    //       <FlexCol>
    //         <TextLabel1>{data.text_Label2}</TextLabel1>
    //         <X20220601>{data.x202206011}</X20220601>
    //         <TextLabel2>{data.text_Label3}</TextLabel2>
    //         <TextLabel3>{data.text_Label4}</TextLabel3>
    //       </FlexCol>
    //     </FlexRow>
    //     <OverlapGroup>
    //       <Rectangle3></Rectangle3>
    //     </OverlapGroup>
    //     <TextLabelContainer>
    //       <TextLabel4>{data.text_Label5}</TextLabel4>
    //       <TextLabel5>{data.text_Label6}</TextLabel5>
    //     </TextLabelContainer>
    //     <Rectangle4></Rectangle4>
    //     <Group411 />
    //     <RectangleCopy></RectangleCopy>
    //   </Group>

    // })
    // .catch((error) => {

    // });
  });

  return (
    <div className="container-center-horizontal">
      <DashboardseriesMobile className="screen">
        <Rectangle></Rectangle>
        <TextLabel>{data.text_Label1}</TextLabel>
        <Rectangle1></Rectangle1>
        <Rectangle></Rectangle>
        <RectangleCopy3></RectangleCopy3>
        <div id="m_dashboard_list">
          <Group>
            <FlexRow>
              <Rectangle2 src={rectCopy} />
              <FlexCol>
                <TextLabel1>{data.text_Label2}</TextLabel1>
                <X20220601>{data.x202206011}</X20220601>
                <TextLabel2>{data.text_Label3}</TextLabel2>
                <TextLabel3>{data.text_Label4}</TextLabel3>
              </FlexCol>
            </FlexRow>
            <OverlapGroup>
              <Rectangle3></Rectangle3>
            </OverlapGroup>
            <TextLabelContainer>
              <TextLabel4>{data.text_Label5}</TextLabel4>
              <TextLabel5>{data.text_Label6}</TextLabel5>
            </TextLabelContainer>
            <Rectangle4></Rectangle4>
            <Group411 />
            <RectangleCopy></RectangleCopy>
          </Group>

          <Group>
            <FlexRow>
              <Rectangle5 src={rect} />
              <FlexCol>
                <TextLabel1>{data.text_Label7}</TextLabel1>
                <X20220601>{data.x202206012}</X20220601>
                <TextLabel2>{data.text_Label8}</TextLabel2>
                <TextLabel3>{data.text_Label9}</TextLabel3>
              </FlexCol>
            </FlexRow>
            <OverlapGroup>
              <Rectangle3></Rectangle3>
            </OverlapGroup>
            <FlexRow1>
              <TextLabel4>{data.text_Label10}</TextLabel4>
              <X20220610>{data.x20220610}</X20220610>
            </FlexRow1>
            <Rectangle4></Rectangle4>
            <Group411 />
            <RectangleCopy></RectangleCopy>
          </Group>
        </div>
      </DashboardseriesMobile>
    </div>
  );
}

const DashboardseriesMobile = styled.div`
  align-items: center;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  min-height: 746px;
  overflow-x: hidden;
  width: 375px;
`;

const OverlapGroup2 = styled.div`
  height: 50px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 375px;
  background-color: var(--white);
`;

const BarsLight1 = styled.div`
  width: 16px;
  height: 13px;
  margin-top: 1px;
  background-size: 100% 100%;
`;

const Group19 = styled.div`
  width: 113px;
  height: 18px;
  margin-left: 8px;
  background-size: 100% 100%;
`;

const MagnifyingGlassLight1 = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 102px;
  background-size: 100% 100%;
`;

const SquarePenLight = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  background-size: 100% 100%;
`;

const Oval = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;

const Rectangle = styled.div`
  width: 375px;
  height: 1px;
  background-color: var(--mercury);
`;

const TextLabel = styled.div`
  ${Body5}
  min-height: 16px;
  margin-top: 12px;
  margin-left: 3px;
  min-width: 108px;
  font-weight: 500;
  color: var(--vulcan);
  line-height: 16px;
  white-space: nowrap;
`;

const Rectangle1 = styled.div`
  width: 100px;
  height: 2px;
  margin-top: 10px;
  margin-right: 1px;
  background-color: var(--violet-blue);
`;

const RectangleCopy3 = styled.div`
  width: 375px;
  height: 5px;
  margin-top: 47px;
  margin-right: 2px;
  background-color: var(--mercury);
`;

const Group = styled.div`
  width: 375px;
  position: relative;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 269px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: flex-start;
  min-width: 343px;
`;

const Rectangle2 = styled.img`
  width: 88px;
  height: 134px;
  border-radius: 4px;
  object-fit: cover;
`;

const FlexCol = styled.div`
  width: 239px;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 74px;
`;

const TextLabel1 = styled.div`
  ${Body7}
  min-height: 14px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const X20220601 = styled.div`
  ${Body8}
  min-height: 14px;
  margin-top: 4px;
  color: var(--manatee);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel2 = styled.div`
  ${Body8}
  min-height: 14px;
  margin-top: 4px;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel3 = styled.div`
  ${Body5}
  min-height: 16px;
  margin-top: 8px;
  font-weight: 500;
  color: var(--violet-blue);
  line-height: 16px;
  white-space: nowrap;
`;

const OverlapGroup = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  min-width: 343px;
  background-color: var(--mercury);
`;

const Rectangle3 = styled.div`
  width: 343px;
  height: 1px;
  background-color: var(--mercury);
`;

const TextLabelContainer = styled.div`
  ${Body5}
  height: 16px;
  margin-top: 16px;
  margin-left: 3px;
  display: flex;
  align-items: flex-start;
  min-width: 314px;
`;

const TextLabel4 = styled.div`
  min-height: 16px;
  min-width: 33px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
`;

const TextLabel5 = styled.div`
  min-height: 16px;
  margin-left: 233px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
`;

const Rectangle4 = styled.div`
  width: 343px;
  height: 1px;
  margin-top: 16px;
  background-color: var(--mercury);
`;

const RectangleCopy = styled.div`
  width: 375px;
  height: 5px;
  margin-top: 16px;
  background-color: var(--mercury);
`;

const Rectangle5 = styled.img`
  width: 88px;
  height: 134px;
`;

const FlexRow1 = styled.div`
  ${Body5}
  height: 16px;
  margin-top: 16px;
  margin-left: 18px;
  display: flex;
  align-items: flex-start;
  min-width: 329px;
`;

const X20220610 = styled.div`
  min-height: 16px;
  margin-left: 138px;
  font-weight: 500;
  color: var(--bright-gray);
  line-height: 16px;
  white-space: nowrap;
`;

export default DashboardSeriesMobile;
