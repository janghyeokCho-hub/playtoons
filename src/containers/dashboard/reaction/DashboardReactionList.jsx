import React, { useState, useEffect,  } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";
import { getReactionMineAuthorIdFromServer as getReactionMineFromServer, setReactionReactionIdPinToServer } from "@/services/dashboardService";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { getErrorMessageFromResultCode, showOneButtonPopup } from "@/common/common";
import EmptyTr from "@/components/dashboard/EmptyTr";
import ReactionButtons from "@/components/dashboard/ReactionButtons";
import Pagination from "@/components/dashboard/Pagination";

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
  empty_message: 'リアクションがありません。',
  modal_title: 'お知らせ',
  do_pinned: '固定しました。',
  do_off_pinned: '固定解除しました。',
  do_good: 'いいねしました。',
  do_off_good: 'いいねをキャンセルしました。',
  do_coment: 'コメントしました。',
  do_report: '通報しました。',
  do_delete: '削除しました。',
  can_do_myself: '本人のみ削除可能です。',
  do_you_delete: '削除しますか？',
  cancel: 'キャンセル',
};


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
  const [statePinnedData, setStatePinnedData] = useState(undefined);
  const [stateData, setStateData] = useState(undefined);
  const reduxAuthors = useSelector( ({post}) => post.authorMine.authors );
  const params = useParams('page');
  const dispatch = useDispatch();


  //==============================================================================
  // function
  //==============================================================================
  const getList = () => {
    getPinnedReactionList();
    getReactionList(params === undefined ? 1 : params.page);
  };

  //==============================================================================
  // api
  //==============================================================================

  const getReactionList = async (pageNumber) => {
    
    const formData = new FormData();
    if( params.postId === undefined ){
      formData.append('authorId', reduxAuthors[0].id);
    }
    else{
      formData.append('postId', params.postId);
    }
    formData.append('page', pageNumber);

    const { status, data } = await getReactionMineFromServer(formData);
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, String(status + data));
    }
  };

  const getPinnedReactionList = async () => {
    
    const formData = new FormData();
    if( params.postId === undefined ){
      formData.append('authorId', reduxAuthors[0].id);
    }
    else{
      formData.append('postId', params.postId);
    }
    formData.append('pinned', true);

    const { status, data } = await getReactionMineFromServer(formData);
    if( status === 200 ){
      setStatePinnedData(data);
    }
    else{
      showOneButtonPopup(dispatch, String(status + data));
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickSearch = (event) => {
    console.log('Search', event);
    
  };
  //==============================================================================
  // hook & render
  //==============================================================================

  const getReactionListElements = () => {
    if( stateData?.reactions?.length === 0 && statePinnedData?.reactions?.length === 0 ){
      return <EmptyTr text={text.empty_message} />
    }

    return stateData?.reactions?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2"><span className="view-m">{text.user}</span>{reduxAuthors[0].name}</td>
          <td className="td_txt2 mb"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className="td_txt"><span className="view-m">{text.money}</span>{item.amount}</td>
          <td className="td_btns2">
            <ReactionButtons text={text} item={item} callback={() => getList()}/>
          </td>
        </tr>
      );
    });
  };

  const getPinnedReactionListElements = () => {
    return statePinnedData?.reactions?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2"><span className="view-m">{text.user}</span>{reduxAuthors[0].name}</td>
          <td className="td_txt2 mb"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className="td_txt"><span className="view-m">{text.money}</span>{item.amount}</td>
          <td className="td_btns2">
            <ReactionButtons text={text} item={item} callback={() => getList()}/>
          </td>
        </tr>
      );
    });
  };

  

  useEffect(() => {
    //리스트 불러오기
    getList();
  }, [params]);

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
              {/* pinned list */}
              {
                getPinnedReactionListElements()
              }
              {/* reaction list */}
              {
                getReactionListElements()
              }
            </tbody>
          </table>
        </div>
      
        {
          stateData?.reactions?.length > 0 &&
            <Pagination
              className={''}
              page={stateData?.meta.currentPage}
              itemsCountPerPage={stateData?.meta.itemsPerPage}
              totalItemsCount={stateData?.meta.totalItems}
              callback={(page) => getReactionList(page)}
              />
        }
      </div>

    </Container>
  );
}



