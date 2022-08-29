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
import {getValueOrDefault} from '@COMMON/common.js';


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
  width : ${(props) => props.width}px;
  height: ${(props) => getValueOrDefault(props.height, 40)}px;
  margin-left: ${(props) => getValueOrDefault(props.marginLeft, "")};
  margin-right: ${(props) => getValueOrDefault(props.marginRight, "15px")};
  margin-bottom: ${(props) => getValueOrDefault(props.marginBottom, "")};
  padding: ${(props) => getValueOrDefault(props.padding, "2%")};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1025px) {
    width: ${(props) => props.width - (props.width / 10) * 2}px;
  }

  &.gray {
    ${Border1pxTiara}
  }

  &.mobile{
    
  }
  &.mobile12{
    height: 20px;
    padding: 5px 8px;
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
  
  &.mobile{
    ${Body7}
    min-height: 14px;
    line-height: 14px;
  }
  &.mobile12{
    ${Body9}
    min-height: 12px;
    font-weight: 500;
    line-height: 12px;
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
`;

export default forwardRef(ButtonOutline);
