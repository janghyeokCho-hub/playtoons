import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//temp data
import '@/css/test.css';
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";
import ProductTab from "@/components/dashboard/ProductTab";
import Image from "@/components/dashboard/Image";
import ArrowRight from "@/components/dashboard/ArrowRight";

const text = {
  number : "番号",
  product: "商品",
  title: "タイトル",
  create_date : "作成日",
  creator : "作成者",
  answer : "回答",
  report : "通報",
  saler: "販売者",
  time: "時",
};

const tempData = [
  {
    number : "1",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    date : "2022/06/11",
    user : "名前のない人間232号",
    creator_comnent: "ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    answer:{
      saler: "dfadf",
      time: "2022/05/11 23:21",
      coment: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ"
    }
  },
  {
    number : "2",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    date : "2022/07/11",
    user : "名前のない人間2号",
    creator_comnent: "ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    answer:{
      saler: "dfadf",
      time: "2022/06/11 23:21",
      coment: "1リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ"
    }
  },
];


const STATUS_TYPE = {
  sale : "販売中",
  audit : "審査中",
  not_for_sale : "販売不可"
};


export default function DashboardSalesInquiry(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateAnswer, setStateAnswer] = useState(undefined);
  const navigate = useNavigate();
  const refArrow = useRef([]);

  const getProductList = async () => {
    // 시리즈 스토리 리스트
    const params = {
      email: "",
    };

    // const { status, data } = await getProductListFromServer(params);
    // 
    // if( status === 200 ){
    //   setList(handleGetSeriesStoryList(data));
    // }
    // 
    // setData(getProductListFromResultData(data));
  };

  const handleItemClickAnswer = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
  };

  const handleItemClickReport = (e) => {
    let no = e.target.getAttribute("data-id");

    // navigate("/dashboard/series/detail/" + no);
  };

  const handleItemArrow = (value, isSelected) => {
    if( isSelected === true ){
      setStateAnswer(undefined);
    }
    else{
      for( let i = 0; i < refArrow.current.length; i++ ){
        if( value.number !== refArrow.current[i].getValue().number ){
          refArrow.current[i].init();
        }
      }
  
      setStateAnswer(value);
    }
  };


  const renderSalesInquiryList = () => {
    return stateData?.map((item, index) => {
      return (
          <tr key={index}>
            <td className="hide-m">{item.number}</td>
            <td className="td_imgs">
              <div className="cx_thumb w131h81"><span><Image hash={item.image} alt={"cover iamge"} /></span></div>
            </td>
            <td className="td_subject">{item.title}</td>
            <td className="td_group">{item.date}</td>
            <td className="td_gray"><span className="view-m">{text.creator}：</span>{item.user}</td>
            <td className="td_txt">
              <div className="dsi_d_btns">
                <div className="mr60">
                  <div className="btn-pk s blue2 dsi_btn " data-id={item.number} onClick={handleItemClickAnswer}>{text.answer}</div>
                  <div className="btn-pk s blue2 dsi_btn mt10" data-id={item.number} onClick={handleItemClickReport}>{text.report}</div>
                </div>
                <div className="mr30" ><ArrowRight className="fs24 pointer" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item}/></div>
              </div>
            </td>
          </tr>
    );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setStateData(tempData);
  }, []);

  return (
    <Container 
      type={"series"} >

      <ProductTab />

      <div className="inr-c">

        <div className="tbl_basic mtbl_ty1 ">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="wid1" />
              <col className="wid4" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.create_date}</th>
                <th>{text.creator}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesInquiryList()
              }
            </tbody>
          </table>
          
          {
            stateAnswer && 
              <div className="col dsi_answer">
                <div className="dsi_answer_text mb32">{stateAnswer?.creator_comnent}</div>
                <div className="dsi_answer_line mb19"></div>
                <div className="flex mb8">
                  <div className="dsi_answer_blue mr10">{text.saler}</div>
                  <div className="dsi_answer_time">{stateAnswer?.answer.time}{text.time}</div>
                </div>
                <div className="dsi_answer_text">{stateAnswer?.answer.coment}</div>
              </div>
          }
              
        </div>

      </div>

    </Container>
  );
}
