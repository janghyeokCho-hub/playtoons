import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import { showOneButtonPopup } from "@/common/common";
import AnswerTr from "@/components/dashboard/AnswerTr";
import ArrowRight from "@/components/dashboard/ArrowRight";
import Pagination from "@/components/dashboard/MyPagination";
import ProductTab from "@/components/dashboard/ProductTab";
import { setContainer } from "@/modules/redux/ducks/container";
import { initSalesIdAction } from "@/modules/redux/ducks/dashboard";
import { getAuthorMineFromServer } from "@/services/postService";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

const text = {
  number : "番号",
  product: "商品",
  title: "タイトル",
  create_date : "作成日",
  creator : "作成者",
  startAt : "販売開始日：",
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
    id : "1",
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
    id : "2",
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
  const reduxSalesId = useSelector(({dashboard}) => dashboard.salesId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refArrow = useRef([]);
  const refAnswer = useRef([]);

  //==============================================================================
  // function
  //==============================================================================

  const setSelectedItem = (id) => {
    let index = undefined;
    for( let i = 0; i < stateData?.list.length; i++ ){
      if( stateData.list[i].id === id ){
        index = i;
        break;
      }
    }

    if( index !== undefined ){
      refArrow.current[index].setRotate(true);
      refAnswer.current[index].setShow(true);
      refAnswer.current[index].scrollIntoView();
    }
  };
  //==============================================================================
  // api
  //==============================================================================
  const getSalesReview = async () => {
    const params = new FormData();
    
    const {status, data} = await getAuthorMineFromServer(params);
    console.log('getSalesReview', status, data);
    
    if( status === 200 ){
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================
  /**
    pagination 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleChange = (page) => {
    console.log('handleChange', page);
    
  };

  /**
    회답 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickAnswer = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate(`/dashboard/series/detail/${no}/1`);
  };

  /**
    통보(신고) 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickReport = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate(`/dashboard/series/detail/${no}/1`);
  };

  /**
    화살표 이벤트  
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemArrow = (value, isSelected, index) => {
    refAnswer.current[index].setShow(isSelected);
  };

  /**
    모바일 클릭 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemMobile = useCallback((index) => {
    refArrow.current[index].setRotate(true);
  }, []);
  //==============================================================================
  // hook & render
  //==============================================================================

  const renderSalesInquiryList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <Fragment  key={index}>
          <tr className="tr-q">
            <td className="hide-m">{item.id}</td>
            <td className="td_imgs2">
              <div className="cx_thumb"><span><img src={item.image} alt={"cover iamge"} /></span></div>
            </td>
            <td className="td_subject">{item.title}</td>
            <td className="td_txt0"><span className="view-m">{text.startAt}：</span>{item.date}</td>
            <td className="td_txt0"><span className="view-m">{text.creator}：</span>{item.user}</td>
            <td className="td_star">
              <div className="t_star">
                <span className={`s${item.review_count}`}>
                  <FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>
                </span>
              </div>
            </td>
            <td className="td_btns2 ta-r et_botm1">
              <div className="d-ib">
                <div className="btn-pk s blue2" data-id={item.id} onClick={handleItemClickAnswer}>{text.answer}</div>
                <div className="btn-pk s blue2" data-id={item.id} onClick={handleItemClickReport}>{text.report}</div>
              </div>
            </td>
            <td className="hide-m ta-c">
              <div className="arr" ><ArrowRight className="fs16 pointer" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item} index={index}  /></div>
            </td>
          </tr>
          <AnswerTr 
            ref={el => (refAnswer.current[index] = el)}
            type={'salesReview'}
            item={item}
            text={text}
            index={index}
            callback={handleItemMobile}
          />
        </Fragment>
    );
    });
  };

  useEffect(() => {
    getSalesReview();

    return () => {
      dispatch( initSalesIdAction() );
    }
  }, []);

  
  useEffect(() => {
    if( reduxSalesId !== undefined && stateData !== undefined ){
      setSelectedItem( reduxSalesId );
    }
  }, [reduxSalesId, stateData,]);

  return (
    <>

      <div className="inr-c">

        <div className="tbl_basic mtbl_ty1 ">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid5 hide-m" />
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
                <th className="hide-m"></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesInquiryList()
              }
            </tbody>
          </table>
        </div>

        <Pagination
          meta={stateData?.meta}
          callback={handleChange}
          />

      </div>

    </>
  );
}
