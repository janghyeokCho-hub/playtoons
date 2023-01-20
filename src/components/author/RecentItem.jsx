import { currentAuthorInit } from "@/modules/redux/ducks/author";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../dashboard/Image";
import ImageBackground from "../dashboard/ImageBackground";

const RecentItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

  return (
    <div className="box_profile">
      <Link
        to={{
          pathname: `/author/${item?.id}/post/1`,
        }}
        state={{ item: item }}
        onClick={handleCurrentAuthorInit}
      >
        <ImageBackground type={"div"} className="pf_thumb" hash={item?.backgroundImage} />
        <div className="pf_txt">
          <div className="icon">
            <Image hash={item?.profileImage} />
          </div>
          <p className="h1">{item?.nickname}</p>
          <p className="t1">{item?.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecentItem;
