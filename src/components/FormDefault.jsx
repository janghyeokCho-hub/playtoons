import React from "react";
import styled from "styled-components";
import { Body1, Border1pxTiara } from "@/styledMixins";


function FormDefault(props) {
  const { children, className, inputClassName, label } = props;

  return (
    <Group7 className={`group-7-23 ${className || ""}`}>
      <TextLabel className="text_label-172">{label}</TextLabel>
      {
        inputClassName === undefined ? <Input type="text" value={children} /> 
          :  <TextArea className={`${inputClassName || ""}`} value={children} />
      }
    </Group7>
  );
}

const TextArea = styled.textarea `
  ${Border1pxTiara}
  width: 100%;
  height: 45px;
  margin-top: 20px;
  padding: 10px 13px;
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
  height: 45px;
  margin-top: 20px;
  padding: 10px 13px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 5px;

  &.summary-big {
    height: 200px;
  }
`;

const Group7 = styled.div`
  margin-bottom: 2vh;
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
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

export default FormDefault;
