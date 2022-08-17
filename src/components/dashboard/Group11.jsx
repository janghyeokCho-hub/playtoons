import React from "react";
import styled from "styled-components";


function Group11(props) {
  const { className } = props;

  return (
    <Group className={`group-31 ${className || ""}`}>
      <OverlapGroup className="overlap-group-13">
        <Path
          className="path-10"
          src="/img/mdashboardplansubscriber-path-E819721C-D5B2-450E-B693-3CB5C4F26E82@2x.png"
        />
      </OverlapGroup>
      <Rectangle className="rectangle-83"></Rectangle>
    </Group>
  );
}

const Group = styled.div`
  position: absolute;
  width: 375px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 41px;

  &.group-31.group-32 {
    position: unset;
    top: unset;
    left: unset;
  }

  &.group-31.group-33 {
    position: unset;
    top: unset;
    left: unset;
  }

  &.group-31.group-35 {
    position: unset;
    top: unset;
    left: unset;
  }

  &.group-31.group-36 {
    position: unset;
    top: unset;
    left: unset;
  }
`;

const OverlapGroup = styled.div`
  height: 40px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 375px;
  background-color: var(--white);
`;

const Path = styled.img`
  width: 9px;
  height: 16px;
`;

const Rectangle = styled.div`
  width: 375px;
  height: 1px;
  background-color: var(--mercury);
`;

export default Group11;
