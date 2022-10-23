import React from "react";
import styled from "styled-components";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";

const Author = ({ item }) => {
  const backgroundImgURL = useFilePath(item?.backgroundImage);
  const profileImgURL = useFilePath(item?.profileImage);

  return (
    <div className="box_profile">
      <Link to={`/author/post/${item.id}`} state={{ item: item }}>
        <ImgTmpProfileBgDiv
          className="pf_thumb"
          bgImg={backgroundImgURL}
        ></ImgTmpProfileBgDiv>
        <div className="pf_txt">
          <div className="icon">
            <img src={profileImgURL} alt="profile" />
          </div>
          <p className="h1">{item.nickname}</p>
          <p className="t1">{item.description}</p>
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

export default Author;
