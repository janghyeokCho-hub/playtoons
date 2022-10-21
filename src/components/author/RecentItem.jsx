import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import useFilePath from "@/hook/useFilePath";

const RecentItem = ({ item }) => {
  const [author, setAuthor] = useState(null);

  const getAuthor = useCallback(async () => {
    const response = await getAuthorAPI(item?.id);
    if (response?.status === 200) {
      setAuthor(response.data.author);
    }
  }, [item]);

  useEffect(() => {
    getAuthor();
  }, []);

  const backgroundImgURL = useFilePath(author?.backgroundImage);
  const profileImgURL = useFilePath(author?.profileImage);

  return (
    <div className="box_profile">
      <Link
        to={{
          pathname: "/author/post",
        }}
        state={{ item: author }}
      >
        {/* 이미지 default 값 필요 */}
        <ImgTmpProfileBgDiv className="pf_thumb" bgImg={backgroundImgURL} />
        <div className="pf_txt">
          <div className="icon">
            {/* 이미지 default 값 필요 */}
            <img src={profileImgURL} alt="profile" />
          </div>
          <p className="h1">{author?.nickname}</p>
          <p className="t1">{author?.description}</p>
        </div>
      </Link>
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
export default RecentItem;
