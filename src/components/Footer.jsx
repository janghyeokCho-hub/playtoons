import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoGnb from "@IMAGES/footer-logo.png";
import { useWindowSize } from "@/hook/useWindowSize";

const LeftContext = ({ isMobile }) => {
  return (
    <LeftContextDiv isMobile={isMobile}>
      <ImgLogoDiv isMobile={isMobile}>
        <ImgLogoFooter src={logoGnb} />
      </ImgLogoDiv>
      <LeftTextDiv isMobile={isMobile}>
        ©Rocketstaff All Right Reserved.
      </LeftTextDiv>
    </LeftContextDiv>
  );
};

const FooterBtn = ({ text }) => {
  return (
    <FooterBtnDiv>
      <FooterBtnText>{text}</FooterBtnText>
    </FooterBtnDiv>
  );
};

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    if (size.width > 700) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [size]);
  return (
    <FooterDiv isMobile={isMobile}>
      <LeftContext isMobile={isMobile}></LeftContext>
      <RightContext>
        <FooterBtn text="利用規約" />
        <FooterBtn text="会社情報" />
        <FooterBtn text="プライバシーポリシー" />
      </RightContext>
    </FooterDiv>
  );
};

export default Footer;

const FooterDiv = styled.div`
  width: 100vw;
  height: 80px;
  justify-content: space-around;
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--selago);
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: ${(props) => props.isMobile && "space-evenly"};
`;

const FooterBtnDiv = styled.div`
  height: 30px;
  min-width: 75px;
  background-color: var(--link-water);
  border-radius: 4px;
  text-align: center;
  letter-spacing: 0.86px;
  margin-left: 15px;
`;
const FooterBtnText = styled.span`
  padding-left: 12px;
  padding-right: 12px;
  line-height: 30px;
  vertical-align: middle;
  color: var(--violet-blue);
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-xs);
  font-weight: 400;
  font-style: normal;
`;

const LeftContextDiv = styled.div`
  display: ${(props) => props.isMobile && "flex"};
  align-items: ${(props) => props.isMobile && "center"};
  width: ${(props) => props.isMobile && "100%"};
  justify-content: ${(props) => props.isMobile && "space-around"};
`;

const ImgLogoDiv = styled.div`
  flex: ${(props) => props.isMobile && 1};
  text-align: ${(props) => props.isMobile && "start"};
  margin-left: ${(props) => props.isMobile && "20px"};
`;

const ImgLogoFooter = styled.img`
  width: 174px;
  height: 28px;
`;

const RightContext = styled.div`
  display: inline-flex;
  align-self: ${(props) => props.isMobile && "flex-end"};
  margin-right: ${(props) => props.isMobile && "20px"};
`;

const LeftTextDiv = styled.div`
  flex: ${(props) => props.isMobile && 1};
  text-align: ${(props) => props.isMobile && "end"};
  margin-right: ${(props) => props.isMobile && "20px"};
  bottom: ${(props) => !props.isMobile && "5px"};
  position: ${(props) => !props.isMobile && "absolute"};
  font-family: var(--font-family-noto_sans_jp);
  font-size: var(--font-size-xxs);
  letter-spacing: 1px;
  font-style: normal;
  font-weight: 500;
  color: var(--vulcan);
`;
