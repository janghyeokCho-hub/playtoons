import { showOneButtonPopup } from "@/common/common";
import { TIMELINE_DELAY } from "@/common/constant";
import { setTimelineAction } from "@/modules/redux/ducks/timeline";
import { getPostDetailFromServer, setPostLike } from '@API/postService';
import {
  faChevronLeft,
  faCommentQuote,
  faHeart,
  faShare
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSwiper } from "swiper/react";
import CommentButton from "./CommentButton";
import EllipsisButton from "./EllipsisButton";
import FollowButton from "./FollowButton";
import ImageSpan from "./ImageSpan";
import ShareButton from "./ShareButton";


export default function TimelineItem(props){
  const { item, isActive, stateTimeout, setStateTimeout, size } = props;
  const [stateItem, setStateItem] = useState(item);
  const [stateTime, setStateTime] = useState(0);
  const [stateIsRunning, setStateRunning] = useState(isActive);
  const reduxRefresh = useSelector(({timeline}) => timeline.refresh);
  const swiper = useSwiper();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UPDATE_TIME = 10;

  //==============================================================================
  // function 
  //==============================================================================
  //하위 컴포넌트에 정보 공유를 위한 redux 설정
  const setTimelineInfoToRedux = (timelineInfo) => {
    dispatch( setTimelineAction(timelineInfo) );
  };
  //==============================================================================
  // api 
  //==============================================================================
  const getPost = async (id) => {
    const { status, data } = await getPostDetailFromServer({id: id});
    console.log("getPost", status, data);

    if (status === 200) {
      setStateItem(data?.post);
      setTimelineInfoToRedux(data?.post);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  const setPostLikeToServer = async (method, id) => {
    const {status, data} = await setPostLike(method, id);
    console.log('setPostLikeToServer', status, data);
    
    if( status === 201 ){
      //refresh
      getPost(id);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event 
  //==============================================================================
  const handleEllipsis = (isShow) => {
    setStateRunning(isShow ? true : false);
  };

  const handleClickLike = () => {
    console.log('ClickLike',);
    setPostLikeToServer('post', stateItem.id);
  };

  
  //==============================================================================
  // hook 
  //==============================================================================
  //timeline 정보 변경( 팔로워나 댓글 )
  useEffect(() => {
    if( reduxRefresh && stateItem ){
      if( reduxRefresh?.id === stateItem.id && reduxRefresh?.type === 'timeline' ){
        console.log('reduxRefresh', reduxRefresh, stateItem);
        getPost(reduxRefresh?.id);
      }
    }
  }, [reduxRefresh]);

  //변경된 정보를 refresh하기 위해서 state에 저장
  useEffect(() => {
    setStateItem(item);
  }, [item]);

  //자동 넘기기를 위한 플래그 설정 및 초기화
  useEffect(() => {
    setStateRunning(isActive);
    if( isActive ){
      setStateTime(0);
      setTimelineInfoToRedux(stateItem);
    }
  }, [isActive]);

  //자동 loop 및 bar 로직
  useEffect(() => {
    // actvie 상태, 팝업이 열린 상태인지 확인
    if (stateIsRunning) {
      // 시간이 지나면 다음 슬라이드
      if (stateTime >= TIMELINE_DELAY) {
        setStateRunning(false);
        if( swiper.realIndex === size - 1 ){
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }

        return;
      }

      //시간 업데이트
      setStateTimeout(
        setTimeout(() => {
          setStateTime(stateTime + UPDATE_TIME);
        }, UPDATE_TIME)
      );
    } else {
      setStateTime(0);
    }

    return () => {
      clearTimeout(stateTimeout);
    };
  }, [stateTime, stateIsRunning]);
  //==============================================================================
  // render 
  //==============================================================================

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
          <p>{stateItem?.author?.nickname}</p>
        </div>
        <FollowButton
          item={stateItem}
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
        <EllipsisButton 
          onClick={(isShow) => handleEllipsis(isShow)}
        ></EllipsisButton>
      </div>
      <div className="bt_botm">
        <button type="button" className="btn01" onClick={() => handleClickLike()}>
          <span className="i">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{stateItem?.likeCount}</span>
        </button>
        <CommentButton
          className={"btn01"}
          icon={faCommentQuote}
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


