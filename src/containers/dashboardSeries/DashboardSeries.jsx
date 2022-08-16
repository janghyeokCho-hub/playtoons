import React from "react";
import styled from "styled-components";
import {
  NotosansjpBoldVioletBlue14px,
  Title1,
  Body3,
  Border1pxMercury,
  Body1,
  Border1pxVioletBlue,
} from "@/styledMixins";
import line1 from "@LINES/authorplan-line.png";
import line2 from "@LINES/dashboardeditseries-line-2.png";
import rectCopy from "@IMAGES/dashboardseries-rectangle-copy.png";
import iconPathRight from "@ICONS/dashboardseries-path-right.png";
import rect from "@IMAGES/mdashboardseries-rectangle.jpg";
import iconPathPlus from "@ICONS/dashboardseries-path-plus.png";

import Topbar from "@COMPONENTS/Topbar";
import NavBarDashboard3 from "@COMPONENTS/NavBarDashboard3";

function DashboardSeries(props) {
  return (
    <div className="container-center-horizontal">
      <Dashboardseries className="screen">
        <OverlapGroup1>
          <Line src={line1} />
          <NavBarDashboard3 />
          <Line2 src={line2} />
          <Rectangle></Rectangle>
          <TextLabel>{"阿修羅ゲート"}</TextLabel>
          <TextLabel1>{"シェルターアーク"}</TextLabel1>
          <Date>{"2022/06/11"}</Date>
          <Copy>{"アクション"}</Copy>
          <Number>{"1"}</Number>
          <TextLabel2>{"ウェブトゥーン"}</TextLabel2>
          <X20220610>
            <React.Fragment>
              休載中
              <br />
              (2022/06/10~)
            </React.Fragment>
          </X20220610>
          <RectangleCopy167></RectangleCopy167>
          <RectangleCopy src={rectCopy} />
          <AngleRightSolidCopy
            style={{ backgroundImage: `url(${iconPathRight})` }}
          ></AngleRightSolidCopy>
          <Date1>{"2022/06/11"}</Date1>
          <TextLabel3>{"アクション"}</TextLabel3>
          <Rectangle1></Rectangle1>
          <TextLabel4>{"番号"}</TextLabel4>
          <TextLabel5>{"表紙"}</TextLabel5>
          <TextLabel6>{"タイトル"}</TextLabel6>
          <TextLabel7>{"タイプ"}</TextLabel7>
          <TextLabel8>{"掲載日"}</TextLabel8>
          <TextLabel9>{"カテゴリ"}</TextLabel9>
          <TextLabel10>{"状態"}</TextLabel10>
          <Number1>{"1"}</Number1>
          <TextLabel11>{"ウェブトゥーン"}</TextLabel11>
          <TextLabel12>{"連載中"}</TextLabel12>
          <RectangleCopy166></RectangleCopy166>
          <Rectangle2 src={rect} />
          <TextLabel13>{"シリーズリスト"}</TextLabel13>
          <AngleRightSolid
            style={{ backgroundImage: `url(${iconPathRight})` }}
          ></AngleRightSolid>
          <PaddingGroup3>
            <PlusSolid
              style={{ backgroundImage: `url(${iconPathPlus})` }}
            ></PlusSolid>
            <TextLabel14>{"シリーズを追加"}</TextLabel14>
          </PaddingGroup3>
          <Topbar />
        </OverlapGroup1>
      </Dashboardseries>
    </div>
  );
}

const Dashboardseries = styled.div`
  align-items: flex-start;
  background-color: var(--white);
  display: flex;
  height: 1512px;
  overflow: hidden;
  width: 100%;
`;


const OverlapGroup1 = styled.div`
  width: 1922px;
  height: 3180px;
  position: relative;
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
  top: 100px;
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

const TextLabel = styled.div`
  ${Body3}
  position: absolute;
  top: 410px;
  left: 796px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel1 = styled.div`
  ${Body3}
  position: absolute;
  top: 618px;
  left: 782px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Date = styled.div`
  ${Body3}
  position: absolute;
  top: 618px;
  left: 1356px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Copy = styled.div`
  ${Body3}
  position: absolute;
  top: 618px;
  left: 1222px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Number = styled.div`
  ${Body1}
  position: absolute;
  top: 608px;
  left: 408px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel2 = styled.div`
  ${Body3}
  position: absolute;
  width: 126px;
  top: 618px;
  left: 1050px;
  color: var(--violet-blue);
  line-height: 20px;
  white-space: nowrap;
`;

const X20220610 = styled.div`
  ${Body3}
  position: absolute;
  width: 126px;
  top: 608px;
  left: 1497px;
  color: var(--vulcan);
  text-align: center;
  line-height: 20px;
`;

const RectangleCopy167 = styled.div`
  position: absolute;
  width: 1522px;
  height: 1px;
  top: 717px;
  left: 352px;
  background-color: var(--mercury);
`;

const RectangleCopy = styled.img`
  position: absolute;
  width: 88px;
  height: 134px;
  top: 551px;
  left: 512px;
  border-radius: 5px;
  object-fit: cover;
`;

const AngleRightSolidCopy = styled.div`
  position: absolute;
  width: 9px;
  height: 16px;
  top: 610px;
  left: 1834px;
  background-size: 100% 100%;
`;

const Date1 = styled.div`
  ${Body3}
  position: absolute;
  top: 410px;
  left: 1356px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel3 = styled.div`
  ${Body3}
  position: absolute;
  top: 410px;
  left: 1222px;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Rectangle1 = styled.div`
  ${Border1pxMercury}
  position: absolute;
  width: 1524px;
  height: 60px;
  top: 260px;
  left: 350px;
  background-color: var(--desert-storm);
`;

const TextLabel4 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 396px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel5 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 538px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel6 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 808px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel7 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 1086px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel8 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 1378px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel9 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 1232px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel10 = styled.div`
  ${Body1}
  position: absolute;
  top: 281px;
  left: 1544px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const Number1 = styled.div`
  ${Body1}
  position: absolute;
  top: 409px;
  left: 408px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel11 = styled.div`
  ${Body3}
  position: absolute;
  width: 126px;
  top: 410px;
  left: 1050px;
  color: var(--violet-blue);
  line-height: 20px;
  white-space: nowrap;
`;

const TextLabel12 = styled.div`
  ${Body3}
  position: absolute;
  width: 126px;
  top: 410px;
  left: 1497px;
  color: var(--vulcan);
  text-align: center;
  line-height: 20px;
  white-space: nowrap;
`;

const RectangleCopy166 = styled.div`
  position: absolute;
  width: 1522px;
  height: 1px;
  top: 518px;
  left: 352px;
  background-color: var(--mercury);
`;

const Rectangle2 = styled.img`
  position: absolute;
  width: 88px;
  height: 134px;
  top: 352px;
  left: 512px;
  border-radius: 5px;
  object-fit: cover;
`;

const TextLabel13 = styled.h1`
  ${Title1}
  position: absolute;
  top: 176px;
  left: 350px;
  color: var(--vulcan);
  line-height: 36px;
  white-space: nowrap;
`;

const AngleRightSolid = styled.div`
  position: absolute;
  width: 9px;
  height: 16px;
  top: 411px;
  left: 1834px;
  background-size: 100% 100%;
`;

const PaddingGroup3 = styled.div`
  ${Border1pxVioletBlue}
  position: absolute;
  height: 40px;
  top: 176px;
  left: 1700px;
  display: flex;
  padding: 9px 17.7px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 173px;
  background-color: var(--white);
  border-radius: 5px;
`;

const PlusSolid = styled.div`
  width: 16px;
  height: 16px;
  align-self: center;
  margin-bottom: 2px;
  background-size: 100% 100%;
`;

const TextLabel14 = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  min-height: 20px;
  margin-left: 10px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;

export default DashboardSeries;
