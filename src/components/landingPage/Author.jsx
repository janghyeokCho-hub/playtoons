import useFilePath from "@/hook/useFilePath";
import { currentAuthorInit } from "@/modules/redux/ducks/author";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Image from "../dashboard/Image";
import ImageBackground from "../dashboard/ImageBackground";

const Author = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath: backgroundImgURL, loading: backgroundImgLoading } =
    useFilePath(item?.backgroundImage);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    item?.profileImage
  );

  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

  return (
    <div className="box_profile">
      <Link
        to={`/author/${item.id}/post/1`}
        state={{ item: item }}
        onClick={handleCurrentAuthorInit}
      >
        {!backgroundImgLoading && (
          <ImageBackground
            type={"div"}
            className="pf_thumb"
            hash={item?.backgroundImage}
          ></ImageBackground>
        )}
        <div className="pf_txt">
          <div className="icon">
            <Image hash={item?.profileImage} />
            {/* {!profileImgLoading && <img src={profileImgURL} alt="" />} */}
          </div>
          <p className="h1">{item.nickname}</p>
          <p className="t1">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};


export default Author;
