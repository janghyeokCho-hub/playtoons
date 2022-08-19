import React, { useState, useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import styled from "styled-components";
import { NotosansjpBoldVioletBlue14px, Border1pxVioletBlue } from "@/styledMixins";

const TYPE = {
  DEFAULT: "default",
  HOVER: "hover",
  LOADING: "loading",
  DISABLED : "disabled"
}
;

function ButtonOutline(props, ref) {
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
  
  useImperativeHandle(ref,() => ({
    setButtonType : (type) => {
      setType(type);
    }
  }));
  
  useEffect(() => {
    switch(type){
      default: 
        refContainer.current.style.backgroundColor = '#ffffff';
        break;
        case TYPE.HOVER : 
        refContainer.current.style.backgroundColor = '#edeefa';
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
  ${Border1pxVioletBlue}
  position: absolute;
  height: 40px;
  top: 1811px;
  left: 1210px;
  display: flex;
  padding: 9px 17.7px;
  justify-content: flex-end;
  align-items: flex-start;
  min-width: 117px;
  border-radius: 5px;
  cursor: pointer;

`;

const TextLabel = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
  
  z-index: 10;
`;

const Loading = styled.div`
  background-image: url(${(props) => props.icon})
`;

const Icon = styled.div`
  background-image: url(${(props) => props.icon})
`;

export default forwardRef(ButtonOutline);
