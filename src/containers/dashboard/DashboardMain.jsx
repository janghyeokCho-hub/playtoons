import React, { useEffect, useState } from "react";
import {
  Title3,
  Body6,
  Title2,
  Body2,
  Headline2Style,
  Body1,
  Body5,
  Body4,
  Border1pxTiara,
  Body8,
} from "@/styledMixins";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronRight, faStar } from "@fortawesome/pro-solid-svg-icons";

import BrowserContainer, {CONTENTS_AREA_TYPE} from "@COMPONENTS/dashboard/BrowserContainer";
import ButtonOutline from "@COMPONENTS/dashboard/ButtonOutline";
import ButtonDefault from "@COMPONENTS/dashboard/ButtonDefault";

import tempImageSales from '@IMAGES/temp_seller_image.png';
import tempImageSeries01 from '@IMAGES/temp_series_01.png';
import tempImageSeries02 from '@IMAGES/temp_series_02.png';
import tempImageSeries03 from '@IMAGES/temp_series_03.png';
import tempImageSeries04 from '@IMAGES/temp_series_04.png';
import tempImageSeries05 from '@IMAGES/temp_series_05.png';
import tempImageSeries06 from '@IMAGES/temp_series_06.png';

const text = {
  today_sales: "当日の売上",
  detail: "詳細",
  case : "件",
  recently_sales_product: "最近販売された商品",
  recently_question: "最近のお問い合わせ",
  see_all: "すべてみる",
  recently_review : "最近のレビュー",
  follower_count : "フォロー数",
  progress_in_series : "連載中のシリーズ",
  person: "名",
  series_management : "シリーズ管理",
  recently_post : "最近の投稿",
  recently_reaction: "最近のリアクション",
  past_sales:"過去の売り上げ",
  history_deposit : "振込履歴",
  before_yesterday : "前日より",
};

const tempData = {
  today: "2022年02月19日 12:11",
  sales_cases: "2,112件",
  before_yesterday: "前日より+123%",
  pc_count: "934,010PC",
  sales_product_list : [
    {
      image : tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの1111111111111111111",
      date: "2022/06/11"
    },
    {
      image : tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの22222222222222",
      date: "2022/06/11"
    },
    {
      image : tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの33333333333333",
      date: "2022/06/11"
    },
    {
      image : tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの44444444444444",
      date: "2022/06/11"
    },
  ],
  question_list : [
    {
      id: "1",
      title : "どうしても返却は無理なんでしょうか？",
      date : "2022/06/11"
    },
    {
      id: "2",
      title : "ABCに制作に関するお問い合わせです。",
      date : "2022/06/11"
    },
    {
      id: "3",
      title : "デザインの変更依頼",
      date : "2022/06/11"
    },
    {
      id: "4",
      title : "お願いしてたコンテンツに若干歪んでる箇asdafadsgfasdfasdfdasfas",
      date : "2022/06/11"
    },
  ],
  review_list : [
    {
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count : 4
    },
    {
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count : 2
    },
    {
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count : 1
    },
    {
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count : 5
    },
  ],

  follower_count : "451,302名",
  follower_plus_count : "+4124名",
  series_list : [
    {
      image: tempImageSeries01,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    {
      image: tempImageSeries02,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    {
      image: tempImageSeries03,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    {
      image: tempImageSeries04,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    {
      image: tempImageSeries05,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    {
      image: tempImageSeries06,
      status: "new",
      count : "1.2k",
      title: "新人さんは事故123123123",
      type : "ウェブトゥーン",
    },
    // {
    //   image: tempImageSeries01,
    //   status: "new",
    //   count : "1.2k",
    //   title: "新人さんは事故123123123",
    //   type : "ウェブトゥーン",
    // },
    // {
    //   image: tempImageSeries02,
    //   status: "new",
    //   count : "1.2k",
    //   title: "新人さんは事故123123123",
    //   type : "ウェブトゥーン",
    // },
    // {
    //   image: tempImageSeries03,
    //   status: "new",
    //   count : "1.2k",
    //   title: "新人さんは事故123123123",
    //   type : "ウェブトゥーン",
    // },
  ],
  past_sales_list : [
    {
      date : "2022/04",
      money: "123,441PC",
      id: "1"
    },
    {
      date : "2022/05",
      money: "123,441PC",
      id: "2"
    },
    {
      date : "2022/06",
      money: "123,441PC",
      id: "3"
    },
    {
      date : "2022/07",
      money: "123,441PC",
      id: "4"
    },
  ],
  history_deposit_list: [
    {
      date: "2022/04",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b1",
    },
    {
      date: "2022/05",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b2",
    },
    {
      date: "2022/06",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b3",
    },
    {
      date: "2022/07",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b4",
    },
  ],
};

export default function DashboardMain() {
  const [data, setData] = useState({});

  const handleClickDetail = (e) => {
    
  };

  const handleItemClick = (event) => {
    console.log("event", event.target.getAttribute("data-id"));
  }

  const getSalesProductList = (list) => {
    if( list !== undefined ){

      return list.map(( item, index ) => {
        const marginRight = index === list.length-1 ? "" : "32px";

        return  <SalesItemContainer key={index} marginRight={marginRight}>
                  <ItemSalesImage src={item.image} />
                  <ItemTitleText marginBottom={"8px"}>{item.title}</ItemTitleText>
                  <ItemDateText>{item.date}</ItemDateText>
                </SalesItemContainer>
      });
    }
  };

  const getQuestionList = (list) => {
    if( list !== undefined ){
      return list.map((item, index) => {
        return  <Container key={index}>
                  <FlexContainer marginBottom={"30px"}>
                    <ItemTitleText width={"340px"} marginRight={"48px"}>{item.title}</ItemTitleText>
                    <ItemDateText>{item.date}</ItemDateText>
                  </FlexContainer>
                  <HorizontalItemLine marginBottom={"30px"} />
                </Container>
      });
    }
  };

  const getReviewList = (list) => {
    if( list !== undefined ){
      return list.map((item, index) => {
        return <Container key={index}>
                <FlexContainer marginBottom={"30px"}>
                  {getStar(item.review_count)}
                  <ItemTitleText width={"340px"}>{item.title}</ItemTitleText>
                  <ItemDateText marginLeft={"auto"}>{item.date}</ItemDateText>
                </FlexContainer>
                <HorizontalItemLine marginBottom={"30px"} />
              </Container>
      });
    }
  };

  const getStar = (starCount) => {
    if( starCount !== undefined ){
      const limit = 5;
      let marginRight = "1px";
      let color = "";
      let result = [];

      for(let i = 0; i < limit; i++){
        if( i === limit-1 ){ marginRight = "48px"; }
        color = i < starCount ? "var(--star-yellow)" : "var(--star-gray)";

        result.push(
          <FontAwesomeIcon 
            icon={faStar}
            key={i}
            style={{ width: "17px", height: "16px", marginRight: `${marginRight}`, color: `${color}` }}
            />
        );
      }

      return result;
    }
  };

  const getSeriesList = (list) => {
    let marginRight = "32px";

    if( list !== undefined ){
      return list.map((item, index) => {
        if( index === list.length-1 ){ marginRight = ""; }

        return  <Container width={"214px"} key={index} marginRight={marginRight}>
                  <RelativeContainer marginBottom={"8px"}>
                    <ItemSalesImage src={item.image} />

                    <HeartContainer >
                      <FontAwesomeIcon 
                        icon={faHeart}
                        style={{ width: "12px", marginRight: "6.75px", color: "white" }}
                        />
                        <HeartText>{item.count}</HeartText>
                    </HeartContainer>                    
                  </RelativeContainer>
                  <ItemTypeText marginBottom={"4px"}>{item.type}</ItemTypeText>
                  <ItemTitleText >{item.title}</ItemTitleText>
                </Container>
      });
    }
  };

  const getReactionList = (list) => {
    if( list !== undefined ){
      return list.map((item, index) => {
        return  <Container key={index}>
                  <FlexContainer marginBottom={"30px"}>
                    <ItemTitleText  marginRight={"48px"}>{item.title}</ItemTitleText>
                    <ItemDateText>{item.date}</ItemDateText>
                  </FlexContainer>
                  <HorizontalItemLine marginBottom={"30px"} />
                </Container>
      });
    }
  };

  const getSalesListInPast = (list) => {
    if( list !== undefined ){
      return list.map((item, index) => {
        return  <Container width={"100%"} key={index}>
                  <FlexContainer marginBottom={"30px"}>
                    <ItemDateText marginRight={"80px"}>{item.date}</ItemDateText>
                    <ItemTitleText width={"auto"}  flex={"1"}>{item.money}</ItemTitleText>
                    <ButtonOutline
                      width={"12.4em"}
                      height={"3.2em"}
                      borderRadius={"4px"}
                      text={text.detail}
                      dataId={item.id}
                      handleClick={handleItemClick}
                      />
                  </FlexContainer>
                  <HorizontalItemLine marginBottom={"30px"} />
                </Container>
      });
    }
  };

  const getHistoryOfDeposit = (list) => {
    if( list !== undefined ){
      return list.map((item, index) => {
        return  <Container key={index}>
                  <FlexContainer marginBottom={"30px"}>
                    <ItemDateText marginRight={"8em"}>{item.date}</ItemDateText>
                    <ItemTitleText width={"124px"} marginRight={"127px"}>{item.money}</ItemTitleText>
                    <ItemBankText>{item.bank_name}</ItemBankText>
                    <ButtonOutline
                      width={"12.4em"}
                      height={"3.2em"}
                      borderRadius={"4px"}
                      text={text.detail}
                      dataId={item.id}
                      handleClick={handleItemClick}
                      />
                  </FlexContainer>
                  <HorizontalItemLine marginBottom={"30px"} />
                </Container>
      });
    }
  };

  useEffect(() => {
    setData(tempData);
  }, []);

  return (
    <BrowserContainer
      backgroundColor={"var(--desert-storm)"}
      type={CONTENTS_AREA_TYPE.DASHBOARD}
      spaceWidth={"0"}
      padding={"48px 48px"}
      >
      
      <WhiteBoardContainer padding={"32px 32px 0px 32px"} marginBottom={"80px"}>
        <FlexContainer alignItems={"initial"} marginBottom={"24px"}>
          <TitleText>{text.today_sales}</TitleText>
          <TodayText>{data.today}</TodayText>
        </FlexContainer>
        <FlexContainer marginBottom={"16px"}>
          <SalesCountText>{data.sales_cases}</SalesCountText>
          <YesterdayText>{data.before_yesterday}</YesterdayText>
        </FlexContainer>
        <FlexContainer marginBottom={"48px"}>
          <PCText>{data.pc_count}</PCText>
          <ButtonDefault
            width={"147px"}
            height={"44px"} 
            borderRadius={"4px"}
            text={text.detail}
            handleClick={handleClickDetail}
            marginLeft={"auto"}
            />
        </FlexContainer>
        <HorizontalTitleLine marginBottom={"48px"} />

        <TitleText marginBottom={"30px"} >{text.recently_sales_product}</TitleText>
        <FlexContainer id={"sales_product_list_container"} marginBottom={"48px"} >
          {getSalesProductList(data.sales_product_list)}
        </FlexContainer>
        <HorizontalTitleLine marginBottom={"46px"} />

        <FlexContainer marginBottom={"18px"}>
          {/* question list */}
          <Container width={"475px"} marginRight={"91px"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.recently_question}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getQuestionList(data.question_list)}
          </Container>

          {/* review list */}
          <Container flex={"1"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.recently_review}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getReviewList(data.review_list)}
          </Container>
        </FlexContainer>
      </WhiteBoardContainer>

      {/* follower */}
      <WhiteBoardContainer padding={"32px 32px 0px 32px"} >
        <FlexContainer alignItems={"initial"} marginBottom={"24px"}>
          <TitleText>{text.follower_count}</TitleText>
          <TodayText>{data.today}</TodayText>
        </FlexContainer>
        <FlexContainer marginBottom={"48px"}>
          <PCText marginRight={"8px"}>{data.follower_count}</PCText>
          <YesterdayText>{data.follower_plus_count}</YesterdayText>
        </FlexContainer>
        <HorizontalTitleLine marginBottom={"48px"} />

        {/* series list */}
        <TitleText marginBottom={"30px"} >{text.progress_in_series}</TitleText>
        <FlexContainer marginBottom={"48px"} >
          {getSeriesList(data.series_list)}
        </FlexContainer>
        <HorizontalTitleLine marginBottom={"46px"} />

        <FlexContainer marginBottom={"18px"}>
          {/* post list */}
          <Container width={"475px"} marginRight={"91px"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.recently_post}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getQuestionList(data.question_list)}
          </Container>

          {/* reaction list */}
          <Container flex={"1"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.recently_reaction}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getReactionList(data.review_list)}
          </Container>
        </FlexContainer>
        <HorizontalTitleLine marginBottom={"48px"} />

        <FlexContainer marginBottom={"18px"}>
          {/* sales list In past */}
          <Container width={"475px"} marginRight={"91px"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.past_sales}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getSalesListInPast(data.past_sales_list)}
          </Container>

          {/* history of deposit */}
          <Container flex={"1"}>
            <FlexContainer marginBottom={"48px"}>
              <TitleText marginRight={"auto"} >{text.history_deposit}</TitleText>
              <SeeAllText>{text.see_all}</SeeAllText>
              <FontAwesomeIcon 
                icon={faChevronRight}
                style={{ width: "9px", height: "16px", color: "var(--violet-blue)" }}
                />
            </FlexContainer>
            {getHistoryOfDeposit(data.history_deposit_list)}
          </Container>
        </FlexContainer>
      </WhiteBoardContainer>
    </BrowserContainer>
  );
}
//3A434D --bright-gray
//617080 --nevada
//DDE1E5  --mercury
//13161A  --vulcan
//394BC2  --violet-blue



const RelativeContainer = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom};
  position: relative;
`;

const HeartText = styled.div`
  ${Body1}
  font-size: 1.4em;
  font-weight: 700;
  color: var(--white);
`;

const ItemTypeText = styled.div`
  ${Body8}
  margin-bottom: ${(props) => props.marginBottom};
  font-weight: 700;
  font-size: 1.2em;
  color: var(--violet-blue);
`;

const Container = styled.div`
  width: ${(props) => props.width};
  margin-right: ${(props) => props.marginRight};
  flex: ${(props) => props.flex};
`;

const HorizontalItemLine = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--mercury);
`;

const SalesItemContainer = styled.div`
  width: 343px;
  margin-right: ${(props) => props.marginRight};
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: ${(props) => props.alignItems ? props.alignItems : "center"};
  margin-bottom: ${(props) => props.marginBottom};
`;

const HeartContainer = styled(FlexContainer)`
  position: absolute;
  left: 16.62px;
  bottom: 20.77px;
  display: flex;
  align-items: center;
`;

const SeeAllText = styled.div`
  ${Body4}
  margin-right: 8px;
  font-size: 1.4em;
  font-weight: 700;
  color: var(--violet-blue);
  white-space: nowrap;
`;

const ItemDateText = styled.div`
  ${Body5}
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  font-size: 1.4em;
  font-weight: 500;
  color: var(--nevada);
  white-space: nowrap;
`;

const ItemBankText = styled.div`
  ${Body2}
  width: 100px;
  height: 20px;
  margin-right: 270px;
  font-size: 1.6em;
  font-weight: 500;
  color: var(--nevada);
`;

const ItemTitleText = styled.div`
  ${Body1}
  width: ${(props) => props.width ? props.width : "100%"};
  margin-right: ${(props) => props.marginRight ? props.marginRight : ""};
  margin-bottom: ${(props) => props.marginBottom};
  flex: ${(props) => props.flex};
  font-size: 1.6em;
  font-weight: 700;
  color: var(--vulcan);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ItemSalesImage = styled.img`
  width: 100%;
  margin-bottom: 2px;
`;

const HorizontalTitleLine = styled.div`
  width: 100%;
  height: 3px;
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--mercury);
`;

const PCText = styled.div`
  ${Headline2Style}
  margin-right: ${(props) => props.marginRight};
  font-size: 6.4em;
  font-weight: 700;
  color: var(--bright-gray);
  white-space: nowrap;
`;

const YesterdayText = styled.div`
  ${Body2}
  font-size: 1.6em;
  font-weight: 500;
  color: var(--apple);
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const SalesCountText = styled.div`
  ${Title2}
  margin-right: 8px;
  font-size: 2.8em;
  font-weight: 700;
  color: var(--bright-gray);
  white-space: nowrap;
`;

const TodayText = styled.div`
  ${Body6}
  font-size: 1.4em;
  font-weight: 400;
  color: var(--nevada);
  white-space: nowrap;
  margin-left: auto;
`;

const TitleText = styled.div`
  ${Title3}
  margin-right: ${(props) => props.marginRight};
  margin-bottom: ${(props) => props.marginBottom};
  font-size: 2.4em;
  font-weight: 500;
  color: var(--nevada);
  white-space: nowrap;
`;

const WhiteBoardContainer = styled.div`
  ${Border1pxTiara}
  width: 100%;
  max-width: 1,667px;
  padding: ${(props) => props.padding};
  margin-bottom: ${(props) => props.marginBottom};
  background-color: var(--white);
  border-radius: 8px;
  @media only screen and (max-width: 1200px) {
    
  }
`;
