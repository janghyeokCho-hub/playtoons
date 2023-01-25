import useFilePath from "@/hook/useFilePath";
import { faHeart } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductItem = ({ item }) => {
  const { filePath: thumbnailImg } = useFilePath(item?.thumbnailImage);
  const { filePath: profileImg } = useFilePath(item?.author?.profileImage);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (item && item?.saleEndAt) {
      const today = new Date();
      const saleEndAt = new Date(item.saleEndAt);
      if (today > new Date(saleEndAt)) {
        setPrice(item?.price);
      } else if (Number(item?.saleRatio) > 0) {
        const salePrice =
          Number(item?.price) - Number(item?.price) * Number(item?.saleRatio);
        setPrice(salePrice);
      }
    }
  }, [item]);
  return (
    <div className="cx">
      <Link to="">
        <div className="cx_thumb">
          <span>
            <img src={thumbnailImg} alt="사진" />
          </span>
          <p className="t_like">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item?.likeCount}</span>
          </p>
        </div>
        <div className="cx_txt">
          <p className="h1">{item?.name}</p>
          <div className="btm">
            <div className="t_profile">
              <ImgSpan className="im" bgImg={profileImg}></ImgSpan>
              <span>{item?.author?.nickname}</span>
            </div>
            {price !== null && (
              <p className="c1">
                <strong>{price}PC</strong>
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const ImgSpan = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default ProductItem;
