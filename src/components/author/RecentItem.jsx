import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { setCurrentAuthor } from "@/modules/redux/ducks/author";

const RecentItem = ({ item }) => {
  const dispatch = useDispatch();
  const backgroundImgURL = useFilePath(item?.backgroundImage);
  const profileImgURL = useFilePath(item?.profileImage);

  const handleCurrentAuthor = useCallback(() => {
    dispatch(setCurrentAuthor(item.id));
  }, [dispatch, item]);

  return (
    <div className="box_profile">
      <Link
        to={{
          pathname: `/author/post/${item?.id}`,
        }}
        state={{ item: item }}
        onClick={handleCurrentAuthor}
      >
        {/* 이미지 default 값 필요 */}
        <ImgTmpProfileBgDiv className="pf_thumb" bgImg={backgroundImgURL} />
        <div className="pf_txt">
          <div className="icon">
            {/* 이미지 default 값 필요 */}
            <img src={profileImgURL} alt="profile" />
          </div>
          <p className="h1">{item?.nickname}</p>
          <p className="t1">{item?.description}</p>
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
