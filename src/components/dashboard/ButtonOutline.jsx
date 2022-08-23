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
  const {text, width, buttonType = TYPE.DEFAULT, className, handleClick, icon} = props;
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
    <Container width={width} className={`${className || ""}`} onClick={handleMyClick} ref={refContainer}>
      {
        icon !== undefined && (<Icon icon={icon}></Icon>)
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
  width : ${(props) => props.width}px;
  height: 40px;
  padding: 9px 0;
  min-width: 117px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
`;

const TextLabel = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  white-space: nowrap;
  `;

const Loading = styled.div`
  background-image: url(${(props) => props.icon})
`;

const Icon = styled.div`
  width : 15px;
  height: 15px;
  margin-left: 20px;
  float: left;
  background-size: 100% 100%;
  background-image: url(${(props) => props.icon})
`;

export default forwardRef(ButtonOutline);
