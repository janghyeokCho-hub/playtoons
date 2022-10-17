import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentQuote } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import moment from "moment";
import { getPostSeriesDetail as getPostSeriesDetailAPI } from "@/services/postService";

const PostItem = ({ item }) => {
  const [series, setSeries] = useState(null);
  const thumbnailImgURL = useFilePath(series?.thumbnailImage);

  useEffect(() => {
    async function getPostSeriesDetail(seriesId) {
      const response = await getPostSeriesDetailAPI(seriesId);
      if (response.status === 200) {
        setSeries(response.data.series);
      }
    }
    if (item?.series && !series) {
      getPostSeriesDetail(item.series?.id);
    }
  }, [item, series]);

  return (
    <li className="item">
      {series && (
        <Link
          to={`/post/detail/${series.type.code}/${series?.id}`}
          state={{ item: series }}
        >
          <div className="thumb">
            <img src={thumbnailImgURL} alt="" />
          </div>
          <div className="txt">
            <p className="h1">{series?.title}</p>
            <p className="t1">{series?.description}</p>
          </div>
          <div className="botm">
            <p className="d1">
              {moment(item?.endAt).format("YYYY/MM/DD HH:mm")}
            </p>
            <button type="button" className="btn01">
              <FontAwesomeIcon icon={faHeart} style={{ marginRight: "7px" }} />
              {item?.likeCount}
            </button>
            <button type="button" className="btn01">
              <FontAwesomeIcon
                icon={faCommentQuote}
                style={{ marginRight: "7px" }}
              />
              {item?.viewCount}
            </button>
          </div>
        </Link>
      )}
    </li>
  );
};

export default PostItem;
