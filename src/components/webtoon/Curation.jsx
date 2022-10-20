import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import useFilePath from "@/hook/useFilePath";

const Curation = ({ item, category }) => {
  console.log("item : ", item);

  const thumbnailImgURL = useFilePath(item?.thumbnailImage);
  const profileImgURL = useFilePath(item?.author?.profileImage);
  const [author, setAuthor] = useState(null);

  async function getAuthor(id) {
    const response = await getAuthorAPI(id);
    if (response.status === 200) {
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
      <ContBgDiv className="cont" bgImg={thumbnailImgURL}>
        <div>
          <p class="b1">
            <span class="i-txt">おすすめ作品</span>
          </p>
          <p class="h1">{item.title}</p>
          <p class="t1">{item.description}</p>
          <p class="t2">{item?.author?.name}</p>
        </div>
      </ContBgDiv>
    </Link>
  );
};

const ContBgDiv = styled.div`
  color: #fff;
  background-image: url(${(props) => props.bgImg});
`;

export default Curation;
