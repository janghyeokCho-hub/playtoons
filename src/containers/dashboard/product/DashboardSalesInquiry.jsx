import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import { showOneButtonPopup, showTwoButtonPopup } from "@/common/common";
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
import { getShopInquiryAuthorFromServer, setShopInquiryAuthorToSerVer as setShopInquiryToServer, setShopInquiryReportToSerVer } from "@/services/dashboardService";
import EmptyTr from "@/components/dashboard/EmptyTr";

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
  report_messgae: '通報しますか？',
  empty_message: '商品のお問い合わせはございません。',
};

export default function DashboardSalesInquiry(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSalesId = useSelector(({dashboard}) => dashboard.salesId);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const refArrow = useRef([]);
  const refAnswer = useRef([]);
  const params = useParams('id');


  //==============================================================================
  // function
  //==============================================================================
  const setSelectedItem = (id) => {
    let index = undefined;
    
    for( let i = 0; i < stateData?.inquiries.length; i++ ){
      if( stateData.inquiries[i].id === id ){
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
  const getSalesInquiryList = async (page) => {
    const formData = new FormData();
    formData.append('authorId', reduxAuthors[0].id);
    if( page ){
      formData.append('page', page);
    }
    
    const {status, data} = await getShopInquiryAuthorFromServer(formData);
    console.log('getSalesInquiryList', status, data);
    
    if( status === 200 ){
      // setStateData(data);
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     문의 수정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setShopInquiry = async (item) => {
    let json = {

    };
    const {status, data} = await setShopInquiryToServer(json);
    console.log('setShopInquiry', status, data);
    
    if( status === 200 ){
      
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  /**
     문의 신고
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setShopInquiryReport = async (item) => {
    let json = {
      type: 'sexual',
      content: item.content,
    };
    const {status, data} = await setShopInquiryReportToSerVer(item.id, json);
    console.log('setShopInquiry', status, data);
    
    if( status === 200 ){
      
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
  const handleItemClickAnswer = useCallback((item, index) => {
    console.log('handleItemClickAnswer', item, index);
    
  }, []);
  
  /**
   통보(신고) 이벤트
   * @version 1.0.0
   * @author 2hyunkook
   */
  const handleItemClickReport = useCallback((item, index) => {
    console.log('handleItemClickReport', item, index);

    showTwoButtonPopup(dispatch, text.report_messgae, () => setShopInquiryReport(item));
  }, []);

  /**
     화살표 이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemArrow = useCallback((value, isSelected, index) => {
    refAnswer.current[index].setShow(isSelected);
  }, [stateData]);

  /**
     모바일 클릭이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemMobile = useCallback((index) => {
    refArrow.current[index].setRotate(true);
  }, [stateData]);

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderSalesInquiryList = () => {
    if (stateData?.inquiries?.length === 0) {
      return <EmptyTr text={text.empty_message} />;
    }

    return stateData?.inquiries?.map((item, index) => {
      return (
        <Fragment key={index} >
          <tr className="">
            <td className="hide-m">{item.productId}</td>
            <td className="td_imgs2">
              <div className="cx_thumb"><span><Image hash={item?.product?.thumbnailImage} /></span></div>
            </td>
            <td className="td_subject">{item?.product?.name}</td>
            <td className="td_txt0"><span className="view-m">{text.startAt}：</span>{item?.product?.startAt}</td>
            <td className="td_txt0"><span className="view-m">{text.creator}：</span>{item?.product?.author?.nickname}</td>
            <td className="td_btns2 ta-r et_botm1">
              <div className="d-ib">
                <div className="btn-pk s blue2" onClick={() => handleItemClickAnswer(item, index)}>{text.answer}</div>
                <div className="btn-pk s blue2" onClick={() => handleItemClickReport(item, index)}>{text.report}</div>
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
        </Fragment>
    );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getSalesInquiryList();
    return () => {
      dispatch( initSalesIdAction() );
    }
  }, [params]);

  useEffect(() => {
    if( reduxSalesId !== undefined && stateData !== undefined ){
      setSelectedItem( reduxSalesId );
    }
  }, [stateData]);

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
          meta={stateData?.meta}
          callback={handleChange}
          />

      </div>

    </>
  );
}



const tempData = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3
  },
  inquiries: [
    {
      productId : "1",
      product : {
        thumbnailImage: tempImg1,
        name : "大学のリンゴ一個の重さで10メートルの素材",
        startAt : "2022/06/11",
        author:{
          nickname: '名前のない人間232号',
          name: '高橋',
        }
      },
      accountId: "11",
      account: {
        name : "名前のない人間232号",
      },
      content: "1ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
      respondedAt: "2022/05/11 23:21",
      authorResponse: "1リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    },
    {
      productId : "2",
      product : {
        thumbnailImage: tempImg1,
        name : "大学のリンゴ一個の重さで10メートルの素材",
        startAt : "2022/07/11",
        author:{
          nickname: '名前のない人間232号',
          name: '高橋',
        }
      },
      accountId: "22",
      account: {
        name : "名前のない人間232号",
      },
      content: "2ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
      respondedAt: "2022/05/11 23:21",
      authorResponse: "2リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    },
    {
      productId : "3",
      product : {
        thumbnailImage: tempImg1,
        name : "大学のリンゴ一個の重さで10メートルの素材",
        startAt : "2022/06/11",
        author:{
          nickname: '名前のない人間232号',
          name: '高橋',
        }
      },
      accountId: "33",
      account: {
        name : "名前のない人間232号",
      },
      content: "3ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
      respondedAt: "2022/05/11 23:21",
      authorResponse: "3リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    },
    {
      productId : "4",
      product : {
        thumbnailImage: tempImg1,
        name : "大学のリンゴ一個の重さで10メートルの素材",
        startAt : "2022/06/11",
        author:{
          nickname: '名前のない人間232号',
          name: '高橋',
        }
      },
      accountId: "44",
      account: {
        name : "名前のない人間232号",
      },
      content: "ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
      respondedAt: "2022/05/11 23:21",
      authorResponse: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    },

]};