import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//temp data
import { showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import ProductTab from "@/components/dashboard/ProductTab";
import Search from "@/components/dashboard/Search";
import { setContainer } from "@/modules/redux/ducks/container";
import { getAuthorMineFromServer } from "@/services/postService";
import tempImg1 from "@IMAGES/temp_seller_image.png";
import { useDispatch } from "react-redux";

const text = {
  see_product: "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review: "レビュ一覧",
  product_name: "商品名",
  number: "番号",
  product: "商品",
  title: "タイトル",
  price: "価格",
  date: "販売開始日",
  status: "状態",
  detail: "詳細",
  modify: "修正",
  category: "カテゴリ",
  dont_see: "非表示",
};

const tempData = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  list: [
    {
      number: "1",
      id: 23,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "sales",
        name: "販売中",
      },
    },
    {
      number: "2",
      id: 256,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "audit",
        name: "審査中",
      },
    },
    {
      number: "3",
      id: 2,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "not_for_sale",
        name: "販売不可",
      },
    },
  ],
};


export default function DashboardProductList(props) {
  const [stateData, setStateData] = useState();
  const dispatch = useDispatch();


  //==============================================================================
  // function
  //==============================================================================
  const getStatusColor = (status) => {
    let className = "";

    switch (status.code) {
      default:
        className = "cl-sell";
        break;
      case "audit":
        className = "cl-ing";
        break;
      case "not_for_sale":
        className = "cl-non";
        break;
    } //switch

    return className;
  };
  //==============================================================================
  // api
  //==============================================================================
  const getProductList = async (keyword) => {
    const params = new FormData();
    if( keyword !== undefined ){
      params.append('keyword', keyword);
    }
    
    const {status, data} = await getAuthorMineFromServer(params);
    console.log('getProductList', status, data);
    
    if( status === 200 ){
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================
  /**
     키워드 검색
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleSearch = (keyword) => {
    getProductList(keyword);
  };

  /**
    pagination
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handlePagination = (page) => {
    
  };

  /**
     비표시 이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClick = (e) => {
    const id = e.target.getAttribute("data-id");

    
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderProductList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs2">
            <div className="cx_thumb ">
              <span>
                <Image hash={item.image} alt={"cover iamge"} />
              </span>
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number3">{item.price}</td>
          <td className="td_text1">
            <span className="view-m">{text.category}：</span>
            {item.date}
          </td>
          <td className={`td_txt3 cl-sell ${getStatusColor(item.status)}`}>
            <span className="view-m">{text.status}</span>
            {item.status.name}
          </td>
          <td className="td_btns2 ty1">
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/detail/${item.id}`}
            >
              {text.detail}
            </Link>
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/edit/${item.id}`}
            >
              {text.modify}
            </Link>
            <div
              className="btn-pk s blue2"
              data-id={item.id}
              onClick={handleItemClick}
            >
              {text.dont_see}
            </div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    getProductList();
  }, []);

  return (
    <>
      <div className="inr-c">
        <div className="hd_titbox2">
          <Search
            className={"inp_txt sch"}
            placeholder={text.product_name}
            onClick={handleSearch}
          />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderProductList()}</tbody>
          </table>
        </div>

        <Pagination 
          meta={stateData?.meta} 
          callback={handlePagination} />
      </div>
    </>
  );
}
