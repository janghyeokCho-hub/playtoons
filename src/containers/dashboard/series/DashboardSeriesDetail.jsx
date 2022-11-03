import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/Swiper";

import tempImage from "@IMAGES/tmp_comic2.jpg";
import { getSeriesDetailFromServer, getTimelineFromServer } from "@/services/dashboardService";
import Image from "@/components/dashboard/Image";
import { useDispatch, useSelector } from "react-redux";
import { getSeriedDetailAction, initSeriedDetailAction } from "@/modules/redux/ducks/dashboard";
import { setContainer } from "@/modules/redux/ducks/container";
import { showOneButtonPopup } from "@/common/common";

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

const tempData = {
  thumbList: [
    tempImage,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  tagList: ["#アクション", "#異世界"],
  summary:
    "No.13の災害後、人類はシェルターにバラバラに散った。<br />そして、奇妙なロボット”クモ”の出現によりシェルター周辺に防壁が張り<br />巡らされた。クモと戦う為、特殊チームレンジャーを創設したが、<br />クモの圧倒的な力には勝てず。そこで、レンジャーたちは人間と機械を融合する<br />アダマ手術を施し、クモに挑むが…果たしてレンジャーたちの行く末は..? <br />クモの正体、そして突如現れた謎の組織カンパニーヌルの正体とは…?!",
  title: "シェルターアーク・世界を滅ぼすものたち",
  category: "アクション",
  grade: "R18",
  status: "連載中",
  type: "マンガ",
  main_image: tempImage,
};

export default function DashboardSeriesDetail(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const reduxSeries = useSelector(({ dashboard }) => dashboard?.series);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const dispatch = useDispatch();
  const params = useParams("id");

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

    return () => {
      dispatch( initSeriedDetailAction(params) );
    }
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
