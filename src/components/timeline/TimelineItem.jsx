import { TIMELINE_DELAY } from "@/common/constant";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import {
  faChevronLeft,
  faCommentQuote,
  faHeart,
  faShare
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwiper } from "swiper/react";
import CommentButton from "./CommentButton";
import FollowButton from "./FollowButton";
import ImageSpan from "./ImageSpan";
import ShareButton from "./ShareButton";

const TimelineItem = ({ item, isActive }) => {
  const [isControlShow, setIsControlShow] = useState(false);
  const [stateTime, setStateTime] = useState(0);
  const [stateIsRunning, setStateRunning] = useState(false);
  const swiper = useSwiper();
  const navigate = useNavigate();
  const UPDATE_TIME = 10;

  const handleControlPopup = () => {
    setStateRunning(isControlShow ? true : false);
    setIsControlShow(!isControlShow);
  };
  
  useEffect(() => {
    setStateRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    let interval = undefined;
    if(stateIsRunning){
      if( stateTime >= TIMELINE_DELAY ){
        setStateRunning(false);
        swiper.slideNext();
      }

      interval = setInterval(() => {
        setStateTime((stateTime + UPDATE_TIME));
      }, UPDATE_TIME);
    } else {
      if( interval ){
        clearInterval(interval);
      }
      setStateTime(0);
    }

    return () => {  clearInterval(interval);  }
  }, [stateTime, stateIsRunning]);

  return (
    <div className={`col ${isActive ? "active" : ""}`}>
      <div className="bt_bar">
        <div className="bar">
          <span className="" style={{ width: `${(stateTime / TIMELINE_DELAY) * 100}%` }}></span>
        </div>
      </div>
      <div className="thumb" onClick={() => navigate(`/post/detail/${item?.type?.code}/${item?.id}`)}>
        <ImageSpan imagePath={item?.thumbnailImage} />
      </div>
      <div className="cont">
        <p className="t1">{item?.title}</p>
        <div className="t_profile">
          <ImageSpan className="im" imagePath={item?.author?.profileImage} />
          <p>{item?.nickname}</p>
        </div>
        <FollowButton author={item?.author} onClick={(status) => setStateRunning(status === 'init')} />
      </div>

      <div className="bt_top">
        <button type="button" className="btn01 view-m" onClick={() =>  navigate('/home')}>
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
          isControlShow && 
            <div className="box_drop">
              <ul>
                <li>
                  <a href="#" >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </a>
                </li>
                <li>
                  <a href="#" >
                    <FontAwesomeIcon icon={faTrash} />
                    通報
                  </a>
                </li>
                {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
              </ul>
            </div>
        }

      </div>
      <div className="bt_botm">
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{item?.likeCount}</span>
        </button>
        <CommentButton 
          className={"btn01"}
          icon={faCommentQuote}
          item={item}
          onClick={(status) => setStateRunning(status === 'init')}>
        </CommentButton>
        <ShareButton 
          className={"btn01"}
          icon={faShare}
          item={item}
          onClick={(status) => setStateRunning(status === 'init')}>
        </ShareButton>
      </div>
    </div>
  );
};

export default TimelineItem;
