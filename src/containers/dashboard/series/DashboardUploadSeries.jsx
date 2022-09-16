import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Title3, Body1, NotosansjpNormalDeepSpaceSparkle14p } from "@/styledMixins";
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
import ToolTip from "@/components/dashboard/ToolTip";

import tempImage from "@IMAGES/dashboardseries-rectangle-copy.png";
import { getFileFromServer, setFileToServer } from "@/services/dashboardService";
import Slick from "@/components/dashboard/Slick";

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
  tag_name: "タグ名",
  input_image: "置いてください。",
  select_timeline: "サムネイル選択",
};

const typeDataList = ["1", "2", "3"];

const tempTimeline = [
  {
    image: "1"
  },
  {
    image: "2"
  },
  {
    image: "3"
  },
  {
    image: "4"
  },
  {
    image: "5"
  },
  {
    image: "6"
  },
];

export default function DashboardUploadSeries(props) {
  const refIsAdult = useRef();
  const refCoverImage = useRef();
  const [isModeUpload, setMode] = useState(false);
  const params = useParams();

  let seriesData = {};

  /**
  *
    파일을 서버에 업로드 
  *
  * @version 1.0.0
  * @author 2hyunkook
  * @param {file} 
  */
  const setCoverImage = async(file) => {
    // 폼데이터 구성
    const params = new FormData();
    
    // params.append("authorId", "");               
    // params.append("subscribeTierId", "");        
    // params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", "cover");                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", true);
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", "G");                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);
    
    console.log("set file params", params);

    const {status, data: resultData} = await setFileToServer(params);
    
    //create sccuess
    if( status === 201 ){
      //set hash value to input tag 
      refCoverImage.current.setImageHash(resultData?.hash);
      
      //다음 timeline이 있다면 timeline 업로드
      
    }
    else{
      //error 처리
    }

    console.log("setFile result", status, resultData);
  };

  const handleRegister = (e) => {
    console.log("handleRegister", refCoverImage.current.getImageFile());
  };

  const handlePreview = (e) => {
    console.log("handlePreview", refIsAdult);
  };

  const handleCoverImage = async (fileInfo) => {
    //cover image 업로드 후 처리
    console.log("handleCoverImage", fileInfo);
  };

  const handleTimelineImageFile = (file) => {
    console.log("handleTimelineImageFile", file);
  };

  useEffect(() => {
    //분기 upload or edit
    const isEdit = params.id === undefined;
    setMode(isEdit);
    if( isEdit === true ){
      //TODO 게시글 정보 가져오기, 심플하게 나누자
    }
  }, []);

  return (
    <BrowserContainer 
      padding={"48px 0"}
      spaceWidth={"48px"}
      backgroundColor={"var(--desert-storm)"} 
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITH_WHITE_BOX}
      >
      <Container      
        // width={"100%"}
        // height={"100%"}
        paddingTop={"48px"}
        paddingBottom={"48px"}
        paddingLeft={"396px"}
        paddingRight={"427px"}
        >
        <form method="post" encType="multipart/form-data">
          <PageTitle>
            {isModeUpload
              ? textData.label_series_register
              : textData.label_series_edit}
          </PageTitle>
          <FormDefault className={""} label={textData.label_title}>
            {seriesData.title}
          </FormDefault>
          <TextLabel>{textData.label_type}</TextLabel>
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
          <TextLabel>{textData.label_category}</TextLabel>
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
            <TextLabel>{textData.label_adult}</TextLabel>
            <FlexRow>
              <ToggleOn
                ref={refIsAdult}
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
          <TagGroup label={textData.label_tag_setting} text={textData.tag_name} />
          <TextInfoContainer>
            <IconTextLabel>{textData.label_post_image}</IconTextLabel>
            <ToolTip />
          </TextInfoContainer>
          <ImageUploadContainer
            ref={refCoverImage}
            width={"200px"}
            height={"300px"}
            border={"1px dashed var(--tiara)"}
            backgroundColor={"var(--desert-storm)"}
            name={"coverImage"}
            textDragNDrop={textData.label_drag_drop}
            textInputMessage={textData.input_image}
            handleFile={handleCoverImage}
            >
          </ImageUploadContainer>
          <Space height={"2.222222222vh"} />

          <TextInfoContainer>
            <IconTextLabel>{textData.label_timeline}</IconTextLabel>
            <ToolTip />
          </TextInfoContainer>
          <ImageUploadContainer
            width={"699px"}
            height={"300px"}
            border={"1px dashed var(--tiara)"}
            backgroundColor={"var(--desert-storm)"}
            textDragNDrop={textData.label_drag_drop}
            textInputMessage={textData.input_image}
            handleFile={handleTimelineImageFile}
          ></ImageUploadContainer>
          <Space height={"24px"} />
          
          <TextLabel>{textData.select_timeline}</TextLabel>
          {/* //TODO test용 slick css 적용 필요 */}
          <Slick list={tempTimeline} />

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



