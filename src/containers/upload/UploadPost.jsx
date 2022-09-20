import React, { useRef, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Title3,
  Body1,
  NotosansjpNormalDeepSpaceSparkle14p,
} from "@/styledMixins";

import BrowserContainer from "@COMPONENTS/dashboard/BrowserContainer";
import FormDefault from "@COMPONENTS/dashboard/TextInput";

import Dropdown from "@COMPONENTS/dashboard/Dropdown";
import TagGroup from "@COMPONENTS/dashboard/TagGroup";
import RegisterButton from "@COMPONENTS/dashboard/ButtonDefault";
import PreviewButton from "@COMPONENTS/dashboard/ButtonOutline";
import ImageUploadContainer from "@COMPONENTS/dashboard/ImageUploadContainer";
import ResponsiveDiv from '@COMPONENTS/ResponsiveDiv';
import Tpye from "@/components/post/Radio";

import iconInfo from "@IMAGES/icons/icon_info.png";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";
import ToggleButton from "@/components/post/RadioButton";

const textData = {
  label_post_upload: "投稿する",
  label_post_edit: "投稿を修正",
  label_series: "シリーズ",
  label_type: "タイプ",
  label_title: "タイトル",
  label_episode: "話",
  label_content: "コンテンツ",  //icon
  label_tag: "タグ",
  label_support_user: "閲覧範囲（支援者）",   //dropdown
  label_timeline: "タイムラインのサムネイル",

  label_drag_drop: "ドラッグ＆ドロップ",
  label_preview: "プレビュー",
  label_register: "登録する",

  tag_name: "タグ名",
  type_webtoon: "ウェブトゥーン",
  type_article: "アーティクル",
  type_movie: "映像",
  label_can_not_edit: "編集不可",
  input_image: "置いてください。",
};

const typeList = [
  {
    name : textData.type_webtoon,
    code : "1",
    isSelected : true,
  },
  {
    name : textData.type_article,
    code : "2",
    isSelected : false,
  },
  {
    name : textData.type_movie,
    code : "3",
    isSelected : false,
  }
];

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

  }, [isModeUpload]);

  return (
    <BrowserContainer 
      backgroundColor={"var(--desert-storm)"}       
      >
      <Container      
        // width={"100%"}
        // height={"100%"}
        paddingTop={"48px"}
        paddingBottom={"48px"}
        paddingLeft={"610px"}
        paddingRight={"610px"}
        >
        <form method="post" encType="multipart/form-data">
          <PageTitle>
            {isModeUpload
              ? textData.label_post_upload
              : textData.label_post_edit}
          </PageTitle>

          <FormDefault 
            label={textData.label_series}>
            {seriesData.title}
          </FormDefault>

          <TextLabel>{textData.label_type}</TextLabel>
          <Tpye 
            height={"44px"}
            itemMarginRight={"16px"}
            itemBorderRadius={"4px"}
            marginBottom={"2.222222222vh"}
            list={typeList}
            />

          <FormDefault label={textData.label_title}>
            {seriesData.title}
          </FormDefault>

          <FormDefault label={textData.label_episode}>
            {seriesData.episode}
          </FormDefault>

          <TextInfoContainer>
            <IconTextLabel>{textData.label_content}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadContainer
            width={"700px"}
            height={"300px"}
            marginBottom={"2.222222222vh"}
            border={"1px dashed var(--tiara)"}
            backgroundColor={"var(--desert-storm)"}
            textDragNDrop={textData.label_drag_drop}
            textInputMessage={textData.input_image}
            handleFile={handlePostImageFile}
            >
            {/* {tempImage} */}
          </ImageUploadContainer>
          
          <TagGroup label={textData.label_tag} text={textData.tag_name} />

          <TextLabel>{textData.label_support_user}</TextLabel>
          <Dropdown 
            {...props}
            width={"215px"}
            height={"45px"}
            marginBottom={"2.222222222vh"}
            borderRadius={"5px"}
            backgroundColor={"var(--white)"} 
            dataList={typeDataList}
            />

          <TextInfoContainer>
            <IconTextLabel>{textData.label_timeline}</IconTextLabel>
            <IconInfoPostimage />
          </TextInfoContainer>
          <ImageUploadContainer
            width={"700px"}
            height={"300px"}
            marginBottom={"4.444444444vh"}
            border={"1px dashed var(--tiara)"}
            backgroundColor={"var(--desert-storm)"}
            textDragNDrop={textData.label_drag_drop}
            textInputMessage={textData.input_image}
            handleFile={handleTimelineImageFile}
            >
          </ImageUploadContainer>
          

          <ButtonContainer>
            <PreviewButton
              width={"117px"}
              height={"40px"}
              marginRight={"16px"}
              borderRadius={"5px"}
              text={textData.label_preview}
              handleClick={handlePreview}
            />
            <RegisterButton
              width={"102px"}
              height={"40px"}
              borderRadius={"5px"}
              text={textData.label_register}
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
  margin-bottom: 4.444444444vh;  
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



