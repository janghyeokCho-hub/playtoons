import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";

import { getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import { setContainer } from "@/modules/redux/ducks/container";
import { getSeriedDetailAction, initSeriedDetailAction } from "@/modules/redux/ducks/dashboard";
import { getPostListFromServer, getSeriesDetailFromServer, getTimelineFromServer } from "@/services/dashboardService";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyPagination from "@/components/dashboard/MyPagination";
import EmptyTr from "@/components/dashboard/EmptyTr";
import { useWindowSize } from "@/hook/useWindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/pro-solid-svg-icons";
import Search from "@/components/dashboard/Search";
import { deletePostToServer } from "@/services/postService";

const text = {
  timeline_thumb: "タイムラインのサムネイル",
  tag: "タグ",
  summary: "説明",
  category: "カテゴリ",
  grade: "指定",
  status: "状態",
  type: "タイプ",
  series_detail: "シリーズ詳細",
  do_modify: "修正する",
  number: "番号",
  cover_image: "サムネイル",
  title: "タイトル",
  access_count: "アクセス数",
  good: "いいね",
  date: "掲載日",
  episode: "話",
  count: "回",
  post_detail: "投稿詳細",
  modify: "修正",
  delete: "削除",
  empty_message: "投稿がありません。",
  do_delete: "削除しました。",
};


export default function DashboardSeriesDetail(props) {
  const [stateSeries, setStateSeries] = useState(undefined);
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const [statePostList, setStatePostList] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windows = useWindowSize();
  const useparams = useParams();

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
  /**
     썸네일
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesDetail = async () => {
    const { status, data } = await getSeriesDetailFromServer( {id: useparams.id} );
    console.log("getSeriesDetail", status, data);

    if (status === 200) {
      setStateSeries(data?.series);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };


  /**
     썸네일
  * @version 1.0.0
  * @author 2hyunkook
  */
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

  /**
    　post list 검색
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getPostList = async (keyword, page) => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('seriesId', stateSeries.id);
    params.append('page', page === undefined ? useparams.postPage : page);
    if( keyword !== undefined ){
      params.append('keyword', keyword);
    }

    const { status, data } = await getPostListFromServer(params);
    console.log("getPostList", status, data);

    if (status === 200) {
      setStatePostList(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     post　삭제 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const deletePost = async (id) => {
    const { status, data } = await deletePostToServer( {id : id} );
    console.log("deletePost", status, data);

    if (status === 200) {
      getPostList();
      showOneButtonPopup(dispatch, text.do_delete);
      
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================
  const handleSearchTitle = (keyword) => {
    console.log('SearchTitle', keyword);
    getPostList(keyword);
  };
  
  const handleItemDelete = useCallback((event) => {
    deletePost( event.target.getAttribute('data-id') )
  }, []);

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
    return stateSeries?.tags?.map((item, index) => {
      return <div className="i_tag" key={item.id}>{`#${item.name}`}</div>;
    });
  };

  const renderPostListElements = () => {
    if (statePostList?.posts?.length === 0) {
      return <EmptyTr text={text.empty_message} />;
    }

    return statePostList?.posts?.map((item, index) => {
      /* <tr key={index} onClick={() => moveToDetailPage(item)}> */
      return (
        <tr key={index} >
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
            {item.number}
          </td>
          <td className="td_txt">
            <span className="view-m">{text.status}</span>
            {item.status}
          </td>
          <td className="td_btns2 ty1">
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/post/detail/${item.id}`}
            >
              {text.post_detail}
            </Link>
            <Link
              className="btn-pk s blue2"
              to={`/post/edit/${item.id}`}
            >
              {text.modify}
            </Link>
            <div
              className="btn-pk s blue2"
              data-id={item.id}
              onClick={handleItemDelete}
            >
              {text.delete}
            </div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    if( stateSeries !== undefined ){
      getPostList();
    }
  }, [stateSeries, useparams]);
  
  useLayoutEffect(() => {
    getSeriesDetail();
    getTimeline();
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
                <p className="cx_tit">{stateSeries?.title}</p>
                <Link
                  to={`/dashboard/series/edit/${useparams.id}`}
                  className="btn-pk n blue2 modify"
                >
                  <span>{text.do_modify}</span>
                </Link>
              </div>
              <div className="cx_thumb">
                <span>
                  <Image hash={stateSeries?.coverImage} alt="" />
                </span>
              </div>
              <ul className="cx_list">
                <li>
                  <span>{text.category} </span>
                  <span>{stateSeries?.category?.name}</span>
                </li>
                <li>
                  <span>{text.grade} </span>
                  <span>{stateSeries?.rating}</span>
                </li>
                <li>
                  <span>{text.status} </span>
                  <span>{stateSeries?.status}</span>
                </li>
                <li>
                  <span>{text.type} </span>
                  <span>{stateSeries?.type?.name}</span>
                </li>
              </ul>
            </div>

            <h3 className="tit1">{text.summary}</h3>
            <p className="txt1 ws_pre">{stateSeries?.description}</p>

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
                <col className="wid3" />
                <col className="wid2" />
                <col className="wid2" />
                <col className="wid1" />
                <col className="wid1" />
                <col className="wid1" />
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
                  <th>{text.episode}</th>
                  <th>{text.status}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderPostListElements()}</tbody>
            </table>
          </div>

          <MyPagination
            className={""}
            meta={statePostList?.meta}
            callback={(page) => navigate(`/dashboard/series/detail/${useparams.id}/${page}`)}
          />
        </div>
      </div>
    </div>
  );
}
