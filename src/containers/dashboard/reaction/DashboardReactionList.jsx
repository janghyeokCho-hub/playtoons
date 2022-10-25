import React, { useState, useEffect,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import { getReactionMineAuthorIdFromServer, getReactionReactionIdPinFromServer } from "@/services/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { getErrorMessageFromResultCode } from "@/common/common";
import EmptyTr from "@/components/dashboard/EmptyTr";
import ReactionButtons from "@/components/dashboard/ReactionButtons";

const text = {
  page_title : "リアクションリスト",
  post : "投稿する",
  number : "番号",
  content : "内容",
  money : "寄付金",
  user : "作成者",
  date : "掲載日",
  move : "移動",
  fix : "固定",
  good : "いいね",
  coment : "コメント",
  report : "通報",
  delete : "削除",
  empty_message: 'リアクションがありません。'
};

const tempData = [
  {
    id: 1,
    content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな",
    money: "500CP",
    user: "お祭り楽しい！",
    date: "2022/06/11",
  },
  {
    id: 2,
    content: "#SSSRearise はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行ったけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな",
    money: "500CP",
    user: "2hyunkook",
    date: "2022/06/11",
  },
];

const searchList = [
  { 
    code: "all",
    name: "シリーズすべて"
  },
  { 
    code: "all1",
    name: "シリーズすべて1"
  },
  { 
    code: "all2",
    name: "シリーズすべて2"
  },
];

export default function DashboardReactionList(props) {
  const [stateData, setStateData] = useState([]);
  const reduxAuthors = useSelector( ({post}) => post.authorMine.authors );
  const reduxUserInfo = useSelector( ({login}) => login.userInfo );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //==============================================================================
  // api
  //==============================================================================

  const getReactionList = async () => {
    
    const params = {
      id: reduxAuthors[0].id,
    };

    const { status, data } = await getReactionMineAuthorIdFromServer(params);
    if( status === 200 ){
      // 왜??? 배열이 아니지
      setStateData([data?.reaction]);
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, }) );
    }
  };

  const setReactionPin = async (reactionId) => {
    
    const params = {
      id: reactionId,
    };

    const { status, data } = await getReactionReactionIdPinFromServer(reduxAuthors[0].id, params);
    if( status === 200 ){
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={''} buttonTitle={'確認'} />, }) );
    }
    else{
      dispatch( showModal({title: text.error_title, contents: <ErrorPopup message={getErrorMessageFromResultCode(data)} buttonTitle={'確認'} />, }) );
    }
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleButtonClick = (e) => {
    const id = e.target.getAttribute("data-id");
    const innerText = e.target.innerText;
    
    switch(innerText){
      default: // move  
        navigate( "/dashboard/post/detail/" + id );
        break;
      case text.fix:
        console.log('fix');
        
        break;
        case text.good:
        console.log('good');
        
        break;
        case text.coment:
        console.log('coment');
        
        break;
        case text.report:
        console.log('report');
          
          break;
        case text.delete:
        console.log('delete');
            
        break;
    }
  };

  const handleClickSearch = (event) => {
    console.log('Search', event);
    
  };
  //==============================================================================
  // hook & render
  //==============================================================================

  const getReactionListElements = () => {
    if( stateData?.length === 0 ){
      return <EmptyTr text={text.empty_message} />
    }

    return stateData?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2"><span className="view-m">{text.user}</span>{item.user}</td>
          <td className="td_txt2 mb"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className="td_txt"><span className="view-m">{text.money}</span>{item.amount}</td>
          <td className="td_btns2">
            {/* <div data-id={item.post.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.move}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.fix}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.good}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.coment}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.report}</div>
            <div data-id={item.id} onClick={handleButtonClick} className="btn-pk s blue2">{text.delete}</div> */}
            <ReactionButtons text={text} item={item} />
          </td>
        </tr>
      );
    });
  };

  

  useEffect(() => {
    //리스트 불러오기
    getReactionList();
  }, []);

  return (
    <Container
      className={"post"} 
      backTitle={text.page_title}>

      <div className="inr-c">
            
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0"><span>{text.page_title}</span></h2>
          <div className="rgh">
            <Link to="/post/upload" className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.post}</span></Link>
          </div>
        </div>
        <div className="hd_titbox2">
          <Select
            name={"typeId"}
            className={"select1"}
            dataList={searchList}
            handleItemClick={handleClickSearch}
            />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num"/>
              <col/>
              <col className="wid1"/>
              <col className="wid1"/>
              <col className="wid1"/>
              <col className="wid4"/>
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.content}</th>
                <th>{text.user}</th>
                <th>{text.date}</th>
                <th>{text.money}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                getReactionListElements()
              }
            </tbody>
          </table>
        </div>
      </div>

    </Container>
  );
}



