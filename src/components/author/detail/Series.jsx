import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getSeriesDetailFromServer as getSeriesDetailAPI } from "@/services/dashboardService";
import useFilePath from "@/hook/useFilePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentQuote,
  faShare,
  faCircleCheck,
} from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";

const Series = ({ id }) => {
  const [series, setSeries] = useState(null);
  const coverImgURL = useFilePath(series?.coverImage);
  const profileImgURL = useFilePath(series?.author?.profileImage);
  useEffect(() => {
    async function getSeriesDetail() {
      const response = await getSeriesDetailAPI({ id: id });
      if (response.status === 200) {
        setSeries(response.data.series);
      }
    }
    if (id && !series) {
      getSeriesDetail();
    }
  }, [id, series]);
  return (
    <div className="wrap_series_detail">
      <div className="top_detail">
        <div className="ar_view">
          <div className="thumb">
            <img src={coverImgURL} alt="만화책" />
          </div>
          <div className="cont">
            <div className="tit">
              <p className="h1">{series?.title}</p>
              <div className="rgh">
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  {series?.likeCount || "likeCount 필드가 없음"}
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  {series?.commentCount || "commentCount 필드가 없음"}
                </button>
                <button
                  type="button"
                  className="btn-pk n blue2"
                  onClick="openLayerPopup('popShare'); return false;"
                >
                  <FontAwesomeIcon icon={faShare} />
                  共有する
                </button>
              </div>
            </div>
            <p className="t1">{series?.description}</p>

            <div className="lst_tag">
              {series?.tags?.map((tag) => (
                <div className="i_tag">{tag.name}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="ar_name">
          <div>
            <div className="icon">
              <SpanImg bgImg={profileImgURL}></SpanImg>
            </div>
            <p>{series?.author?.name}</p>
          </div>
          <button type="button" className="btn-pk n blue">
            支援する
          </button>
          {/*<!-- <button type="button" className="btn-pk n blue2">フォロー</button>202010 수정 : 팔로우 전 -->*/}
          <button
            type="button"
            className="btn-pk n blue btn_follow"
            onClick="openLayerPopup('popFollow'); return false;"
          >
            <FontAwesomeIcon icon={faCircleCheck} />
            フォロー中
          </button>
          {/*<!-- 202010 수정 : 팔로우 후 -->*/}
        </div>
      </div>

      <div className="tabs">
        <ul>
          <li className="on">
            <a href="#">
              <span>最新話から</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>1話から</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="lst_detail">
        <ul>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src="../images/tmp/tmp_comic1.jpg" alt="" />
              </div>
              <div className="txt">
                <p className="h1">
                  2話 :
                  シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <i className="fa-solid fa-heart"></i>1.2k
                </button>
                <button type="button" className="btn01">
                  <i className="fa-solid fa-comment-quote"></i>966
                </button>
              </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src="../images/tmp/tmp_comic1.jpg" alt="" />
                <div className="area_lock">
                  {/*<!-- 잠금 -->*/}
                  <div>
                    <p>
                      <i className="fa-solid fa-lock"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="txt">
                <p className="h1">
                  <span className="i-txt">支援</span>3話 : シェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  966
                </button>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li className="on">
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Series;
