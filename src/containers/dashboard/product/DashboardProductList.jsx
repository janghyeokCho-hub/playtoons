import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";
import ProductTab from "@/components/dashboard/ProductTab";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/Pagination";
import { useDispatch } from "react-redux";
import { showModal } from "@/modules/redux/ducks/modal";
import { setContainer,  } from "@/modules/redux/ducks/container";

const text = {
  see_product : "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review : "レビュ一覧",
  product_name : "商品名",
  number : "番号",
  product: "商品",
  title: "タイトル",
  price : "価格",
  date : "販売開始日",
  status : "状態",
  detail : "詳細",
  modify: "修正",
  dont_see : "非表示"
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
    id : 23,
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: {
      code: "sales",
      name: "販売中",
    }
  },
  {
    number : "2",
    id : 256,
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: {
      code: "audit",
      name: "審査中",
    }
  },
  {
    number : "3",
    id : 2,
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: {
      code: "not_for_sale",
      name: "販売不可",
    }
  },
]};


const STATUS_TYPE = [
  {
    code: "sales",
    name: "販売中",
    color: "#2B9429"
  },
  {
    code: "audit",
    name: "審査中",
    color: "#ED8812"
  },
  {
    code: "not_for_sale",
    name: "販売不可",
    color: "#F11C0E"
  },
];


export default function DashboardProductList(props) {
  const [stateData, setStateData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refInput = useRef();


  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "post",
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


  const getStatusColor = (status) => {
    let className = "";

    switch( status.code ){
      default: 
        className = "status-sales";
        break;
        case "audit":
          className = "status-audit";
          break;
        case "not_for_sale":
          className = "status-not_for_sale";
          break;
    }//switch
    
    return className;
  };

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

  const handleChange = (page) => {
    console.log('handleChange', page);
    
  };
  
  
  const handleItemClick = (e) => {
    const no = e.target.getAttribute("data-id");

    // navigate("/dashboard/series/detail/" + no);
  };


  const renderProductList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs">
            <div className="w131h81 cx_thumb "><span><img src={item.image} alt={"cover iamge"} /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_group">{item.price}</td>
          <td className="td_gray"><span className="view-m">カテゴリ：</span>{item.date}</td>
          <td className={`td_txt ${getStatusColor(item.status)}`}><span className="view-m">状態</span>{item.status.name}</td>
          <td className="td_txt dp_ig">
            <Link className="btn-pk s blue2 w124 mr12" to={`/dashboard/product/detail/${item.id}`}>{text.detail}</Link>
            <Link className="btn-pk s blue2 w124 mt10 mr12"  to={`/dashboard/product/edit/${item.id}`}>{text.modify}</Link>
            <div className="btn-pk s blue2 w124 mt10 mr12" data-id={item.id} onClick={handleItemClick}>{text.dont_see}</div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setStateData(tempData);
    // refInput.current.setStatusInInput({type: INPUT_STATUS.DEFAULT, error: "error"});
  }, []);

  return (
    <div className="contents">

      <ProductTab 
        pathname={'/dashboard/product'} />

      <div className="inr-c">
        <div className="col mt23">
          <div className="inp_txt sch w300">
            <button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <input type="text" className="" placeholder={text.product_name} />
          </div>
        </div>

        <div className="tbl_basic mtbl_ty1 mt39">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="wid1" />
              <col className="wid4" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
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
            <tbody>
              {
                renderProductList()
              }
            </tbody>
          </table>
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
