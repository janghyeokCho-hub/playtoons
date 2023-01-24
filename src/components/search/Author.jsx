import useFilePath from "@/hook/useFilePath";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPostSeries as getPostSeriesAPI } from "@API/postService";

const SeriesImgComponent = ({ item }) => {
  const { filePath: coverImgURL, loading: coverImgLoading } = useFilePath(
    item?.coverImage
  );
  if (!coverImgLoading) {
    return <ImgDiv bgImg={coverImgURL} />;
  } else {
    return <></>;
  }
};

const Author = ({ item }) => {
  const [list, setList] = useState([]);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    item?.profileImage
  );

  useEffect(() => {
    async function getPostSeries(id) {
      const response = await getPostSeriesAPI({ authorId: id });
      if (response.status === 200) {
        let result = response?.data?.series || [];
        if (!Array.isArray(result)) {
          result = new Array(result);
        }

        while (result?.length < 3) {
          result.push({ coverImage: null });
        }
        if (result?.length > 3) {
          result = result.splice(0, 3);
        }
        setList(result);
      }
    }

    if (item?.id) {
      getPostSeries(item.id);
    }
  }, [item]);

  return (
    <div className="box_profile">
      <div className="pf_thumb bind3">
        {list &&
          list.map((item, index) => (
            <SeriesImgComponent key={`series_${index}`} item={item} />
          ))}
      </div>
      <div className="pf_txt">
        <div className="icon">
          {!profileImgLoading && <img src={profileImgURL} alt="profile" />}
        </div>
        <p className="h1">{item?.nickname}</p>
        <p className="t1">{item?.description}</p>
        <div className="btns">
          <Link to="" className="btn-pk n blue">
            <span>フォロー</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Author;
