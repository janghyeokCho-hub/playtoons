import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import styled from "styled-components";
import { NotosansjpBoldWhite14px, Body9, Body7 } from "@/styledMixins";
import { getValueOrDefault } from "@COMMON/common.js";

const TYPE = {
  DEFAULT: "default",
  HOVER: "hover",
  LOADING: "loading",
  DISABLED: "disabled",
};
function ButtonDefault(props, ref) {
  const {
    text,
    buttonType = TYPE.DEFAULT,
    className,
    handleClick,
    icon,
  } = props;
  const [type, setType] = useState(buttonType);
  const refContainer = useRef();
  const refTextLabel = useRef();

  const handleMyClick = () => {
    setType(TYPE.HOVER);

    setTimeout(async () => {
      setType(TYPE.DEFAULT);
    }, 1000);

    if (handleClick !== undefined) {
      handleClick();
    }
  };

  //useRef
  useImperativeHandle(ref, () => ({
    setButtonType: (type) => {
      setType(type);
    },
  }));

  useEffect(() => {
    switch (type) {
      default:
        refContainer.current.style.backgroundColor = "#394bc2";
        break;
      case TYPE.HOVER:
        refContainer.current.style.backgroundColor = "#5a6acf";
        break;
      case TYPE.LOADING:
        break;
      case TYPE.DISABLED:
        break;
    } //switch
  }, [type]);

  return (
    <Container {...props} onClick={handleMyClick} ref={refContainer}>
      {type === TYPE.LOADING ? (
        <Loading {...props} />
      ) : (
        <div>
          {
            icon !== undefined && (<Icon {...props} />)
          }
          <TextLabel {...props} ref={refTextLabel}>
            {text}
          </TextLabel>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--violet-blue);
  cursor: pointer;

  &.mobile {
  }
  &.mobile12 {
    height: 20px;
  }
`;

const TextLabel = styled.div`
  ${NotosansjpBoldWhite14px}
  min-height: 20px;
  font-weight: 700;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;

  &.mobile {
    ${Body7}
    min-height: 14px;
    line-height: 14px;
  }
  &.mobile12 {
    ${Body9}
    min-height: 12px;
    font-weight: 500;
    line-height: 12px;
  }
`;

const Loading = styled.div`
  background-image: url(${(props) => props.icon});
`;

const Icon = styled.div`
  background-image: url(${(props) => props.icon});
`;

export default forwardRef(ButtonDefault);
