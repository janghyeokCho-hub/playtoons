import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb"><span><img src={item.thumbnailImage === null ? tempImg1 : item.thumbnailImage} alt="iamge" /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number1">{item.viewCount}<em className="hide-m">{text.count}</em></td>
          <td className="td_number2">{item.likeCount}</td>
          <td className="td_txt1"><span className="view-m">{text.date}：</span>{item.startAt}</td>
          <td className="td_txt"><span className="view-m">{text.status}</span>{item.status}</td>
          <td className="td_btns"><Link to={`/dashboard/post/detail/${item.id}`} className="btn-pk n blue2"><span><FontAwesomeIcon icon={faAngleRight} />{text.detail}</span></Link></td>
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
      
      <div className="inr-c">
			
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0"><span>{text.post_list}</span></h2>
          <div className="rgh">
            <Link to="/dashboard/post/upload" className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.post}</span></Link>
          </div>
        </div>
        <div className="hd_titbox2">
          <Select 
            name={"typeId"}
            className={"select1 wid1"}
            dataList={searchList}
            handleItemClick={handleItemClickSearch} />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs"/>
              <col className="wid1"/>
              <col className="wid2"/>
              <col className="wid3"/>
              <col className="wid3"/>
              <col className="wid3"/>
              <col/>
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
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



