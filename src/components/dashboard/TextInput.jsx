import React, { useState, useImperativeHandle, forwardRef }  from 'react';
import styled from "styled-components";
import { Body8, Border1pxTiara } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import {faEye} from "@fortawesome/pro-light-svg-icons";

import {INPUT_STATUS} from '@COMMON/constant';

/**
 *
  refInput.current.setStatusInInput({type: INPUT_STATUS.ERROR, error: "error"});

  <TextInput 
    width={"300px"}
    height={"45px"}
    marginLeft={"49px"}
    marginBottom={"39px"}
    borderRadius={"4px"}
    ref={refInput}
    />
 * @param {*} props 
 * @param {*} ref 
 * @returns 
 */
function Input(props, ref) {
  const [status, setStatus] = useState({});


  const getDisabledBorderColorOnInput = () => {
    let color = "var(--tiara)";

    switch( status.type ){
      default:
      case INPUT_STATUS.HOVER:
        color = "var(--tiara)";
        break;
      case INPUT_STATUS.FOCUSED:
        color = "var(--tiara)";
        break;
      case INPUT_STATUS.ERROR:
        color = "var(--status-red)";
        break;
      case INPUT_STATUS.DISABLED:
        color = "var(--tiara)";
        break;
    }//switch

    return color;
  };

  const getDisabledBackgroundColorOnInput = () => {
    return status.type === INPUT_STATUS.DISABLED ? "var(--desert-storm)" : "var(--white)";
  };

  const getDisabledColorOnInput = () => {
    return status.type === INPUT_STATUS.DISABLED ? "var(--tiara)" : "var(--vulcan)";
  };

  const getDisabledColorOnEye = () => {
    return status.type === INPUT_STATUS.DISABLED ? "var(--tiara)" : "var(--black)";
  };

  useImperativeHandle(ref, () => ({
    setStatusInInput: (value) => {
      setStatus(value);
    }
  }));

  return (
    <Container
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      marginBottom={props.marginBottom}
      >
      <RelativeContainer>
        <InputText 
          type={"text"}
          color={getDisabledColorOnInput()}
          borderColor={getDisabledBorderColorOnInput()}
          backgroundColor={getDisabledBackgroundColorOnInput()}
          disabled={status.type === INPUT_STATUS.DISABLED}
          {...props}
          />
      </RelativeContainer>
     { 
      status.type === INPUT_STATUS.ERROR &&
        <FlexContainer>
          <FontAwesomeIcon 
            icon={faCircleXmark}
            style={{ width: "16px", height: "16px", marginRight: "8px", color: "var(--status-red)" }}
            />
          <ErrorText>{status.error}</ErrorText>
        </FlexContainer>
      }
    </Container>
  )
}

const RelativeContainer = styled.div`
  position: relative;
`;

const ErrorText = styled.div`
  ${Body8}
  font-size: 1.2em;
  color: var(--status-red);
`;

const FlexContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(0, 24px);
  display: flex;
`;

const Container = styled.div`
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  position: relative;
`;

const InputText = styled.input`
  ${Border1pxTiara}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  padding: 14px 16px;
  
  :focus{
    border-color: var(--violet-blue);
    color: var(--vulcan);
  }
`;

export default forwardRef(Input);