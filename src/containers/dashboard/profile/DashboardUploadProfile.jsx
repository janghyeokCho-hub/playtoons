import React, { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title3, Body1, NotosansjpNormalDeepSpaceSparkle14p, Body8, } from "@/styledMixins";

import {BROWSER_CONTENTS_AREA_TYPE} from '@COMMON/constant';
import BrowserContainer from "@/components/dashboard/BrowserContainer";

import RegisterButton from "@/components/dashboard/ButtonDefault";
import ImageUploadContainer from "@/components/dashboard/ImageUploadContainer";
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";
import ResponsiveContainer from '@COMPONENTS/ResponsiveDiv';
import ProfileUploadContainer from '@COMPONENTS/dashboard/ProfileUploadContainer';
import ToolTip from "@/components/dashboard/ToolTip";
import TextInput from "@/components/dashboard/TextInput";
import TextInputSearch from "@/components/dashboard/TextInputSearch";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempImageBg from "@IMAGES/landingpage-profile-bgImg2.png";

const text = {
  profile_management: "プロフィル管理",
  nickname: "ニックネーム",
  introduction: "紹介",
  register_profile_image: "プロフィル写真登録",
  register_cover_image: "カバー写真登録",
  setting_age: "年齢設定",
  setting_tag: "タグ設定",
  tag_name: "タグ名",
  description_policy: "当サイトでは、直近５年間の長崎県公報の全文を掲載しています。",
  register: "登録する",
  input_image: "置いてください。",
};

const typeDataList = ["1", "2", "3"];

export default function DashboardUploadProfile(props) {
  const {refIsAdult, refInputNickname, refIntrodction, refTag} = useRef();
  const [isModeUpload, setMode] = useState();
  const params = useParams();

  let seriesData = {};

  const handleRegister = () => {
    console.log("refToggle", refIsAdult);
  };


  const handlePostImageFile = useCallback((file) => {
    // 폼데이터 구성
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", file);
    console.log("postImage file", file);
  }, []);

  const handleTimelineImageFile = (file) => {
    console.log("handleTimelineImageFile", file);
  };

  useEffect(() => {
    //분기 upload or edit
    setMode(params.id === undefined);

  }, []);

  return (
    <BrowserContainer 
      padding={"48px 0"}
      spaceWidth={"48px"}
      backgroundColor={"var(--desert-storm)"} 
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITH_WHITE_BOX}
      >
      <Container      
        paddingTop={"32px"}
        paddingBottom={"32px"}
        >
        <form method="post" encType="multipart/form-data">
          <PageTitle>{text.profile_management}</PageTitle>

          {/* ====== profile upload ===== */}
          <ProfileContainer>
            <ImageUploadContainer
              width={"100%"}
              height={"300px"}
              backgroundColor={"var(--tiara)"}
              borderRadius={"4px"}
              handleFile={handleTimelineImageFile}
            ></ImageUploadContainer>
            <RoundProfileContainer>
              <ProfileUploadContainer
                width={"100px"}
                height={"100px"}
                border={"1px solid var(--white)"}
                borderRadius={"100px"}
                handleFile={handleTimelineImageFile}
              ></ProfileUploadContainer>
            </RoundProfileContainer>
          </ProfileContainer>

          <ResponsiveContainer
            paddingLeft={"412px"}
            paddingRight={"411px"}
            >
          
            <TextLabel marginBottom={"20px"}>{text.nickname}</TextLabel>
            <TextInput 
              width={"100%"}
              height={"45px"}
              marginBottom={"24px"}
              borderRadius={"4px"}
              ref={refInputNickname}
              />
            
            <TextLabel marginBottom={"20px"}>{text.introduction}</TextLabel>
            <TextInput 
              inputType={"textarea"}
              width={"100%"}
              minHeight={"200px"}
              marginBottom={"24px"}
              borderRadius={"4px"}
              ref={refIntrodction}
              />

            <FlexContainer marginBottom={"20px"}>
              <TextLabel marginRight={"8px"}>{text.register_profile_image}</TextLabel>
              <ToolTip />
            </FlexContainer>
            <MarginBottomContainer marginBottom={"26px"}>
              <ImageUploadContainer
                width={"100px"}
                height={"100px"}
                border={"1px dashed var(--tiara)"}
                backgroundColor={"var(--desert-storm)"}
                textDragNDrop={text.label_drag_drop}
                textInputMessage={text.input_image}
                handleFile={handlePostImageFile}
                >
              </ImageUploadContainer>
            </MarginBottomContainer>

            <TextLabel marginBottom={"20px"}>{text.register_cover_image}</TextLabel>
            <MarginBottomContainer marginBottom={"26px"}>
              <ImageUploadContainer
                width={"700px"}
                height={"300px"}
                border={"1px dashed var(--tiara)"}
                backgroundColor={"var(--desert-storm)"}
                textDragNDrop={text.label_drag_drop}
                textInputMessage={text.input_image}
                handleFile={handlePostImageFile}
                >
              </ImageUploadContainer>
            </MarginBottomContainer>

            <TextLabel marginBottom={"20px"}>{text.setting_age}</TextLabel>
            <FlexToggleContainer marginBottom={"24px"}>
              <ToggleOn
                ref={refIsAdult}
                selected={false}
              />
              <R19>{text.label_r_19}</R19>
            </FlexToggleContainer>

            <TextLabel marginBottom={"20px"}>{text.setting_tag}</TextLabel>
            <TextInputSearch 
              width={"300px"}
              height={"45px"}
              marginBottom={"48px"}
              borderRadius={"4px"}
              placeholder={text.tag_name}
              ref={refTag}
              />

            <TextPolicy marginBottom={"48px"}>{text.description_policy}</TextPolicy>

            <ButtonContainer>
              <RegisterButton
                width={"102px"}
                height={"40px"}
                borderRadius={"5px"}
                text={text.register}
                handleClick={handleRegister}
              />
            </ButtonContainer>
          </ResponsiveContainer>
        </form>
      </Container>
    </BrowserContainer>
  );
}

const TextPolicy = styled.div`
  ${Body8}
  color: var(--manatee);
  margin-bottom: ${(props) => props.marginBottom};
`;

const FlexContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
  align-items: center;
`;

const TextLabel = styled.div`
  ${Body1}
  margin-bottom: ${(props) => props.marginBottom};
  margin-right: ${(props) => props.marginRight};
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const ProfileContainer = styled.div`
  position: relative;
  margin-bottom: 144px;
`;

const RoundProfileContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const Container = styled(ResponsiveContainer)`
  
`;

const MarginBottomContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
`;

const ButtonContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PageTitle = styled.div`
  ${Title3}
  margin-left: 32px;
  margin-bottom: 32px;  
  /* margin-bottom: 48px;  */
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
  white-space: nowrap;
`;


const FlexToggleContainer = styled.div`
  height: 31px;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 103px;
  margin-bottom: ${(props) => props.marginBottom};
`;

const R19 = styled.div`
  ${NotosansjpNormalDeepSpaceSparkle14p}
  min-height: 20px;
  margin-left: 10px;
  margin-bottom: 1px;
  min-width: 37px;
  letter-spacing: 1.27px;
  line-height: 20px;
  white-space: nowrap;
`;



