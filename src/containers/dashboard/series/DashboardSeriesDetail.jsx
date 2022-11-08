import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";

import { showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import { setContainer } from "@/modules/redux/ducks/container";
import { getSeriedDetailAction, initSeriedDetailAction } from "@/modules/redux/ducks/dashboard";
import { getTimelineFromServer } from "@/services/dashboardService";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
};


export default function DashboardSeriesDetail(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const reduxSeries = useSelector(({ dashboard }) => dashboard?.series);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const dispatch = useDispatch();
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
  //==============================================================================
  // event
  //==============================================================================
  

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
    return stateData?.tags?.map((item, index) => {
      return <div className="i_tag" key={item.id}>{`#${item.name}`}</div>;
    });
  };

  useEffect(() => {
    setStateData(reduxSeries);
  }, [dispatch, reduxSeries]);

  useEffect(() => {
    dispatch( getSeriedDetailAction(params) );
    getTimeline();

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
                <p className="cx_tit">{stateData?.title}</p>
                <Link
                  to={`/dashboard/series/edit/${params.id}`}
                  className="btn-pk n blue2 modify"
                >
                  <span>{text.modify}</span>
                </Link>
              </div>
              <div className="cx_thumb">
                <span>
                  <Image hash={stateData?.coverImage} alt="" />
                </span>
              </div>
              <ul className="cx_list">
                <li>
                  <span>{text.category} </span>
                  <span>{stateData?.category.name}</span>
                </li>
                <li>
                  <span>{text.grade} </span>
                  <span>{stateData?.rating}</span>
                </li>
                <li>
                  <span>{text.status} </span>
                  <span>{stateData?.status}</span>
                </li>
                <li>
                  <span>{text.type} </span>
                  <span>{stateData?.type.name}</span>
                </li>
              </ul>
            </div>

            <h3 className="tit1">{text.summary}</h3>
            <p className="txt1 ws_pre">{stateData?.description}</p>

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
    </div>
  );
}
