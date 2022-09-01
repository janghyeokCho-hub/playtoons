import React from "react";
import styled from "styled-components";
import { Body1, NotosansjpNormalShadowBlue13px } from "@/styledMixins";

const ProfileCard = ({ bgImgSrc, profileImgSrc, alias, intro }) => {
  return (
    <ProfileCardDiv>
      <ProfileBackgroundImgDiv imgSrc={bgImgSrc} />
      <ProfileImg src={profileImgSrc} />
      <ProfileContentDiv>
        <ProfileAliasDiv>{alias}</ProfileAliasDiv>
        <ProfileIntroDiv>{intro}</ProfileIntroDiv>
      </ProfileContentDiv>
    </ProfileCardDiv>
  );
};

const ProfileCardDiv = styled.div`
  position: relative;
  margin: 1em;
  width: 278px;
  height: 278px;
  background-color: var(--white);
  border-radius: 10px;
  border: 1px solid;
  border-color: var(--tiara);
`;

const ProfileBackgroundImgDiv = styled.div`
  width: 277px;
  height: 110px;
  background-image: url(${(props) => props.imgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 10px 10px 0px 0px;
`;

const ProfileContentDiv = styled.div`
  display: flex;
  width: 278px;
  height: 168px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const ProfileAliasDiv = styled.div`
  ${Body1}
  margin-top: 1em;
  margin-bottom: 1em;
  width: 278px;
  min-height: 20px;
  font-weight: 700;
  color: var(--vulcan);
  text-align: center;
  line-height: 20px;
  white-space: nowrap;
`;

const ProfileIntroDiv = styled.div`
  ${NotosansjpNormalShadowBlue13px}
  width: 278px;
  min-height: 67px;
  text-align: center;
  letter-spacing: 1px;
  line-height: 19px;
  padding-left: 1em;
  padding-right: 1em;
  white-space: pre-line;
`;

const ProfileImg = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -55%);
`;

export default ProfileCard;
