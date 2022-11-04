import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import ArrowRight from "@/components/dashboard/ArrowRight";
import Pagination from "@/components/dashboard/Pagination";
import ProductTab from "@/components/dashboard/ProductTab";
import { setContainer } from "@/modules/redux/ducks/container";
import { useDispatch } from "react-redux";
import Image from "@/components/dashboard/Image";

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
  const [stateAnswer, setStateAnswer] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const getSelectedItem = (id) => {
    for( let i = 0; i < stateData?.list?.length; i++ ){
      if( id === stateData.list[i].number ){
        refArrow.current[i].setState(true);
        return stateData.list[i];
      }
    }
  };

  //==============================================================================
  // api
  //==============================================================================
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
  //==============================================================================
  // handler
  //==============================================================================
  const handleChange = (page) => {
    console.log('handleChange', page);
    
  };

  const handleItemClickAnswer = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
  };

  const handleItemClickReport = (e) => {
    let no = e.target.getAttribute("data-id");

    // navigate("/dashboard/series/detail/" + no);
  };

  const handleItemArrow = useCallback((value, isSelected) => {
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
  }, [stateAnswer]);

  const handleItemMobile = useCallback((event) => {
    const index = parseInt( event.target.getAttribute('index') );
    const display = refAnswer.current[index].style.display;
    
    refAnswer.current[index].style.display = display === 'none' ? 'block' : 'none';
  }, []);

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderSalesInquiryList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <Fragment key={index}>
          <tr >
            <td className="hide-m">{item.number}</td>
            <td className="td_imgs2">
              <div className="cx_thumb"><span><Image hash={item.image} /></span></div>
            </td>
            <td className="td_subject">{item.title}</td>
            <td className="td_txt0"><span className="view-m">{text.startAt}：</span>{item.date}</td>
            <td className="td_txt0"><span className="view-m">{text.creator}：</span>{item.user}</td>
            <td className="td_btns2 ta-r et_botm1">
              <div className="d-ib">
                <div className="btn-pk s blue2" data-id={item.number} onClick={handleItemClickAnswer}>{text.answer}</div>
                <div className="btn-pk s blue2" data-id={item.number} onClick={handleItemClickReport}>{text.report}</div>
              </div>
            </td>
            <td className="hide-m ta-c">
                <div className="arr" ><ArrowRight className="fs16 pointer" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item}/></div>
            </td>
          </tr>
          <tr class="tr_a">
            <td class="hide-m"></td>
            <td colspan="5" class="ta-l">
              <div class="tx_a1" >
                <button type="button" class="arr view-m" index={index} onClick={handleItemMobile} ></button>
                <p class="t1">{item.creator_comnent}</p>
              </div>
              <div class="tx_a2 transition" ref={el => (refAnswer.current[index] = el)}>
                <span class="re view-m"><i class="fa-solid fa-share"></i></span>
                <p class="t2"><span class="i-txt">{text.saler}</span><span>{item.answer.time}時</span></p>
                <p class="t1">{item.answer.coment}</p>
              </div>
            </td>
            <td class="hide-m ta-c"></td>
          </tr>
        </Fragment>
    );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setStateData(tempData);
    
  }, []);

  useEffect(() => {
    if( params.id !== undefined ){
      //id로 아이템 찾기 
      setStateAnswer( getSelectedItem(params.id) );
    }
  }, [params, stateData]);


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
