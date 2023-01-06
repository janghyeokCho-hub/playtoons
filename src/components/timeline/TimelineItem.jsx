import { showOneButtonPopup } from "@/common/common";
import { TIMELINE_DELAY } from "@/common/constant";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import {
  faChevronLeft,
  faCommentQuote,
  faHeart,
  faShare,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwiper } from "swiper/react";
import { getPostDetailFromServer } from '@API/postService'
import CommentButton from "./CommentButton";
import FollowButton from "./FollowButton";
import ImageSpan from "./ImageSpan";
import ShareButton from "./ShareButton";
import { useDispatch, useSelector } from "react-redux";


const TimelineItem = ({ item, isActive, stateTimeout, setStateTimeout }) => {
  const [stateItem, setStateItem] = useState(item);
  const [isControlShow, setIsControlShow] = useState(false);
  const [stateTime, setStateTime] = useState(0);
  const [stateIsRunning, setStateRunning] = useState(isActive);
  const reduxRefresh = useSelector(({post}) => post.refresh);
  const swiper = useSwiper();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UPDATE_TIME = 10;

  const getPost = async () => {
    const { status, data } = await getPostDetailFromServer(item?.id);
    console.log("getPost", status, data);

    if (status === 200) {
      setStateItem(data?.post);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  const handleControlPopup = () => {
    setStateRunning(isControlShow ? true : false);
    setIsControlShow(!isControlShow);
  };

  useEffect(() => {
    console.log('reduxRefresh', reduxRefresh);
    if( reduxRefresh?.type === 'timeline' ){
      getPost();
    }
  }, [reduxRefresh]);

  useEffect(() => {
    setStateItem(item);
  }, [item]);

  useEffect(() => {
    setStateRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    if (stateIsRunning) {
      if (stateTime >= TIMELINE_DELAY) {
        setStateRunning(false);
        swiper.slideNext();
      }

      setStateTimeout(
        setTimeout(() => {
          setStateTime(stateTime + UPDATE_TIME);
        }, UPDATE_TIME)
      );
    } else {
      clearTimeout(stateTimeout);
      setStateTime(0);
    }

    return () => {
      clearTimeout(stateTimeout);
    };
  }, [stateTime, stateIsRunning]);

  return (
    <div className={`col ${isActive ? "active" : ""}`}>
      <div className="bt_bar">
        <div className="bar">
          <span
            className=""
            style={{ width: `${(stateTime / TIMELINE_DELAY) * 100}%` }}
          ></span>
        </div>
      </div>
      <div
        className="thumb"
        onClick={() =>
          navigate(`/post/detail/${stateItem?.type?.code}/${stateItem?.id}`)
        }
      >
        <ImageSpan imagePath={stateItem?.thumbnailImage} />
      </div>
      <div className="cont">
        <p className="t1">{stateItem?.title}</p>
        <div className="t_profile">
          <ImageSpan
            className="im"
            imagePath={stateItem?.author?.profileImage}
          />
          <p>{stateItem?.nickname}</p>
        </div>
        <FollowButton
          author={stateItem?.author}
          onClick={(status) => setStateRunning(status === "init")}
        />
      </div>

      <div className="bt_top">
        <button
          type="button"
          className="btn01 view-m"
          onClick={() => navigate("/home")}
        >
          <span className="i">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="hidden">prev</span>
        </button>
        <button
          type="button"
          className="btn01"
          onClick={() => handleControlPopup()}
        >
          <span className="i">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </span>
        </button>
        {
          //author Id 확인 필요
          isControlShow && (
            <div className="box_drop">
              <ul>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faTrash} />
                    通報
                  </a>
                </li>
                {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
              </ul>
            </div>
          )
        }
      </div>
      <div className="bt_botm">
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{stateItem?.likeCount}</span>
        </button>
        <CommentButton
          className={"btn01"}
          icon={faCommentQuote}
          item={stateItem}
          onClick={(status) => setStateRunning(status === "init")}
        ></CommentButton>
        <ShareButton
          className={"btn01"}
          icon={faShare}
          item={stateItem}
          onClick={(status) => setStateRunning(status === "init")}
        ></ShareButton>
      </div>
    </div>
  );
};

export default TimelineItem;
