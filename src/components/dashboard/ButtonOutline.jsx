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
  const {text, width, height = 40, buttonType = TYPE.DEFAULT, dataId, className, handleClick, icon} = props;
  const [type, setType] = useState(buttonType);
  const refContainer = useRef();
  const refTextLabel = useRef();

  const handleMyClick = (e) => {
    setType(TYPE.HOVER);
    
    setTimeout(async () => {
      setType(TYPE.DEFAULT);
    }, 1000);
    
    
    if(handleClick !== undefined) {handleClick(e)}
  }
  
  useImperativeHandle(ref,() => ({
    //page에서 로딩상태 변화를 위해
    setButtonType : (type) => {
      setType(type);
    },
    getValue : () => {
      return refContainer.current.value;
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
    <Container width={width} height={height} data-id={dataId} className={`${className || ""}`} onClick={handleMyClick} ref={refContainer}>
      {
        icon !== undefined && (<Icon icon={icon}></Icon>)
      }
      {
        // 로딩중이라면 로딩 아이콘을 보여준다.
        // type === TYPE.LOADING ? <Loading icon={icon} /> : <TextLabel className="text_label-129" ref={refTextLabel}>{text}</TextLabel>
        type === TYPE.LOADING ? <TextLabel className="text_label-129">Loading...</TextLabel> : <TextLabel className="text_label-129" ref={refTextLabel}>{text}</TextLabel>
      }
      
    </Container>
  );
}

const Container = styled.div`
  ${Border1pxVioletBlue}
  width : ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 2%;
  min-width: 117px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1025px) {
      width: ${(props) => props.width - ((props.width / 10) * 2)}px;
    }
  
  &.margin-right{
    margin-right: 15px;
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  font-weight: 700;
  font-size: 1.4em;
  letter-spacing: 1.27px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  `;

const Loading = styled.div`
  background-image: url(${(props) => props.icon})
`;

const Icon = styled.div`
  width : 15px;
  height: 15px;
  margin-right: 10px;
  background-size: 100% 100%;
  background-image: url(${(props) => props.icon})
`;

export default forwardRef(ButtonOutline);
