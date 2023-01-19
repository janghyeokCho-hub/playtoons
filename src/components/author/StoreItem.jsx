import { getStringOfPrice } from "@/common/common";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Image from "../dashboard/Image";
import ProfileSpan from "../dashboard/ProfileSpan";

const StoreItem = ({ item }) => {

  return (
    <div className="cx">
      <Link to={`/store/detail/${item.id}`}>
        <div className="cx_thumb">
          <span>
            <Image hash={item?.thumbnailImage} />
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
              <ProfileSpan hash={item?.author?.profileImage} className={"img"} />
              <span className="nickname">
                {`${item?.author?.nickname}`}
              </span>
            </div>
            <p className="c1">
              <strong>{getStringOfPrice(item?.price)}</strong>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StoreItem;
