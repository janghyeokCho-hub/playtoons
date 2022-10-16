import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getPostSeries as getPostSeriesAPI } from "@API/postService";
import useFilePath from "@/hook/useFilePath";

const SeriesImgComponent = ({ item }) => {
  const coverImgURL = useFilePath(item?.coverImage);
  return <ImgDiv bgImg={coverImgURL} />;
};

const RecommentItem = ({ item, callback }) => {
  const [list, setList] = useState([]);
  const profileImgURL = useFilePath(item?.profileImage);

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
    <div className="item">
      <div className="box_profile _half">
        <Link
          to={{
            pathname: "/author/post",
          }}
          state={{ item }}
          onClick={callback}
        >
          <div className="pf_thumb bind3">
            {/* 이미지 default 값 필요 */}
            {/* 어떤 이미지를 사용하면서, 배열로 주는지 확인 */}
            {list &&
              list.map((item, index) => (
                <SeriesImgComponent key={`series_${index}`} item={item} />
              ))}
          </div>
          <div className="pf_txt">
            <div className="icon">
              {/* 이미지 default 값 필요 */}
              <img src={profileImgURL} alt="profile" />
            </div>
            <p className="h1">{item.nickname}</p>
            <p className="t1">{item.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default RecommentItem;
