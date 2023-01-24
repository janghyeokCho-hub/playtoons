import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router-dom";
import PostItems from "./PostItems";
import AuthorItems from "./AuthorItems";
import SerieItems from "./SeriesItems";

const All = () => {
  return (
    <>
      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">人気</h2>
        </div>

        <PostItems />
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">シリーズ</h2>
          <Link to="" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Link>
        </div>
        <SerieItems />
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">クリエーター</h2>
          <Link to="" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Link>
        </div>
        <AuthorItems />
      </div>
    </>
  );
};

export default All;
