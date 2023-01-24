import useFilePath from "@/hook/useFilePath";
import { faHeart } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SeriesItem = ({ item }) => {
  const { filePath: coverImg } = useFilePath(item?.coverImage);
  return (
    <li>
      <Link to="">
        <div className="cx_thumb">
          <span>
            <img src={coverImg} alt="사진" />
          </span>
          <p className="t_like">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item?.likeCount}</span>
          </p>
        </div>
        {/*<!-- 202209 ico수정 -->*/}
        <div className="cx_txt">
          <p className="h1">{item?.title}</p>
          <p className="t1">{item?.author?.nickname}</p>
          <p className="t1 c-gray">96話</p>
          <div className="lst_tag">
            {item?.tags?.map((tag) => (
              <div className="i_tag">#{tag?.name}</div>
            ))}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SeriesItem;
