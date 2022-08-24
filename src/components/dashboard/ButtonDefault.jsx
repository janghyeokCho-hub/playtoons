import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import styled from "styled-components";
import { NotosansjpBoldWhite14px, Border1pxVioletBlue } from "@/styledMixins";

const TYPE = {
  DEFAULT: "default",
  HOVER: "hover",
  LOADING: "loading",
  DISABLED : "disabled"
}
;

function ButtonDefault(props, ref) {
  const {text, buttonType = TYPE.DEFAULT, className, handleClick, icon} = props;
  const [type, setType] = useState(buttonType);
  const refContainer = useRef();
  const refTextLabel = useRef();

  const handleMyClick = () => {
    setType(TYPE.HOVER);
    
    setTimeout(async () => {
      setType(TYPE.DEFAULT);
    }, 1000);
    
    
    if(handleClick !== undefined) {handleClick()}
  }
  
  //useRef
  useImperativeHandle(ref,() => ({
    setButtonType : (type) => {
      setType(type);
    }
  }));
  
  useEffect(() => {
    switch(type){
      default: 
        refContainer.current.style.backgroundColor = '#394bc2';
        break;
        case TYPE.HOVER : 
        refContainer.current.style.backgroundColor = '#5a6acf';
        break;
      case TYPE.LOADING : 
        
        break;
      case TYPE.DISABLED : 
        
        break;
    }//switch
    
  }, [type]);
    

  return (
    <Container className={`${className || ""}`} onClick={handleMyClick} ref={refContainer}>
      {
        icon !== undefined && (<Icon></Icon>)
      }
      {
        // type === TYPE.LOADING ? <Loading /> : <TextLabel className="text_label-129" ref={refTextLabel}>{text}</TextLabel>
        type === TYPE.LOADING ? <TextLabel className="text_label-129">Loading...</TextLabel> : <TextLabel className="text_label-129" ref={refTextLabel}>{text}</TextLabel>
      }
      
    </Container>
  );
}

const Container = styled.div`
  width: 117px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 102px;
  border-radius: 5px;
  background-color: var(--violet-blue);
  cursor: pointer;

  &.padding-group-3-16 {
    top: 1811px;
    left: 1344px;
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldWhite14px}
  min-height: 20px;
  min-width: 65px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;

const Loading = styled.div`
  background-image: url(${(props) => props.icon})
`;

const Icon = styled.div`
  background-image: url(${(props) => props.icon})
`;

export default forwardRef(ButtonDefault);
