import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faOilTemp, faPlus } from "@fortawesome/pro-solid-svg-icons";


import Container from "@/components/dashboard/Container";


//temp data
import tempImg1 from "@IMAGES/dashboardseries-rectangle-copy.png";
import tempImg2 from "@IMAGES/mdashboardseries-rectangle.jpg";
import Select from "@/components/dashboard/Select";
import { getPostListFromServer } from "@/services/dashboardService";

const text = {
  post_list : "投稿リスト",
  post : "投稿する",
  number : "番号",
  cover_image : "表紙",
  title : "タイトル",
  access_count : "アクセス数",
  good : "いいね",
  date : "掲載日",
  status : "状態",
  count : "回",
};

const tempData = [
  {
    id: 1,
    thumbnailImage: tempImg1,
    title: "阿修羅ゲート",
    viewCount: "1,344,211",
    likeCount: "アクション",
    date: "2022/06/11",
    status: "連載中",
  },
  {
    id: 2,
    thumbnailImage: tempImg2,
    title: "阿修羅ゲート",
    viewCount: "1,344,211",
    likeCount: "アクション",
    date: "2022/06/11",
    status: "連載中",
  },
];

const searchList = [
  {
    code: "all",
    name: "シリーズすべて"
  },
  {
    code: "all",
    name: "シリーズすべて1"
  },
  {
    code: "all",
    name: "シリーズすべて2"
  },
];

export default function DashboardPostList(props) {
  const [data, setData] = useState();
  

  const getPostList = async () => {
    const params = new FormData();
    params.append("authorId", "");
    params.append("typeId", "");
    params.append("categoryId", "");
    params.append("seriesId", "");
    params.append("issueId", "");
    params.append("subscribeTierId", "");
    params.append("keyword", "");
    params.append("orderKey", "");
    params.append("order", "");
    params.append("page", "");
    params.append("limit", "");

    const {status, data: result} = await getPostListFromServer(params);
    console.log('getPostList', status, result);
    
    if( status === 200 ){
      setData(result?.posts)
    }
    else{
      
    }
    
  };



  const getPostListElements = () => {
    return data?.map((item, index) => {
      return (
        <tr key={index}>
          <td class="hide-m">{item.id}</td>
          <td class="td_imgs">
            <div class="cx_thumb"><span><img src={item.thumbnailImage === null ? tempImg1 : item.thumbnailImage} alt="iamge" /></span></div>
          </td>
          <td class="td_subject">{item.title}</td>
          <td class="td_number1">{item.viewCount}<em class="hide-m">{text.count}</em></td>
          <td class="td_number2">{item.likeCount}</td>
          <td class="td_txt1"><span class="view-m">{text.date}：</span>{item.startAt}</td>
          <td class="td_txt"><span class="view-m">{text.status}</span>{item.status}</td>
          <td class="td_btns"><a href={`/dashboard/post/detail/${item.id}`} class="btn-pk n blue2"><span><FontAwesomeIcon icon={faAngleRight} />{text.detail}</span></a></td>
        </tr>
      );
    });
  };

  const handleItemClickSearch = (event) => {
    console.log('Search', event);
    
  };

  useEffect(() => {
    //리스트 불러오기
    // setData(tempData);
    getPostList();
  }, []);

  return (
    <Container
      type={"post"} >
      
      <div class="inr-c">
			
        <div class="hd_titbox hd_mst1">
          <h2 class="h_tit0"><span>{text.post_list}</span></h2>
          <div class="rgh">
            <a href="/dashboard/post/upload" class="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.post}</span></a>
          </div>
        </div>
        <div class="hd_titbox2">
          <Select 
            name={"typeId"}
            dataList={searchList}
            handleItemClick={handleItemClickSearch} />
        </div>

        <div class="tbl_basic mtbl_ty1">
          <table class="list">
            <caption>list</caption>
            <colgroup>
              <col class="num" />
              <col class="imgs"/>
              <col class="wid1"/>
              <col class="wid2"/>
              <col class="wid3"/>
              <col class="wid3"/>
              <col class="wid3"/>
              <col/>
            </colgroup>
            <thead>
              <tr>
                <th class="hide-m">{text.number}</th>
                <th>{text.cover_image}</th>
                <th>{text.title}</th>
                <th>{text.access_count}</th>
                <th>{text.good}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                getPostListElements()
              }
            </tbody>
          </table>
        </div>
      </div>


    </Container>
  );
}



