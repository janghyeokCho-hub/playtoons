import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";

import { getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import { setContainer } from "@/modules/redux/ducks/container";
import { getSeriedDetailAction, initSeriedDetailAction } from "@/modules/redux/ducks/dashboard";
import { getPostListFromServer, getTimelineFromServer } from "@/services/dashboardService";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination1 from "@/components/dashboard/Pagination";
import EmptyTr from "@/components/dashboard/EmptyTr";
import { useWindowSize } from "@/hook/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import Search from "@/components/dashboard/Search";

const text = {
  timeline_thumb: "タイムラインのサムネイル",
  tag: "タグ",
  summary: "説明",
  category: "カテゴリ",
  grade: "指定",
  status: "状態",
  type: "タイプ",
  series_detail: "シリーズ詳細",
  modify: "修正する",
  number: "番号",
  cover_image: "サムネイル",
  title: "タイトル",
  access_count: "アクセス数",
  good: "いいね",
  date: "掲載日",
  count: "回",
  empty_message: "投稿がありません。",
};


export default function DashboardSeriesDetail(props) {
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const [statePostList, setStatePostList] = useState(undefined);
  const reduxSeries = useSelector(({ dashboard }) => dashboard?.series);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windows = useWindowSize();
  const params = useParams("id");

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container sub series bg",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "シリーズ詳細",
      activeMenu: "series",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================
  const moveToDetailPage = (item) => {
    if (windows.width > 960) {
      navigate(`/dashboard/post/detail/${item.id}`);
    }
  };

  //==============================================================================
  // api
  //==============================================================================
  const getTimeline = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('reduced', true);

    const { status, data } = await getTimelineFromServer(params);
    console.log("getTimeline", status, data);

    if (status === 200) {
      setStateTimeline(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  const getPostList = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('seriesId', reduxSeries.id);

    const { status, data } = await getPostListFromServer(params);
    console.log("getPostList", status, data);

    if (status === 200) {
      setStatePostList(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================
  const handleSearchTitle = (event) => {
    console.log('SearchTitle', event);
    
  };
  

  //==============================================================================
  // hook & render
  //==============================================================================

  const renderThumbList = () => {
    return stateTimeline?.posts?.map((item, index) => {
      return (
        <SwiperSlide className="cx  swiper-slide" key={index}>
          <div >
            <div className="cx_thumb">
              {item !== undefined && (
                <Image hash={item.thumbnailImage}  />
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  const renderTagList = () => {
    return reduxSeries?.tags?.map((item, index) => {
      return <div className="i_tag" key={item.id}>{`#${item.name}`}</div>;
    });
  };

  const renderPostListElements = () => {
    if (statePostList?.posts?.length === 0) {
      return <EmptyTr text={text.empty_message} />;
    }

    return statePostList?.posts?.map((item, index) => {
      return (
        <tr key={index} onClick={() => moveToDetailPage(item)}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb">
              <Image hash={item.thumbnailImage} alt="" />
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number1">
            <FontAwesomeIcon icon={faEye} className="view-m" />
            {item.viewCount}
            <em className="hide-m">{text.count}</em>
          </td>
          <td className="td_number2">
            <FontAwesomeIcon icon={faHeart} className="view-m" />
            {item.likeCount}
          </td>
          <td className="td_txt1">
            <span className="view-m">{text.date}：</span>
            {getDateYYYYMMDD(item.startAt, "/")}
          </td>
          <td className="td_txt">
            <span className="view-m">{text.status}</span>
            {item.status}
          </td>
          <td className="td_btns">
            <Link
              to={`/dashboard/post/detail/${item.id}`}
              className="btn-pk n blue2"
            >
              
            </Link>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    
  }, [dispatch, reduxSeries]);

  useEffect(() => {
    dispatch( getSeriedDetailAction(params) );
    getTimeline();
    getPostList();
  }, []);

  useLayoutEffect(() => {
    dispatch( initSeriedDetailAction(params) );
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_view">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.series_detail}</h2>
            </div>

            <div className="bbs_book">
              <div className="flex relative">
                <p className="cx_tit">{reduxSeries?.title}</p>
                <Link
                  to={`/dashboard/series/edit/${params.id}`}
                  className="btn-pk n blue2 modify"
                >
                  <span>{text.modify}</span>
                </Link>
              </div>
              <div className="cx_thumb">
                <span>
                  <Image hash={reduxSeries?.coverImage} alt="" />
                </span>
              </div>
              <ul className="cx_list">
                <li>
                  <span>{text.category} </span>
                  <span>{reduxSeries?.category.name}</span>
                </li>
                <li>
                  <span>{text.grade} </span>
                  <span>{reduxSeries?.rating}</span>
                </li>
                <li>
                  <span>{text.status} </span>
                  <span>{reduxSeries?.status}</span>
                </li>
                <li>
                  <span>{text.type} </span>
                  <span>{reduxSeries?.type.name}</span>
                </li>
              </ul>
            </div>

            <h3 className="tit1">{text.summary}</h3>
            <p className="txt1 ws_pre">{reduxSeries?.description}</p>

            <h3 className="tit1">{text.tag}</h3>
            <div className="txt1">
              <div className="lst_tag">{renderTagList()}</div>
            </div>

            <h3 className="tit1">{text.timeline_thumb}</h3>
            <div className="lst_comic2">
              <SwiperContainer
                className={"mySwiper2"}
                slidesPerView={4}
                breakpoints={{
                  0: {
                    slidesPerView: 3.2,
                    spaceBetween: 12,
                  },
                  960: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                  },
                  1400: {
                    slidesPerView: 6,
                    spaceBetween: 16,
                  },
                }}
                list={renderThumbList}
              />
            </div>
          </section>
        </div>
      </div>

      <div className="inr-c">
        <div className="box_area">
          
          <div className="hd_titbox2">
            <Search className={'inp_txt sch'} placeholder={text.title} onClick={handleSearchTitle}/>
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
                  <th>{text.cover_image}</th>
                  <th>{text.title}</th>
                  <th>{text.access_count}</th>
                  <th>{text.good}</th>
                  <th>{text.date}</th>
                  <th>{text.status}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderPostListElements()}</tbody>
            </table>
          </div>

          <Pagination1
            className={""}
            meta={statePostList?.meta}
            callback={(page) => navigate(`/dashboard/post/${page}`)}
          />
        </div>
      </div>
    </div>
  );
}
