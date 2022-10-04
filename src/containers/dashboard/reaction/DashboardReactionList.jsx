import React, { useState, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import Container from "@/components/dashboard/Container";
import Select from "@/components/dashboard/Select";

let text = {
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
};

const tempData = {
  list: [
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
  ]
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
  const [stateData, setStateData] = useState();
  const navigate = useNavigate();

  const getSeriesStoryList = async () => {
    // 시리즈 스토리 리스트
    const params = {
      email: "emailValue",
      password: "passwordValue",
    };

    const { status, data } = await getSeriesStoryList(params);

    // if( status === 200 ){
    //   setList(handleGetSeriesStoryList(data));
    // }

    setStateData(getReactionListElements(data));
  };

  const handleButtonClick = (e) => {
    const no = e.target.getAttribute("data-id");
    const text = e.target.firstChild.innerText;
    
    switch(text){
      default: // move  
        navigate( "/dashboard/reaction/detail/" + no );
        break;
      case text.fix:
            
        break;
      case text.good:
            
        break;
      case text.coment:
            
        break;
      case text.report:
            
        break;
      case text.delete:
            
        break;
    }
  };

  const handleClickSearch = (event) => {
    console.log('Search', event);
    
  };

  const getReactionListElements = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2"><span className="view-m">{text.user}</span>{item.user}</td>
          <td className="td_txt2 mb"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className="td_txt"><span className="view-m">{text.money}</span>{item.money}</td>
          <td className="td_btns2">
            <a href="#" className="btn-pk s blue2"><span>{text.move}</span></a>
            <a href="#" className="btn-pk s blue2"><span>{text.fix}</span></a>
            <a href="#" className="btn-pk s blue2"><span>{text.good}</span></a>
            <a href="#" className="btn-pk s blue2"><span>{text.coment}</span></a>
            <a href="#" className="btn-pk s blue2"><span>{text.report}</span></a>
            <a href="#" className="btn-pk s blue2"><span>{text.delete}</span></a>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    setStateData(tempData);
  }, []);

  return (
    <Container
      className={"post"} 
      backTitle={text.page_title}>

      <div className="inr-c">
            
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0"><span>{text.page_title}</span></h2>
          <div className="rgh">
            <a href="/dashboard/post/upload" className="btn-pk n blue2"><span><FontAwesomeIcon icon={faPlus} /> {text.post}</span></a>
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



