import useFilePath from "@/hook/useFilePath";
import {
  faCommentQuote,
  faHeart,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Link } from "react-router-dom";

const HashtagItem = ({ item }) => {
  const { filePath: thumbnailImg } = useFilePath(item?.thumbnailImage);
  return (
    <li className="item">
      <Link to="">
        <div className="thumb">
          <img src={thumbnailImg} alt="" />
          <div className="area_lock">
            {/*<!-- 잠금 -->*/}
            <div>
              <p>
                <FontAwesomeIcon icon={faLock} />
              </p>
            </div>
          </div>
        </div>
        <div className="txt">
          <p className="h1">
            <span className="i-txt">支援</span>
            {item?.number}話 :{item?.title}
          </p>
          <p className="t1">{item?.outline}</p>
        </div>
        <div className="botm">
          <div className="lst_tag">
            {item?.tags?.length > 0 &&
              item?.tags?.map((tag) => (
                <div className="i_tag">#{tag.name}</div>
              ))}
          </div>

          <p className="d1">
            {moment(item?.startAt).format("YYYY/MM/DD HH:mm")}
          </p>
          <button type="button" className="btn01">
            <FontAwesomeIcon icon={faHeart} />
            {item?.likeCount}
          </button>
          <button type="button" className="btn01">
            <FontAwesomeIcon icon={faCommentQuote} />
            {item?.viewCount}
          </button>
        </div>
      </Link>
    </li>
  );
};

export default HashtagItem;
