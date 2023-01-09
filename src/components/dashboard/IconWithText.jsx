import { useEffect, useRef, useState } from "react";

import { setPostReactionToServer } from "@/services/postService";
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
  const [stateIconData, setStateIconData] = useState(undefined);
  const [stateTopSelected, setStateTopSelected] = useState(0);
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
    setStateTopSelected(0);
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
      params.iconImage = stateSelectedIcons[0].image;
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

  //==============================================================================
  //  event
  //==============================================================================

  const handleItemDelete = (selectedItem) => {
    setStateSelectedIcons(
      stateSelectedIcons.filter((item) => item.code !== selectedItem.code)
    );

    return false;
  };

  const handleTopIcon = (index) => {
    setStateTopSelected(index);
  };
  const handleTopPrev = () => {
    const size = stateIconData?.topIcons?.length;
    setStateTopSelected(stateTopSelected === 0 ? size-1 : stateTopSelected-1);
  };
  const handleTopNext = () => {
    const size = stateIconData?.topIcons?.length;
    setStateTopSelected(stateTopSelected === size-1 ? 0 : stateTopSelected+1);
  };

  const handleItemIcon = (index) => {
    const item = stateIconData?.topIcons[stateTopSelected]?.icons[index];
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
  //  hook & render
  //==============================================================================

  const renderSelectedIconsElement = () => {
    return stateSelectedIcons?.map((item, index) => {
      return (
        <div className="ico_emo" key={index}>
          <span>
            <Image hash={item.image}  />
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
    return stateIconData?.topIcons?.map((item, index) => {
      return (
        <SwiperSlide key={index} className={`top_box ${stateTopSelected === index ? 'active' : ''}`}>
          {/* <span className={`top_box ${stateTopSelected === index ? 'select' : ''}`}> */}
            <Image
              className={`icon`}
              hash={item.image}
              onClick={() => handleTopIcon(index)}
            />
          {/* </span> */}
        </SwiperSlide>
      );
    });
  }, [stateIconData, stateTopSelected]);

  const renderIconElement = () => {
    return stateIconData?.topIcons[stateTopSelected]?.icons?.map(
      (item, index) => {
        return (
          <li key={index}>
            <span>
              <Image
                hash={item.image}
                onClick={() => handleItemIcon(index)}
              />
            </span>
          </li>
        );
      }
    );
  };

  //component did mount
  useEffect(() => {
    setStateIconData(tempData);
  }, []);

  // useEffect(() => {
  //   setStateComment(reactionItem?.content);
  // }, [reactionItem]);

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

const tempData = {
  topIcons: [
    {
      image: 'src/assets/images/icon10.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
        {
          code: "icon2",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon3",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon4",
          image: "src/assets/images/icon5.png",
        },
        {
          code: "icon5",
          image: "src/assets/images/icon6.png",
        },
        {
          code: "icon6",
          image: "src/assets/images/icon7.png",
        },
        {
          code: "icon7",
          image: "src/assets/images/icon8.png",
        },
        {
          code: "icon8",
          image: "src/assets/images/icon9.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon1.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon2.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon3.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon4.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon5.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon10.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon6.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon1.png',
      icons: [
        {
          code: "icon11",
          image: "src/assets/images/icon9.png",
        },
        {
          code: "icon21",
          image: "src/assets/images/icon8.png",
        },
        {
          code: "icon31",
          image: "src/assets/images/icon7.png",
        },
        {
          code: "icon41",
          image: "src/assets/images/icon6.png",
        },
        {
          code: "icon51",
          image: "src/assets/images/icon5.png",
        },
        {
          code: "icon61",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon71",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon81",
          image: "src/assets/images/icon2.png",
        },
        {
          code: "icon101",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon111",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon121",
          image: "src/assets/images/icon5.png",
        },
      ],
    },
  ],
};
