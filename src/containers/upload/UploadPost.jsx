import React, { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Title3,
  Body1,
  NotosansjpNormalDeepSpaceSparkle14p,
} from "@/styledMixins";

import BrowserContainer from "@/components/dashboard/BrowserContainer";
import FormDefault from "@COMPONENTS/FormDefault";

import Dropdown from "@/components/dashboard/Dropdown";
import TagGroup from "@/components/dashboard/TagGroup";
import RegisterButton from "@/components/dashboard/ButtonDefault";
import PreviewButton from "@/components/dashboard/ButtonOutline";
import ImageUploadBox from "@/components/dashboard/ImageUploadContainer";
import ToggleOn from "@COMPONENTS/dashboard/ToggleOn";

import iconInfo from "@IMAGES/icons/icon_info.png";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";

const textData = {
  label_series_register: "シリーズ登録",
  label_series_edit: "シリーズ修正",
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
};

const typeDataList = ["1", "2", "3"];

export default function UploadPost(props) {
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

    return () => {};
  }, [isModeUpload]);

  return (
    <BrowserContainer backgroundColor={"var(--desert-storm)"} isBorder={true}>
      <Container>
        <form method="post" enctype="multipart/form-data">
          <TextLabel>
            {isModeUpload
              ? textData.label_series_register
              : textData.label_series_edit}
          </TextLabel>
          <FormDefault className={""} label={textData.label_title}>
            {seriesData.title}
          </FormDefault>
          <DropdownTextLabel>{textData.label_type}</DropdownTextLabel>
          <Dropdown 
            {...props}
            width={"215px"}
            height={"45px"}
            marginTop={"20px"}
            marginBottom={"2vh"}
            borderRadius={"5px"}
            backgroundColor={"var(--white)"} 
            className={`${isModeUpload ? "" : "disabled"}`}
            dataList={typeDataList}
            />
          <DropdownTextLabel>{textData.label_category}</DropdownTextLabel>
          <Dropdown 
            {...props}
            width={"215px"}
            height={"45px"}
            marginTop={"20px"}
            marginBottom={"2vh"}
            borderRadius={"5px"}
            backgroundColor={"var(--white)"} 
            dataList={typeDataList}
            />
          <AbultGroup>
            <TextLabelAdult>{textData.label_adult}</TextLabelAdult>
            <FlexRow>
              <ToggleOn
                ref={refIsAdult}
                className={"group-3-22"}
                selected={false}
              />
              <R19>{textData.label_r_19}</R19>
            </FlexRow>
          </AbultGroup>
          <FormDefault
            className={"group-11-2"}
            inputClassName={"summary-big"}
            label={textData.label_summary}
          ></FormDefault>
          <TagGroup label={textData.label_tag_setting}></TagGroup>
          <TextInfoContainer>
            <IconTextLabel>{textData.label_post_image}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadBox
            textDragNDrop={textData.label_drag_drop}
            handleFile={handlePostImageFile}
          >
            {tempImage}
          </ImageUploadBox>
          <Space />

          <TextInfoContainer>
            <IconTextLabel>{textData.label_timeline}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadBox
            className={"dashboard_upload_timeline"}
            textDragNDrop={textData.label_drag_drop}
            handleFile={handleTimelineImageFile}
          ></ImageUploadBox>
          <Space />

          <ButtonContainer>
            <PreviewButton
              className={"margin-right"}
              text={textData.label_preview}
              handleClick={handlePreview}
            />
            <RegisterButton
              text={textData.label_register}
              className={"padding-group-3-16"}
              handleClick={handleRegister}
            />
          </ButtonContainer>
        </form>
      </Container>
    </BrowserContainer>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 6% 16%;
`;

const Space = styled.div`
  width: 100%;
  height: 1vh;
`;

const ButtonContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TextLabel = styled.div`
  ${Title3}
  margin-bottom: 3vh;
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
  white-space: nowrap;
`;

const IconTextLabel = styled.div`
  ${Body1}
  margin-right: 10px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const TextInfoContainer = styled.div`
  width: 100%;
  margin-bottom: 1vh;
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
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 71px;
`;

const TextLabelAdult = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

const FlexRow = styled.div`
  height: 31px;
  position: relative;
  margin-top: 20px;
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

const DropdownTextLabel = styled.div`
  ${Body1}
  min-height: 20px;
  font-weight: 700;
  color: var(--nevada);
  line-height: 20px;
  white-space: nowrap;
`;

