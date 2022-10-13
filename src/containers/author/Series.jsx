import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import ImgComic2 from "@IMAGES/tmp_comic2.jpg";
import { useSelector } from "react-redux";
import { getFileUrlFromServer } from "@API/fileService";
import {
  getPostSeries as getPostSeriesAPI,
  getPostSeriesCount as getPostSeriesCountAPI,
} from "@API/postService";

async function getFileURLData(hash, state) {
  const response = await getFileUrlFromServer(hash);
  if (response.status === 200) {
    state(response?.data?.url);
  }
}

const ItemComponent = ({ item }) => {
  const [thumbnailImgURL, setThumbnailImgURL] = useState(null);

  useEffect(() => {
    async function getPostSeriesCount(id) {
      const response = await getPostSeriesCountAPI(id);
      console.log("getPostSeriesCount Error : ", response.status);
    }
    if (item?.id) {
      getPostSeriesCount(item.id);
    }
    if (item?.coverImage) {
      getFileURLData(item?.coverImage, setThumbnailImgURL);
    }
  }, [item]);

  return (
    <li>
      <Link to="">
        <div className="thumb">
          <SpanImg bgImg={thumbnailImgURL}></SpanImg>
        </div>
        <div className="txt">
          <p className="t1">{item?.category?.name}</p>
          <p className="h1">{item?.title}</p>
          <button type="button" className="btn-pk s blue2">
            <FontAwesomeIcon icon={faObjectUnion} />
            233
          </button>
        </div>
      </Link>
    </li>
  );
};

const Series = () => {
  const navigate = useNavigate();
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const [list, setList] = useState();

  useEffect(() => {
    async function getPostSeries(id) {
      const response = await getPostSeriesAPI(id);
      if (response.status === 200) {
        let result = response?.data?.series;
        if (!Array.isArray(response?.data?.series)) {
          result = new Array(result);
        }
        setList(result);
      }
    }
    if (currentAuthor?.id) {
      getPostSeries(currentAuthor.id);
    }
  }, [currentAuthor]);

  return (
    <div className="lst_series">
      <ul>
        {list &&
          list.map((item, index) => (
            <ItemComponent key={`item_${index}`} item={item} />
          ))}
      </ul>
    </div>
  );
};

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Series;
