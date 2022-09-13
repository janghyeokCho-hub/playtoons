import React, { useState } from "react";
import styled from "styled-components";
import { Body6, Body1, Border1pxTiara } from "@/styledMixins";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/pro-light-svg-icons";



function TagGroup(props) {
  const { label,  className } = props;
  const [isFocusInput, setFocusInput] = useState(false);

  return (
    <Container className={`${className || ""}`}>
      <TextLabel className="">{label}</TextLabel>
      <InpuContainer >
        <Input type="text" onFocus={() => setFocusInput(true)} onBlur={() => setFocusInput(false)}/>
        <FontAwesomeIcon 
            icon={faMagnifyingGlass}
            style={{ 
              width: "20px", 
              height:"20px", 
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translate(0, -50%)",
              color: "var(--bright-gray)" }}
            />
        {
          isFocusInput === false && (<TextLabel1 >{props.text}</TextLabel1>)
        }
      </InpuContainer>
    </Container>
  );
}

const Input = styled.input `
  ${Border1pxTiara}
  width: 100%;
  position: absolute;
  height: 45px;
  top: 0;
  left: 0;
  display: flex;
  padding: 12px 15px 12px 50px;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 2.222222222vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextLabel = styled.div`
  ${Body1}
  margin-bottom : 1.851851852vh;
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const InpuContainer = styled.div`
  width: 100%;
  height: 45px;
  position: relative;
  border-radius: 5px;
`;

const TextLabel1 = styled.div`
  ${Body6}
  position: absolute;
  top: 50%;
  left: 52px;
  transform: translate(0, -50%);
  color: var(--manatee);
  line-height: 16px;
  white-space: nowrap;
`;

export default TagGroup;
