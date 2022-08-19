import React, { useEffect, useRef } from "react";
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";
import styled from "styled-components";
import { Body1, NotosansjpNormalDeepSpaceSparkle14p } from "@/styledMixins";


function Group10(props) {
  const { className, toggleOnClassName } = props;

  const refToggle = useRef();

  useEffect(() => {
    console.log("refToggle", refToggle);
    return () => {
    }
  }, []);
  


  return (
    <Group101 className={`group-10-1 ${className || ""}`}>
      <TextLabel className="text_label-174">年齢設定</TextLabel>
      <FlexRow className="flex-row-30">
        <Toggle ref={refToggle} className={toggleOnClassName} />
        <R19 className="r-19-1">R-19</R19>
      </FlexRow>
    </Group101>
  );
}

const Toggle = styled(ToggleOn)`
  position: static;
`;

const Group101 = styled.div`
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

const TextLabel = styled.div`
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

export default Group10;
