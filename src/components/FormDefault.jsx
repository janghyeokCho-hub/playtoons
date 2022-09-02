import React from "react";
import styled from "styled-components";
import { Body1, Border1pxTiara } from "@/styledMixins";


function FormDefault(props) {
  const { children, className, inputClassName, label } = props;

  return (
    <Container className={`${className || ""}`}>
      <TextLabel >{label}</TextLabel>
      {
        inputClassName === undefined ? <Input type="text" value={children} /> 
          :  <TextArea className={`${inputClassName || ""}`} value={children} />
      }
    </Container>
  );
}

const TextArea = styled.textarea `
  ${Border1pxTiara}
  width: 100%;
  height: 4.166666667vh;
  /* height: 45px; */
  padding: 14px 16px 15px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;

  &.summary-big {
    height: 200px;
  }
`;

const Input = styled.input `
  ${Border1pxTiara}
  width: 100%;
  height: 4.166666667vh;
  padding: 14px 16px 15px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;

  &.summary-big {
    height: 200px;
  }
`;

const Container = styled.div`
  margin-bottom: 2.222222222vh;
  /* margin-bottom: 24px; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 85px;

  &.group-7-23.group-11-2 {
    top: 684px;
    min-height: 240px;
  }
`;

const TextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  margin-bottom: 1.851851852vh;
  /* margin-bottom: 20px; */
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

export default FormDefault;
