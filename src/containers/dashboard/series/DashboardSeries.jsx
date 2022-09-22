import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faPlus } from '@fortawesome/pro-solid-svg-icons';

import { getSeriesStoryList } from "@/services/dashboardService";
import Container from "@/components/dashboard/Container";
import Image from "@/components/dashboard/Image";

const text = {
  page_title :"シリーズリスト",
  add_series : "シリーズを追加",
  number : "番号",
  post_image : "表紙",
  title : "タイトル",
  type : "タイプ",
  category: "カテゴリ",
  date: "掲載日",
  status: "状態"
};

export default function DashboardSeries(props) {
  const [data, setData] = useState(undefined);

  /**
  *
     시리즈 목록을 가져온다.
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesList = async (pageNumber) => {
    const params = new FormData();
    // params.append("authorId", );
    // params.append("typeId", );
    // params.append("categoryId", );
    // params.append("keyword", );
    // params.append("orderKey", );
    // params.append("order", );     //ASC, DESC
    params.append("page", pageNumber);
    // params.append("limit", );
    const { status, data : resultData } = await getSeriesStoryList(params);

    if( status === 200 ){
      setData(resultData);
    }
    else{
      //error 처리
      console.log("error", resultData);
    }
  };


  /**
  *
     시리즈 리스트 dom 생성
  *
  * @version 1.0.0
  * @author 2hyunkook
  */
  const renderSeriesList = () => {
    return data?.series?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb"><span><Image hash={item.coverImage} alt={"cover iamge"} /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_group c-blue">{item.type?.name}</td>
          <td className="td_gray"><span className="view-m">カテゴリ：</span>{item.category?.name}</td>
          <td><span className="view-m">掲載日：</span>{item.startAt}</td>
          <td className="td_txt"><span className="view-m">状態</span>{item.paused}</td>
          <td className="td_btns"><a href={`/dashboard/series/detail/${item.id}`} className="btn-pk n blue2"><span><FontAwesomeIcon icon={faAngleRight} />{text.detail}</span></a></td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getSeriesList();
  }, []);

  return (
    <Container
      type={"series"}>
      <div className="inr-c">
			
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0"><span>{text.page_title}</span></h2>
          <div className="rgh">
            <a href="/dashboard/series/upload" className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.add_series}</span></a>
          </div>
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs" />
              <col className="wid1" />
              <col className="wid2" />
              <col className="wid3" />
              <col className="wid3" />
              <col className="wid3" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.post_image}</th>
                <th>{text.title}</th>
                <th>{text.type}</th>
                <th>{text.category}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSeriesList()
              }
            </tbody>
          </table>
        </div>
      </div>
      
    </Container>
  );
}
