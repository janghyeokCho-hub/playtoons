import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { getIconFromServer, getIconIdFromServer, setPostReactionToServer } from "@/services/postService";
import { updateReaction } from "@/services/reactionService";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Image from "./Image";
import SwiperContainer from "./SwiperContainer";
import { useTranslation } from "react-i18next";
import { showOneButtonPopup } from "@/common/common";

/**
*
  아이콘 댓글 등록창
   <IconWithText 
    type={'edit'} //  normal, edit
    callback={handler}
    cancelCallback={handler}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function IconWithText(props, ref) {
  const { postInfo, callback, type, cancelCallback, reactionItem } = props;
  const [stateIcon, setStateIcon] = useState(undefined);
  const [stateIconDetail, setStateIconDetail] = useState(undefined);
  const [stateTopSelected, setStateTopSelected] = useState(undefined);
  const [stateIsFocus, setStateFocus] = useState(false);
  const [stateShowIcon, setStateShowIcon] = useState(false);
  const [stateSelectedIcons, setStateSelectedIcons] = useState([]);
  const [stateError, setStateError] = useState(undefined);
  const [stateComment, setStateComment] = useState(reactionItem?.content || '');
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const refContaienr = useRef();
  // const refTextArea = useRef();
  const refButton = useRef();
  const { t } = useTranslation();

  //==============================================================================
  //  function
  //==============================================================================

  const initStatus = () => {
    // setStateTopSelected(0);
    setStateShowIcon(false);
    setStateSelectedIcons([]);
    setStateError(undefined);
    setStateComment('');
    // refTextArea.current.value = "";
    refButton.current.setStatus(undefined);
  };

  const isAuthors = () => {
    return reduxAuthors && reduxAuthors?.length > 0;
  };

  //==============================================================================
  //  api
  //==============================================================================

  /**
   * 리액션 작성
   * @version 1.0.0
   * @author 2hyunkook
   */
  const setReaction = async () => {
    let params = {
      // content: refTextArea.current.value,
      content: stateComment,
      type: "reply",
      postId: postInfo.id,
      authorId: isAuthors() ? reduxAuthors[0].id : null,
      // reactionId: "string"
    };
    
    if( stateSelectedIcons.length > 0 ){
      params.iconImage = stateSelectedIcons[0].hash;
    } 

    const { status, data } = await setPostReactionToServer(params);
    if (status === 201) {
      callback?.();
      initStatus();
    } else {
      setStateError( data );
      refButton.current.setStatus(undefined);
    }
  };

  /**
   * 리액션 수정
   * @version 1.0.0
   * @author 2hyunkook
   */
  const updateReactionOnComponent = async () => {
    let params = {
      content: stateComment,
      id: reactionItem?.id,
    };
    
    if( stateSelectedIcons.length > 0 ){
      params.iconImage = stateSelectedIcons[0].image;
    } 

    const { status, data } = await updateReaction(params);
    if (status === 200) {
      callback?.();
      initStatus();
    } else {
      setStateError( data );
      refButton.current.setStatus(undefined);
    }
  };

  const getTopIconList = async () => {
    const formData = new FormData();//get url 
    formData.append("limit", 10);
    
    const {status, data} = await getIconFromServer(formData);
    console.log('getTopIconList', status, data);
    
    if( status === 200 ){
      setStateIcon(data);  
      setStateTopSelected(data?.icons?.[0]);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  const getIconDetailList = async () => {
    const {status, data} = await getIconIdFromServer(stateTopSelected?.id);
    console.log('getIconDetailList', status, data);
    
    if( status === 200 ){
      setStateIconDetail(data);  
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  //  event
  //==============================================================================

  const handleItemDelete = (selectedItem) => {
    setStateSelectedIcons( stateSelectedIcons.filter((item) => item.id !== selectedItem.id) );

    return false;
  };

  const handleTopIcon = (item) => {
    setStateTopSelected(item);
  };

  const handleItemIcon = (item) => {
    // setStateSelectedIcons([...stateSelectedIcons, item]);
    setStateSelectedIcons([item]);
  };

  const handleRegister = (event) => {
    if (stateComment === '') {
      setStateError(t(`pleaseInputComment`));
      refButton.current.setStatus(undefined);
      return false;
    }

    setReaction();
  };

  const handleUpdate = (event) => {
    if (stateComment === '') {
      setStateError(t(`pleaseInputComment`));
      refButton.current.setStatus(undefined);
      return false;
    }

    updateReactionOnComponent();
  };



  //==============================================================================
  //  hook 
  //==============================================================================
  //component did mount
  useLayoutEffect(() => {
    getTopIconList();
  }, []);

  useLayoutEffect(() => {
    if( stateTopSelected !== undefined ){
      getIconDetailList();
    }
  }, [stateTopSelected]);

  // useEffect(() => {
  //   setStateComment(reactionItem?.content);
  // }, [reactionItem]);

  //==============================================================================
  //  render
  //==============================================================================

  const renderSelectedIconsElement = () => {
    return stateSelectedIcons?.map((item, index) => {
      return (
        <div className="ico_emo" key={index}>
          <span>
            <Image hash={item.hash}  />
          </span>
          <button type="button">
            <FontAwesomeIcon
              className="fa-solid fa-circle-xmark"
              icon={faCircleXmark}
              onClick={() => handleItemDelete(item)}
            />
          </button>
        </div>
      );
    });
  };

  const renderTopIconElement = useMemo(() => {
    return stateIcon?.icons?.map((item, index) => {
      return (
        <SwiperSlide key={index} className={`top_box ${stateTopSelected.id === item.id ? 'active' : ''}`}>
          {/* <span className={`top_box ${stateTopSelected === index ? 'select' : ''}`}> */}
            <Image
              className={`icon`}
              hash={item.thumbnailImage}
              onClick={() => handleTopIcon(item)}
            />
          {/* </span> */}
        </SwiperSlide>
      );
    });
  }, [stateIcon, stateTopSelected]);

  const renderIconElement = () => {
    return stateIconDetail?.icon?.content?.map(
      (item, index) => {
        return (
          <li key={item.name}>
            <span>
              <Image
                hash={item.hash}
                onClick={() => handleItemIcon(item)}
              />
            </span>
          </li>
        );
      }
    );
  };


  return (
    <>
      <div className={`${type === 'edit' ? 'comm' : 'conts'}`}>
        <div className={`textarea1 ${stateSelectedIcons.length > 0 && "emo"} ${stateIsFocus ? 'input_focus' : ''}`}>
          <textarea
            // ref={refTextArea}
            name="content"
            className={`${type === 'edit' ? 'textarea1 edit' : 'textarea1'}`}
            placeholder={t(`doReaction`)}
            value={stateComment}
            onChange={(event) => {
              setStateError(undefined);
              setStateComment(event.target.value);
            }}
            onFocus={() => {
              setStateShowIcon(false);
              setStateFocus(true);
            }}
            onBlur={() => setStateFocus(false)}
          />

          {/*삽입된 이모티콘*/}
          {
            stateSelectedIcons.length > 0 && 
              <div className="l"> 
                {renderSelectedIconsElement()}
              </div>
          }
        </div>

        {/* button */}
        {
          type === 'edit' ? (
            <div className="btns">
              <div className="l">
                <button 
                  type="button" 
                  className={`btn-pk s ${stateShowIcon ? "blue2" : "gray"}`}
                  onClick={() => setStateShowIcon(!stateShowIcon)}
                >
                  <span>{t(`icon`)}</span>
                </button>
              </div>
              <div className="r">
                <button
                  type="button"
                  className="btn-pk s tran"
                  onClick={() => cancelCallback?.()}
                >
                  <span>取り消し</span>
                </button>
                <Button
                  type="button"
                  ref={refButton}
                  text={t(`register`)}
                  className="btn-pk s blue"
                  onClick={handleUpdate}
                >
                </Button>
              </div>
            </div>
          ) : ( 
            <div className="btns">
              <button
                type="button"
                className={`btn-pk s ${stateShowIcon ? "blue2" : "gray"}`}
                onClick={() => setStateShowIcon(!stateShowIcon)}
              >
                <span>{t(`icon`)}</span>
              </button>
              <Button
                type="button"
                ref={refButton}
                text={t(`register`)}
                className="btn-pk s blue"
                onClick={handleRegister}
              >
              </Button>
            </div>
          )
        }

        {/* 이모티콘 삽입 */}
        <div
          className="box_emoji transition"
          style={{ display: `${stateShowIcon ? 'block' : 'none'}`}}
          ref={refContaienr}
        >
          <div className="tit_emo">
            <SwiperContainer
              className={"myEmoji1"}
              buttonClassName={"my1 hide-m myem"}
              iconLeft={faAngleLeft}
              iconRight={faAngleRight}
              slidesPerView={8}
              breakpoints={{
                0: {
                  slidesPerView: 6.2,
                  spaceBetween: 2,
                },
                960: {
                  slidesPerView: 7,
                  spaceBetween: 4,
                },
                1400: {
                  slidesPerView: 8,
                  spaceBetween: 4,
                },
              }}
              list={renderTopIconElement}
            />
          </div>
          {/* <div className="tit_emo">
            <div className="horizontal">
              {renderTopIconElement()}
              <button type="button"
                className="left">
                <FontAwesomeIcon
                  className="fa-solid left"
                  icon={faAngleLeft}
                  onClick={() => handleTopPrev()}
                />
              </button>
              <button type="button"
                className="right">
                <FontAwesomeIcon
                  className="fa-solid right"
                  icon={faAngleRight}
                  onClick={() => handleTopNext()}
                />
              </button>
            </div>
          </div> */}
          <div className="cont_emo scrollY">
            <ul>{renderIconElement()}</ul>
          </div>
        </div>

        <ErrorMessage error={stateError} />
      </div>
    </>
  );
}
