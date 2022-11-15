import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import { showOneButtonPopup } from "@/common/common";
import AnswerTr from "@/components/dashboard/AnswerTr";
import ArrowRight from "@/components/dashboard/ArrowRight";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import ProductTab from "@/components/dashboard/ProductTab";
import { useWindowSize } from "@/hook/useWindowSize";
import { setContainer } from "@/modules/redux/ducks/container";
import { initSalesIdAction } from "@/modules/redux/ducks/dashboard";
import { getAuthorMineFromServer } from "@/services/postService";
import { useDispatch, useSelector } from "react-redux";

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
  startAt: "販売開始日",
};

const tempData = {
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
    creator_comnent: "1111111ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    answer:{
      saler: "dfadf",
      time: "2022/06/11 23:21",
      coment: "11111リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ"
    }
  },
]};


export default function DashboardSalesInquiry(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSalesId = useSelector(({dashboard}) => dashboard.salesId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windows = useWindowSize();
  const refArrow = useRef([]);
  const refAnswer = useRef([]);
  const params = useParams('id');
  const location = useLocation();

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container dashboard typ1",
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
  const getSalesInquiryList = async () => {
    const params = new FormData();
    
    //TODO api 변경 필요 
    const {status, data} = await getAuthorMineFromServer(params);
    console.log('getSalesInquiryList', status, data);
    
    if( status === 200 ){
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };
  //==============================================================================
  // handler
  //==============================================================================
  const handleChange = (page) => {
    console.log('handleChange', page);
    
  };

  /**
    응답 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickAnswer = (e) => {
    const id = e.target.getAttribute("data-id");

  };

  /**
    통보(신고) 이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickReport = (e) => {
    const id = e.target.getAttribute("data-id");

  };

  const handleItemArrow = useCallback((value, isSelected, index) => {
    refAnswer.current[index].setShow(isSelected);
  }, [stateData]);

  
  const handleItemMobile = useCallback((index) => {
    refArrow.current[index].setRotate(true);
  }, [stateData]);

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderSalesInquiryList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <Fragment key={index} >
          <tr className="">
            <td className="hide-m">{item.id}</td>
            <td className="td_imgs2">
              <div className="cx_thumb"><span><Image hash={item.image} /></span></div>
            </td>
            <td className="td_subject">{item.title}</td>
            <td className="td_txt0"><span className="view-m">{text.startAt}：</span>{item.date}</td>
            <td className="td_txt0"><span className="view-m">{text.creator}：</span>{item.user}</td>
            <td className="td_btns2 ta-r et_botm1">
              <div className="d-ib">
                <div className="btn-pk s blue2" data-id={item.id} onClick={handleItemClickAnswer}>{text.answer}</div>
                <div className="btn-pk s blue2" data-id={item.id} onClick={handleItemClickReport}>{text.report}</div>
              </div>
            </td>
            <td className="hide-m ta-c">
                <div className="arr" ><ArrowRight className="fs16 pointer" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item} index={index}/></div>
            </td>
          </tr>
          <AnswerTr 
            ref={el => (refAnswer.current[index] = el)}
            item={item}
            text={text}
            index={index}
            callback={handleItemMobile}
          />
          {/* <tr className={`tr_a ${item.isSelected ? 'on h_auto' : 'h_0'}`} >
            <td className="hide-m"></td>
            <td colSpan="5" className="ta-l">
              <div className="tx_a1" >
                <button type="button" className="arr view-m" id={item.id} onClick={handleItemMobile} ></button>
                <p className="t1">{item.creator_comnent}</p>
              </div>
              <div className="tx_a2">
                <span className="re view-m"><i className="fa-solid fa-share"></i></span>
                <p className="t2"><span className="i-txt">{text.saler}</span><span>{item.answer.time}時</span></p>
                <p className="t1">{item.answer.coment}</p>
              </div>
            </td>
            <td className="hide-m ta-c"></td>
          </tr> */}
        </Fragment>
    );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getSalesInquiryList();
    // setStateData(tempData);
    return () => {
      dispatch( initSalesIdAction() );
    }
  }, [params]);

  useEffect(() => {
    if( reduxSalesId !== undefined && stateData !== undefined ){
      if( windows.width > 960 ){
        //pc
        setSelectedItem( reduxSalesId );
        // setStateAnswer( getSelectedItem(reduxSalesId) );
      }
      else{
        //mobile
        // setSelectedItem( reduxSalesId );
      }
    }
  }, [refArrow, refAnswer, stateData]);

  return (
    <div className='contents'>

      <ProductTab
        pathname={'/dashboard/product/sales/inquiry'} />

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
              <col className="wid3" />
              <col className="wid5 hide-m" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.create_date}</th>
                <th>{text.creator}</th>
                <th className=""></th>
                <th className="hide-m"></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesInquiryList()
              }
            </tbody>
          </table>
          
          {/* {
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
          } */}
              
        </div>

        <Pagination
          className={''}
          meta={stateData?.meta}
          callback={handleChange}
          />

      </div>

    </div>
  );
}
