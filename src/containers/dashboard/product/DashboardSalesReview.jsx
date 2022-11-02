import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";
import ProductTab from "@/components/dashboard/ProductTab";
import Image from "@/components/dashboard/Image";
import ArrowRight from "@/components/dashboard/ArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import Pagination from "@/components/dashboard/Pagination";
import { setContainer } from "@/modules/redux/ducks/container";
import { useDispatch } from "react-redux";

const text = {
  number : "番号",
  product: "商品",
  title: "タイトル",
  create_date : "作成日",
  creator : "作成者",
  rating : "評価",
  answer : "回答",
  report : "通報",
  saler: "販売者",
  time: "時",
};

const tempData ={
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3
  },
  list: [
  {
    number : "1",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    date : "2022/06/11",
    user : "名前のない人間232号",
    review_count: 3,
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
    review_count: 5,
    creator_comnent: "ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    answer:{
      saler: "dfadf",
      time: "2022/06/11 23:21",
      coment: "1リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ"
    }
  },
]};



export default function DashboardSalesReview(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateAnswer, setStateAnswer] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refArrow = useRef([]);
  const params = useParams('id');

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "series",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "product",
    };
    dispatch(setContainer(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  const getSelectedItem = (id) => {
    for( let i = 0; i < stateData?.list?.length; i++ ){
      if( id === stateData.list[i].number ){
        refArrow.current[i].setState(true);
        return stateData.list[i];
      }  
    }
  };

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

  const handleChange = (page) => {
    console.log('handleChange', page);
    
  };

  const handleItemClickAnswer = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
  };

  const handleItemClickReport = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
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
    return stateData?.list?.map((item, index) => {
      return (
          <tr key={index}>
            <td className="hide-m">{item.number}</td>
            <td className="td_imgs">
              <div className="cx_thumb w131h81"><span><img src={item.image} alt={"cover iamge"} /></span></div>
            </td>
            <td className="td_subject">{item.title}</td>
            <td className="td_group">{item.date}</td>
            <td className="td_gray"><span className="view-m">{text.creator}：</span>{item.user}</td>
            <td className="td_group">
              <div className="t_star">
                <span className={`s${item.review_count}`}>
                  <FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>
                </span>
              </div>
            </td>
            <td className="td_txt">
              <div className="dsi_d_btns">
                <div className="mr60">
                  <div className="btn-pk s blue2 dsi_btn mr12" data-id={item.number} onClick={handleItemClickAnswer}>{text.answer}</div>
                  <div className="btn-pk s blue2 dsi_btn mt10 mr12" data-id={item.number} onClick={handleItemClickReport}>{text.report}</div>
                </div>
                <div className="mr30" ><ArrowRight className="fs24" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item}   /></div>
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

  useEffect(() => {
    //
    if( params.id !== undefined ){
      setStateAnswer( getSelectedItem(params.id) );
    }

  }, [params, stateData]);

  

  return (
    <div className='contents'>

      <ProductTab
        pathname={'/dashboard/product/sales/review'}  />

      <div className="inr-c">

        <div className="tbl_basic mtbl_ty1 ">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="num" />
              <col className="wid4" />
              <col className="num" />
              <col className="num" />
              <col className="num" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.create_date}</th>
                <th>{text.creator}</th>
                <th>{text.rating}</th>
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

        <Pagination
          className={''}
          page={stateData?.meta.currentPage}
          itemsCountPerPage={stateData?.meta.itemsPerPage}
          totalItemsCount={stateData?.meta.totalItems}
          callback={handleChange}
          />

      </div>

    </div>
  );
}
