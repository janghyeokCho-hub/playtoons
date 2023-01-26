import useFilePath from "@/hook/useFilePath";
import { faHeart as faHeartRegular } from "@fortawesome/pro-regular-svg-icons";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {convertContraction} from '@/common/common'

const Curation = ({ item }) => {
  const { filePath: thumbnailImgURL, loading: thumbnailImgLoading } =
    useFilePath(item?.thumbnailImage);

  return (
    <Link to={`/post/detail/${item?.type?.code}/${item?.id}`}>
      <div className="cx_thumb">
        <span>
          {!thumbnailImgLoading && <img src={thumbnailImgURL} alt="" />}
        </span>
      </div>
      <div className="cx_txt">
        <p className="t1 c-blue">{item?.type?.name}</p>
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.author?.nickname}</p>
        <p className="t1">{item?.number || "null"}話</p>
        <p className="t_like">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} className="fa-solid fa-heart" />
            <FontAwesomeIcon
              icon={faHeartRegular}
              className="fa-regular fa-heart"
            />
          </span>
          <span>{convertContraction(item?.likeCount)}</span>
        </p>
      </div>
    </Link>
  );
};

export default Curation;
