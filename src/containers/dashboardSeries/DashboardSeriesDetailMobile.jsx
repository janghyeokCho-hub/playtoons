import React from "react";
import Group37 from "../Group37";
import PaddingGroup14Copy3 from "../PaddingGroup14Copy3";
import PaddingGroup14Copy72 from "../PaddingGroup14Copy72";
import PaddingGroup14Copy4 from "../PaddingGroup14Copy4";
import styled from "styled-components";
import { Body8, Border1pxTiara, Body7 } from "../../styledMixins";
import "./MDashboardSeriesDetail.css";

function MDashboardSeriesDetail(props) {
  const {
    text_Label1,
    rectangleCopy1681,
    rectangleCopy1682,
    rectangleCopy1683,
    text_Label2,
    text_Label3,
    text_Label4,
    price,
    text_Label5,
    text_Label6,
    text_Label7,
    text_Label8,
    text_Label9,
    text_Label10,
    text_Label11,
    text_Label12,
    rectangle1,
    rectangle2,
    rectangleCopy3,
    group37Props,
    paddingGroup14Copy3Props,
    paddingGroup14Copy4Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <MDashboardseriesdetail className="screen">
        <Group37 text_Label={group37Props.text_Label} />
        <OverlapGroup3>
          <Rectangle></Rectangle>
          <PaddingGroup14Copy3 className={paddingGroup14Copy3Props.className} />
          <PaddingGroup14Copy72 />
          <PaddingGroup14Copy4 className={paddingGroup14Copy4Props.className}>
            {paddingGroup14Copy4Props.children}
          </PaddingGroup14Copy4>
          <TextLabel>{text_Label1}</TextLabel>
          <RectangleCopy168 src={rectangleCopy1681} />
          <RectangleCopy1681 src={rectangleCopy1682} />
          <RectangleCopy1682 src={rectangleCopy1683} />
          <TextLabel1>{text_Label2}</TextLabel1>
          <TextLabel2>{text_Label3}</TextLabel2>
          <TextLabel3>{text_Label4}</TextLabel3>
          <Price>{price}</Price>
          <TextLabel4>{text_Label5}</TextLabel4>
          <TextLabel5>{text_Label6}</TextLabel5>
          <TextLabel6>{text_Label7}</TextLabel6>
          <TextLabel7>{text_Label8}</TextLabel7>
          <TextLabel8>{text_Label9}</TextLabel8>
          <TextLabel9>{text_Label10}</TextLabel9>
          <TextLabel10>{text_Label11}</TextLabel10>
          <TextLabel11>{text_Label12}</TextLabel11>
          <Rectangle1 src={rectangle1} />
          <Rectangle2 src={rectangle2} />
          <RectangleCopy></RectangleCopy>
          <RectangleCopy2></RectangleCopy2>
          <RectangleCopy3 src={rectangleCopy3} />
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

const TextLabel = styled.div`
  ${Body7}
  position: absolute;
  top: 344px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const RectangleCopy168 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 327px;
  left: 32px;
`;

const RectangleCopy1681 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 552px;
  left: 32px;
`;

const RectangleCopy1682 = styled.img`
  position: absolute;
  width: 311px;
  height: 1px;
  top: 638px;
  left: 32px;
`;

const TextLabel1 = styled.div`
  ${Body7}
  position: absolute;
  top: 48px;
  left: 136px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
`;

const TextLabel2 = styled.div`
  ${Body7}
  position: absolute;
  top: 297px;
  left: 304px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel3 = styled.div`
  ${Body7}
  position: absolute;
  top: 207px;
  left: 278px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const Price = styled.div`
  ${Body7}
  position: absolute;
  top: 237px;
  left: 317px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel4 = styled.div`
  ${Body7}
  position: absolute;
  top: 267px;
  left: 304px;
  font-weight: 700;
  color: var(--vulcan);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel5 = styled.div`
  ${Body7}
  position: absolute;
  top: 297px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel6 = styled.div`
  ${Body7}
  position: absolute;
  top: 569px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel7 = styled.div`
  ${Body7}
  position: absolute;
  top: 655px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel8 = styled.div`
  ${Body8}
  position: absolute;
  width: 312px;
  top: 370px;
  left: 32px;
  color: var(--nevada);
  line-height: 14px;
`;

const TextLabel9 = styled.div`
  ${Body7}
  position: absolute;
  top: 207px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel10 = styled.div`
  ${Body7}
  position: absolute;
  top: 237px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const TextLabel11 = styled.div`
  ${Body7}
  position: absolute;
  top: 267px;
  left: 32px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 14px;
  white-space: nowrap;
`;

const Rectangle1 = styled.img`
  position: absolute;
  width: 88px;
  height: 134px;
  top: 48px;
  left: 32px;
`;

const Rectangle2 = styled.img`
  position: absolute;
  width: 90px;
  height: 143px;
  top: 681px;
  left: 32px;
`;

const RectangleCopy = styled.div`
  position: absolute;
  width: 90px;
  height: 143px;
  top: 681px;
  left: 134px;
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

const RectangleCopy3 = styled.img`
  position: absolute;
  width: 20px;
  height: 143px;
  top: 681px;
  left: 338px;
`;

export default MDashboardSeriesDetail;
