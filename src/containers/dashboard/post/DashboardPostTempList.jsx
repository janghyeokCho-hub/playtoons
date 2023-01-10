import { getDateYYYYMMDD, getStatusText } from '@/common/common';
import EmptyTr from '@/components/dashboard/EmptyTr';
import Image from '@/components/dashboard/Image';
import MyPagination from '@/components/dashboard/MyPagination';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TEMP_DATA = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  posts : [
    {
      id: "1",
      thumbnaimImage: null,
      title: "大学のリンゴ一個ののの大学のリンゴ一個の",
      startAt: "2022/06/11",
    },
    {
      id: "2",
      thumbnaimImage: null,
      title: "大学のリンゴ一個ののの大学のリンゴ一個の",
      startAt: "2022/06/11",
    },
  ]
};

/**
   DashboardPostTempList Component
* @date 2023.01.10 10:00
* @version 1.0.0
* @author 2hyunkook
*/
export default function DashboardPostTempList(props){
  const [ stateData, setStateData] = useState(undefined);
  const navigate = useNavigate();

  //==============================================================================
  // handler
  //==============================================================================
  const handleClickDelete = (e, item) => {
    e.stopPropagation();
    console.log('ClickDelete', item);
    
  };
  //==============================================================================
  // hook
  //==============================================================================
  useEffect(() => {
    setStateData(TEMP_DATA);
  }, []);
  //==============================================================================
  // render
  //==============================================================================
  const renderPostListElements = () => {
    if (stateData?.posts.length === 0) {
      return <EmptyTr text={'一時保存がありません。'} />;
    }

    return stateData?.posts?.map((item, index) => {
      return (
        <tr key={index} onClick={() => navigate(`/post/edit/${item.id}`)}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb post">
              <Image hash={item.thumbnailImage} alt="" params={{ w: 88 }} />
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_txt1">
            <span className="view-m">{'掲載日'}：</span>
            {getDateYYYYMMDD(item.startAt, "/")}
          </td>
          <td className="td_btns2 ty1">
            <div
              className="btn-pk s blue2"
              onClick={(e) => handleClickDelete(e, item)}
              
            >
              {'削除'}
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="inr-c">
      <div className="hd_titbox hd_mst1">
        <h2 className="h_tit0">
          <span></span>
        </h2>
        <div className="rgh">
          <Link to={'/post/upload'} className="btn-pk n blue2">
            <span><FontAwesomeIcon icon={faPlus} /> {'投稿する'}</span>
          </Link>
        </div>
      </div>
      <div className="hd_titbox">
        {`312の一時保存があります。`} 
      </div>

      <div className="tbl_basic mtbl_ty1">
        <table className="list">
          <caption>list</caption>
          <colgroup>
            <col className="num" />
            <col className="imgs" />
            <col className="wid3" />
            <col className="wid2" />
            <col className="wid1" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">{'番号'}</th>
              <th>{'表紙'}</th>
              <th>{'タイトル'}</th>
              <th>{'掲載日'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderPostListElements()}</tbody>
        </table>
      </div>

      <MyPagination
        className={""}
        meta={stateData?.meta}
        callback={(page) => navigate(`/dashboard/post/${page}`)}
      />
    </div>
  );
}