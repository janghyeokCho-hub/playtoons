import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import styled from "styled-components";
import {
  NotosansjpBoldVioletBlue14px,
  Border1pxVioletBlue,
  Body5,
  Border1pxTiara,
  Body7,
  Body9,
} from "@/styledMixins";
import {getResizedNumber} from '@COMMON/common.js';


const TYPE = {
  DEFAULT: "default",
  HOVER: "hover",
  LOADING: "loading",
  DISABLED: "disabled",
};

const STYLE = {
  BLUE: "blue",
  GRAY: "gray"
};

/**
 * ex) 
    <ButtonOutline
      width={"71px"}
      height={"40px"}
      marginRight={"16px"}
      marginBottom={"12px"}
      borderRadius={"5px"}
      text={text.fix}
      dataId={item.id}
      marginLeft={"auto"}
      handleClick={handleReactionClick}
      />
 * 
 * @param {*} props 
 * @param {*} ref 
 * @returns 
 */

function ButtonOutline(props, ref) {
  const {
    text,
    buttonType = TYPE.DEFAULT,
    className = STYLE.BLUE,
    dataId,
    handleClick,
    icon,
  } = props;
  const [type, setType] = useState(buttonType);
  const refContainer = useRef();
  const refTextLabel = useRef();

  const handleMyClick = (e) => {
    setType(TYPE.HOVER);

    setTimeout(async () => {
      setType(TYPE.DEFAULT);
    }, 1000);

    if (handleClick !== undefined) {
      handleClick(e);
    }
  };

  useImperativeHandle(ref, () => ({
    //page에서 로딩상태 변화를 위해
    setButtonType: (type) => {
      setType(type);
    },
    getValue: () => {
      return refContainer.current.value;
    },
  }));

  const getHoverColor = () => {
    let color;
    switch(className){
      default:
        color = "#edeefa";
      break;
      case STYLE.GRAY:
        color = "#c5c5d0";
      break;
    }

    return color;
  }

  useEffect(() => {
    switch (type) {
      default:
        refContainer.current.style.backgroundColor = "#ffffff";
        break;
      case TYPE.HOVER:
        refContainer.current.style.backgroundColor = getHoverColor();
        break;
      case TYPE.LOADING:
        break;
      case TYPE.DISABLED:
        break;
    } //switch
  }, [type]);

  return (
    <Container
      {...props}
      data-id={dataId}
      className={`${className || ""}`}
      onClick={handleMyClick}
      ref={refContainer}
    >
      {icon !== undefined && <Icon icon={icon}></Icon>}
      {
        // 로딩중이라면 로딩 아이콘을 보여준다.
        type === TYPE.LOADING ? (
          <Loading icon={icon} />
        ) : (
          <TextLabel className={`${className || ""}`} ref={refTextLabel}>
            {text}
          </TextLabel>
        )
      }
    </Container>
  );
}

const Container = styled.div`
  ${Border1pxVioletBlue}
  width : ${(props) => props.width};
  height: ${(props) => props.height};    
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};    
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.gray {
    ${Border1pxTiara}
  }

  @media only screen and (max-width: 1025px) {
    /* width: ${(props) => getResizedNumber(props.width, 0.8)};
    height: ${(props) => getResizedNumber(props.height, 0.8)}; */
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldVioletBlue14px}
  pointer-events: none;
  font-weight: 700;
  letter-spacing: 1.27px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: var(--violet-blue);
  
  
  &.gray{
    ${Body5}
    color: var(--manatee);
  }
  &.reaction_list{
    ${Body5}
    font-weight: 500;
    text-align: center;
    line-height: 16px;
  }  
  &.mobile{
    ${Body7}
  }
  &.mobile12{
    ${Body9}
    font-weight: 500;
  }
`;

const Loading = styled.div`
  width: 15px;
  height: 15px;
  background-size: 100% 100%;
  background-image: url(${(props) => props.icon});
`;

const Icon = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  background-size: 100% 100%;
  background-image: url(${(props) => props.icon});
  @media only screen and (max-width: 1025px) {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;

export default forwardRef(ButtonOutline);
