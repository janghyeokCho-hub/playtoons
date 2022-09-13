import React, { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Title3,
  Body1,
  NotosansjpNormalDeepSpaceSparkle14p,
} from "@/styledMixins";

import {BROWSER_CONTENTS_AREA_TYPE} from '@COMMON/constant';
import BrowserContainer from "@/components/dashboard/BrowserContainer";
import FormDefault from "@COMPONENTS/FormDefault";

import Dropdown from "@/components/dashboard/Dropdown";
import TagGroup from "@/components/dashboard/TagGroup";
import RegisterButton from "@/components/dashboard/ButtonDefault";
import PreviewButton from "@/components/dashboard/ButtonOutline";
import ImageUploadContainer from "@/components/dashboard/ImageUploadContainer";
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";
import ResponsiveDiv from '@COMPONENTS/ResponsiveDiv';
import ProfileUploadContainer from '@COMPONENTS/dashboard/ProfileUploadContainer';

import iconInfo from "@IMAGES/icons/icon_info.png";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempImageBg from "@IMAGES/landingpage-profile-bgImg2.png";
import ToolTip from "@/components/dashboard/ToolTip";

const text = {
  profile_management: "プロフィル管理",
  label_post_image: "表紙",
  label_timeline: "タイムラインのサムネイル",
  label_drag_drop: "ドラッグ＆ドロップ",
  label_title: "タイトル",
  label_type: "タイプ",
  label_category: "カテゴリ",
  label_tag_setting: "タグ設定",
  label_register: "登録する",
  label_summary: "説明",
  label_adult: "年齢設定",
  label_r_19: "R-19",
  label_preview: "プレビュー",
  label_can_not_edit: "編集不可",
  tag_name: "タグ名",
  input_image: "置いてください。",
};

const typeDataList = ["1", "2", "3"];

export default function DashboardProfileManagement(props) {
  const refIsAdult = useRef();
  const [isModeUpload, setMode] = useState();
  const params = useParams();

  let seriesData = {};

  const handleRegister = () => {
    console.log("refToggle", refIsAdult);
  };

  const handlePreview = () => {
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

  }, [isModeUpload]);

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
            >{tempImageBg}</ImageUploadContainer>
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

          <ToolTip title={"Title"} text={"text something123142"} />

          <FormDefault className={""} label={text.label_title}>
            {seriesData.title}
          </FormDefault>
          <TextLabel>{text.label_type}</TextLabel>
          <Dropdown 
            {...props}
            width={"215px"}
            height={"45px"}
            marginBottom={"2.222222222vh"}
            borderRadius={"5px"}
            backgroundColor={"var(--white)"} 
            className={`${isModeUpload ? "" : "disabled"}`}
            dataList={typeDataList}
            />
          <TextLabel>{text.label_category}</TextLabel>
          <Dropdown 
            {...props}
            width={"215px"}
            height={"45px"}
            marginBottom={"2.222222222vh"}
            borderRadius={"5px"}
            backgroundColor={"var(--white)"} 
            dataList={typeDataList}
            />
          <AbultGroup>
            <TextLabel>{text.label_adult}</TextLabel>
            <FlexRow>
              <ToggleOn
                ref={refIsAdult}
                selected={false}
              />
              <R19>{text.label_r_19}</R19>
            </FlexRow>
          </AbultGroup>
          <FormDefault
            className={"group-11-2"}
            inputClassName={"summary-big"}
            label={text.label_summary}
          ></FormDefault>
          <TagGroup label={text.label_tag_setting} text={text.tag_name} />
          <TextInfoContainer>
            <IconTextLabel>{text.label_post_image}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadContainer
            width={"200px"}
            height={"300px"}
            border={"1px dashed rgba(195,202,210, 1)"}
            backgroundColor={"var(--desert-storm)"}
            textDragNDrop={text.label_drag_drop}
            textInputMessage={text.input_image}
            handleFile={handlePostImageFile}
            >
            {tempImage}
          </ImageUploadContainer>
          <Space height={"2.222222222vh"} />

          <TextInfoContainer>
            <IconTextLabel>{text.label_timeline}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadContainer
            width={"699px"}
            height={"300px"}
            border={"1px dashed rgba(195,202,210, 1)"}
            backgroundColor={"var(--desert-storm)"}
            textDragNDrop={text.label_drag_drop}
            textInputMessage={text.input_image}
            handleFile={handleTimelineImageFile}
            />
          <Space height={"4.444444444vh"} />

          <ButtonContainer>
            <PreviewButton
              width={"117px"}
              height={"40px"}
              marginRight={"16px"}
              borderRadius={"5px"}
              text={text.label_preview}
              handleClick={handlePreview}
            />
            <RegisterButton
              width={"102px"}
              height={"40px"}
              borderRadius={"5px"}
              text={text.label_register}
              handleClick={handleRegister}
            />
          </ButtonContainer>
        </form>
      </Container>
    </BrowserContainer>
  );
}

const TextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  margin-bottom: 1.851851852vh;
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

const Container = styled(ResponsiveDiv)`
  
`;

const Space = styled.div`
  width: 100%;
  height: ${(props) => props.height};
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

const IconTextLabel = styled(TextLabel)`
  margin-right: 8px;
  margin-bottom : 0;
`;

const TextInfoContainer = styled.div`
  width: 100%;
  margin-bottom: 2.037037037vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconInfoPostimage = styled.div`
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
  background-image: url(${iconInfo});
`;

const AbultGroup = styled.div`
  width: 100px;
  margin-bottom: 2.222222222vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 71px;
`;


const FlexRow = styled.div`
  height: 31px;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 103px;
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



