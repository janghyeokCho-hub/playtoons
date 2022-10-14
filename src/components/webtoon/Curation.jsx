import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { getAuthor as getAuthorAPI } from "@API/authorService";

const Curation = ({ item, category }) => {
  const backgroundImgURL = useFilePath(item?.backgroundImage);
  const profileImgURL = useFilePath(item?.profileImage);
  const [author, setAuthor] = useState(null);

  async function getAuthor(id) {
    const response = await getAuthorAPI(id);
    if (response.status === 200) {
      console.log(response?.data);
      setAuthor(response?.data?.author);
    }
  }

  useEffect(() => {
    if (!author && item?.authorId) {
      getAuthor(item?.authorId);
    }
  }, [author, item]);

  return (
    <Link to="/">
      <ContBgDiv className="cont" bgImg={backgroundImgURL}>
        <div>
          <p className="b1">
            <span className="i-txt">{category?.name}</span>
          </p>
          <p className="h1">{item.title}</p>
          <p className="t1">{item.description}</p>
          <p className="t2">{author?.name}</p>
        </div>
      </ContBgDiv>
      <div className="imgs">
        <img src={profileImgURL} alt="이미지" />
      </div>
    </Link>
  );
};

const ContBgDiv = styled.div`
  color: #fff;
  background-image: url(${(props) => props.bgImg});
`;

export default Curation;
