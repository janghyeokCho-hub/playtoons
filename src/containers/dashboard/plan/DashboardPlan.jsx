import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Title3, Body1, NotosansjpNormalDeepSpaceSparkle14p, Body8, Border1pxTiara, Border1pxManatee, Body4, Body5, NotosansjpBoldBlack16px, Body6, } from "@/styledMixins";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHeart } from "@fortawesome/pro-solid-svg-icons";

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

import tempPlanImage from "@IMAGES/img-plan-diamond.png";
import ButtonOutline from "@/components/dashboard/ButtonOutline";
import ButtonDefault from "@/components/dashboard/ButtonDefault";

const text = {
  plan_management: "支援管理",
  add_plan: "支援を追加",
  edit: "編集する",
  supporter_management: "支援者管理",
  see_all: "すべてみる",
  month: "月",
};

const tempData = {
  result : 200,
  plans : [
    {
      id: "1",
      image: tempPlanImage,
      title: "ダイヤモンドプラン",
      money: "1,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
    {
      id: "2",
      image: tempPlanImage,
      title: "ダイヤモンドプラン",
      money: "1,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
    {
      id: "3",
      image: tempPlanImage,
      title: "ダイヤモンドプラン",
      money: "1,000CP",
      description: "ひと月だけでも嬉しいです！タイムラプスや未統合PSD、その他限定記事が見れます。更新は不定期ですが、なるべく沢山更新できるよう頑張ります。",
      benefits : [
        {
          text : "・差分が見れます"
        },
        {
          text : "・ダイヤモンドプランの内容＋psdファイルを　公開しています。"
        },
      ]
    },
  ],
  supporters : [
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
    {
      date : "2022/04",
      title : "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      plan: "VVIPプラン"
    },
  ]
};


export default function DashboardPlan(props) {
  const {refIsAdult, refInputNickname, refIntrodction, refTag} = useRef();
  const [data, setData] = useState(undefined);
  const params = useParams();
  const navigate = useNavigate();

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

  const handleClickAddPlan = () => {
    console.log("handleTimelineImageFile");
    //move to add plan page
    // navigate("/");     
  };

  const handleTimelineImageFile = (file) => {
    console.log("handleTimelineImageFile", file);
  };

  const handleItemClickPlan = (e) => {

  }

  const getPlanList = () => {
    if( data === undefined ){
      return;
    }

    let containerMarginRight = "";

    return data.plans.map((item, i) => {
      containerMarginRight = i === data.plans.length - 1 ? "" : "10px";

      return  (
                <PlanContainer 
                  key={i}
                  marginRight={containerMarginRight}>
                  <ImagePlan src={item.image}/>
                  <TitlePlan>{item.title}</TitlePlan>
                  <FlexContainer marginBottom={"40px"}>
                    <TextPlanMoney>{item.money}</TextPlanMoney>
                    <TextPlanDate>/ {text.month}</TextPlanDate>
                  </FlexContainer>
                  <ItemTextDescription>{item.description}</ItemTextDescription>
                  <TextBenefit marginBottom={"12px"}>{item.benefits[0].text}</TextBenefit>
                  <TextBenefit marginBottom={"48px"}>{item.benefits[1].text}</TextBenefit>
                  <ButtonDefault
                    width={"100%"}
                    height={"68px"}
                    borderRadius={"4px"}
                    text={text.edit}
                    dataId={item.id}
                    handleClick={handleItemClickPlan}
                    />
                </PlanContainer>
              );
    });
  }

  const getSupporterList = () => {
    if( data === undefined ){
      return;
    }

    return data.supporters.map((item, i) => {
      return  (
                <MarginBottomContainer key={i}>
                  <FlexContainer marginBottom={"17px"}>
                    <ItemTextSupporterDate>{item.date}</ItemTextSupporterDate>
                    <ItemOvalSupporter></ItemOvalSupporter>
                    <ItemTitleSupporter>{item.title}</ItemTitleSupporter>
                    <ItemTextSupporterPlan>{item.plan}</ItemTextSupporterPlan>
                  </FlexContainer>
                  <LineHorizontalSupporter />
                </MarginBottomContainer>
              );
    });

  }

  useEffect(() => {
    setData(tempData);
  }, []);

  return (
    <BrowserContainer 
      backgroundColor={"var(--desert-storm)"} 
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITHOUT_PADDING}
      >
      <Container>
        <ContentBorderContainer
          padding={"32px 32px 123px 32px"}
          marginBottom={"48px"}>
          <FlexContainer marginBottom={"53px"}>
            <PageTitle>{text.plan_management}</PageTitle>
            <ButtonOutline
              width={"143px"}
              height={"40px"}
              marginLeft={"auto"}
              borderRadius={"5px"}
              text={text.add_plan}
              icon={"faPlus"}
              handleClick={handleClickAddPlan}
              />
          </FlexContainer>
          {/* TODO Plan 리스트 작성 */}
          <FlexContainer>
            { getPlanList() }
          </FlexContainer>
        </ContentBorderContainer>

        <ContentBorderContainer
          width={"762px"}
          padding={"32px"} >
          <FlexContainer marginBottom={"32px"}>
            <TitleSupporter>{text.supporter_management}</TitleSupporter>
            <TextSeeAll>{text.see_all}</TextSeeAll>
            <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ 
                    width: "9px", 
                    height: "16px", 
                    color: "var(--violet-blue)" }}
                />
          </FlexContainer>
          <LineHorizontalSupporter />

          { getSupporterList() }
        </ContentBorderContainer>
      </Container>
    </BrowserContainer>
  );
}

const ItemTextSupporterPlan = styled.div`
  ${NotosansjpBoldBlack16px}
`;

const ItemTitleSupporter = styled.div`
  ${NotosansjpBoldBlack16px}
  flex: 1;
`;

const ItemOvalSupporter = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  margin-right: 16px;
  background-color: var(--vulcan);
`;

const ItemTextSupporterDate = styled.div`
  ${Body5}
  margin-right: 48px;
  color : var(--nevada);
`;

const LineHorizontalSupporter = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 16px;
  background-color: var(--mercury);
`;

const TextSeeAll = styled.div`
  ${Body4}
  color: var(--violet-blue);
  margin-right: 8px;
`;

const TitleSupporter = styled.div`
  ${Title3}
  color: var(--nevada);
  margin-right: auto;
`;

const TextBenefit = styled.div`
  ${Body1}
  color: var(--vulcan);
  margin-bottom: ${(props) => props.marginBottom};
`;

const ItemTextDescription = styled.div`
  ${Body6}
  margin-bottom: 48px;
  color: var(--nevada);
  line-height: 16px;
`;

const TextPlanDate = styled.div`
  ${Body4}
  color: var(--manatee);
`;

const TextPlanMoney = styled.div`
  ${Title3}
  color: var(--violet-blue);
  margin-right: 8px;
`;

const TitlePlan = styled.div`
  ${Title3}
  color: var(--vulcan);
  margin-bottom: 23px;
`;

const ImagePlan = styled.img`
  width: 100%;
  height: 338px;
  margin-bottom: 37px;
`;

const PlanContainer = styled.div`
  ${Border1pxManatee}
  border-radius: 10px;
  padding: 48px 17px 48px 23px;
  margin-right: ${(props) => props.marginRight};
`;

const ContentBorderContainer = styled.div`
  ${Border1pxTiara}
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--white);
  border-radius: 8px;
`;

const FlexContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  padding: 47px 49px 48px 47px;   //TODO padding 디자이너 확인 필요
`;

const MarginBottomContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom};
`;


const PageTitle = styled.div`
  ${Title3}
  font-weight: 500;
  color: var(--nevada);
  line-height: 28px;
  white-space: nowrap;
`;


