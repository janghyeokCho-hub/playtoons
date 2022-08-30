import React, { useState, useEffect } from "react";
import { useWindowSize } from "@/hook/useWindowSize";

import Group from "./Group";
import styled from "styled-components";
import { Body3 } from "@/styledMixins";
import logoGnb from "@IMAGES/dashboardeditplan-imglogognb.png";
import btnAuthorGnb from "@IMAGES/authorseries-btnauthorgnb.png";
import iconBar from "@ICONS/icon_menu_without_space.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

import Button from "@COMPONENTS/Button";

const LoginMenu = ({ isMobile }) => {
  return (
    <>
      {(isMobile && (
        <SearchIconDiv>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ width: "100%", height: "100%" }}
          />
        </SearchIconDiv>
      )) || <Group />}
      <BtnContainer>
        <BtnPost>
          <TxtBtnPost>投稿</TxtBtnPost>
        </BtnPost>
        <BtnAuthorGnb src={btnAuthorGnb} fixedWidth />
      </BtnContainer>
    </>
  );
};

const NonLoginMenu = ({ isMobile }) => {
  return (
    <>
      {(isMobile && (
        <SearchIconDiv>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ width: "100%", height: "100%" }}
          />
        </SearchIconDiv>
      )) || <Group />}
      <Button
        text="ログイン"
        color="--white"
        bgColor="--violet-blue"
        width="100px"
        height="40px"
        marginLeft="1em"
        marginRight="1em"
        callback={() => (window.location.href = "/account")}
        borderRadius="20px"
      />
    </>
  );
};

const Header = () => {
  // login 구현 후 redux store에서 값 받아와야함
  const isLogin = false;

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
    <HeaderDiv>
      <LeftMenu>
        <IcoBars></IcoBars>
        <ImgLogoGnb src={logoGnb} />
      </LeftMenu>
      <RightMenu>
        {(isLogin && <LoginMenu />) || <NonLoginMenu isMobile={isMobile} />}
      </RightMenu>
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  width: 100vw;
  height: 100px;
  background-color: var(--white);
  box-shadow: 0px 2px 20px -10px #00000080;
  padding-left: 1.5em;
  padding-right: 1.5em;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`;

const IcoBars = styled.div`
  width: 21px;
  height: 18px;
  background-image: url("${iconBar}");
  background-size: 100% 100%;
`;

const ImgLogoGnb = styled.img`
  width: 162px;
  height: 26px;
  margin-left: 22px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIconDiv = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  width: 24px;
  height: 24px;
`;

const BtnContainer = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  min-width: 154px;
`;

const BtnPost = styled.div`
  height: 40px;
  display: flex;
  padding: 0 17px;
  justify-content: flex-end;
  align-items: center;
  min-width: 74px;
  background-color: var(--violet-blue);
  border-radius: 20px;
`;

const TxtBtnPost = styled.div`
  ${Body3}
  min-height: 20px;
  min-width: 37px;
  color: var(--white);
  line-height: 20px;
  white-space: nowrap;
`;

const BtnAuthorGnb = styled.img`
  width: 48px;
  height: 48px;
  margin-left: 32px;
`;

export default Header;
