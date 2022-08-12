import React from "react";
import Group from "../Group";
import styled from "styled-components";
import { Body3 } from "@/styledMixins";
import logoGnb from '@IMAGES/dashboardeditplan-imglogognb.png';
import btnAuthorGnb from '@IMAGES/authorseries-btnauthorgnb.png';
import iconBar from '@ICONS/dashboardseries-shape-bar.png';

function GnbLoginOn() {
  return (
    <TapbarLoginOn>
      <IcoBars></IcoBars>
      <ImgLogoGnb src={logoGnb} />
      <Group2>
        <Group />
        <BtnContainer>
          <BtnPost>
            <TxtBtnPost>投稿</TxtBtnPost>
          </BtnPost>
          <BtnAuthorGnb src={btnAuthorGnb} />
        </BtnContainer>
      </Group2>
    </TapbarLoginOn>
  );
}

const TapbarLoginOn = styled.div`
  position: absolute;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  padding: 0 30px;
  justify-content: flex-end;
  align-items: center;
  min-width: 1920px;
  background-color: var(--white);
  box-shadow: 0px 2px 20px -10px #00000080;
`;

const IcoBars = styled.div`
  width: 21px;
  height: 18px;
  background-image: url('${iconBar}');
  background-size: 100% 100%;
`;

const ImgLogoGnb = styled.img`
  width: 162px;
  height: 26px;
  margin-left: 22px;
`;

const Group2 = styled.div`
  position: relative;
  margin-left: 1051px;
  display: flex;
  align-items: center;
  min-width: 584px;
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

export default GnbLoginOn;
