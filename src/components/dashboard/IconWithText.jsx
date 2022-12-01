import { useEffect, useRef, useState } from "react";

//TODO  test icon
import tempTop2 from "@IMAGES/icon0.png";
import tempTop1 from "@IMAGES/icon1.png";
import temp1 from "@IMAGES/icon2.png";
import temp2 from "@IMAGES/icon3.png";
import temp3 from "@IMAGES/icon4.png";
import temp4 from "@IMAGES/icon5.png";
import temp5 from "@IMAGES/icon6.png";
import temp6 from "@IMAGES/icon7.png";
import temp7 from "@IMAGES/icon8.png";
import temp8 from "@IMAGES/icon9.png";

import { showOneButtonPopup } from "@/common/common";
import { setPostReactionToServer } from "@/services/postService";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { SwiperSlide } from "swiper/react";
import ErrorMessage from "./ErrorMessage";
import SwiperContainer from "./SwiperContainer";
import Button from "./Button";

/**
*
  아이콘 댓글 등록창
   <IconWithText 
    text={{
      sing_in_to_post: text.sing_in_to_post,    //placeholder
      icon: text.icon,                          //icon button text
      register: text.register                   //register button text
    }}
    callback={handler}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function IconWithText(props, ref) {
  const { text, postInfo, callback } = props;
  const [stateIconData, setStateIconData] = useState(undefined);
  const [stateTopSelected, setStateTopSelected] = useState(0);
  const [stateShowIcon, setStateShowIcon] = useState(false);
  const [stateSelectedIcons, setStateSelectedIcons] = useState([]);
  const [stateError, setStateError] = useState(undefined);
  const dispatch = useDispatch();
  const refContaienr = useRef();
  const refTextArea = useRef();
  const refButton = useRef();

  //==============================================================================
  //  function
  //==============================================================================
  const getMarginRightOfIcon = (index) => {
    let tempIndex = index + 1;
    return tempIndex % 5 === 0 ? "" : "mr16";
  };

  const initStatus = () => {
    setStateTopSelected(0);
    setStateShowIcon(false);
    setStateSelectedIcons([]);
    setStateError(undefined);
    refTextArea.current.value = "";
    refButton.current.setStatus(undefined);
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
      content: refTextArea.current.value,
      iconImage:
        stateSelectedIcons.length === 0 ? "" : stateSelectedIcons[0].src,
      type: "reply",
      postId: postInfo.id,
      authorId: postInfo.author.id,
      // reactionId: "string"
    };

    const { status, data } = await setPostReactionToServer(params);
    if (status === 201) {
      callback?.();
      initStatus();
      // showOneButtonPopup(dispatch, text.register_coment);
    } else {
      setStateError(String(status + data));
      refButton.current.setStatus(undefined);
    }
  };

  //==============================================================================
  //  event
  //==============================================================================

  const handleClickItemDelete = (event) => {
    event.stopPropagation();
    const index =
      event.target.parentElement.getAttribute("data-id") === null
        ? event.target.getAttribute("data-id")
        : event.target.parentElement.getAttribute("data-id");
    const selectedItem = stateSelectedIcons[index];
    setStateSelectedIcons(
      stateSelectedIcons.filter((item) => item.code !== selectedItem.code)
    );

    return false;
  };

  const handleClickItemTopIcon = (event) => {
    event.stopPropagation();
    const index = event.target.getAttribute("data-id");
    setStateTopSelected(index);
  };

  const handleClickItemIcon = (event) => {
    const index = event.target.getAttribute("data-id");
    const item = stateIconData?.topIcons[stateTopSelected]?.icons[index];
    // setStateSelectedIcons([...stateSelectedIcons, item]);
    setStateSelectedIcons([item]);
  };

  const handleClickRegister = (event) => {
    if (!refTextArea.current.value) {
      setStateError(text.please_input_coment);
      refButton.current.setStatus(undefined);
      return false;
    }

    setReaction();
  };

  //==============================================================================
  //  hook & render
  //==============================================================================

  const renderSelectedIconsElement = () => {
    return stateSelectedIcons?.map((item, index) => {
      return (
        <div className="ico_emo" key={index}>
          <span>
            <img src={item.image} alt="" />
          </span>
          <button type="button">
            <FontAwesomeIcon
              className="fa-solid fa-circle-xmark"
              icon={faCircleXmark}
              data-id={index}
              onClick={handleClickItemDelete}
            />
          </button>
        </div>
      );
    });
  };

  const renderTopIconElement = () => {
    return stateIconData?.topIcons?.map((item, index) => {
      return (
        <SwiperSlide className="cx  swiper-slide" key={index}>
          <img
            src={item.image}
            data-id={index}
            onClick={handleClickItemTopIcon}
            alt=""
          />
        </SwiperSlide>
      );
    });
  };

  const renderIconElement = () => {
    return stateIconData?.topIcons[stateTopSelected]?.icons?.map(
      (item, index) => {
        return (
          <li key={index}>
            <span>
              <img
                src={item.image}
                alt="icon"
                data-id={index}
                onClick={handleClickItemIcon}
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

  return (
    <>
      <div className="conts">
        <div className={`textarea1 ${stateSelectedIcons.length > 0 && "emo"}`}>
          <textarea
            ref={refTextArea}
            name="content"
            className="textarea1"
            placeholder={text.sing_in_to_post}
            onChange={() => setStateError(undefined)}
            onFocus={() => setStateShowIcon(false)}
          />

          {/* <!-- 삽입된 이모티콘 --> */}
          {stateSelectedIcons.length > 0 && renderSelectedIconsElement()}
        </div>

        {/* button */}
        <div className="btns">
          <button
            type="button"
            className={`btn-pk s ${stateShowIcon ? "blue2" : "gray"}`}
            onClick={() => setStateShowIcon(!stateShowIcon)}
          >
            <span>{text.icon}</span>
          </button>
          <Button
            type="button"
            ref={refButton}
            text={text.register}
            className="btn-pk s blue"
            onClick={handleClickRegister}
          >
          </Button>
        </div>

        {/* <!-- 이모티콘 삽입 --> */}
        {stateShowIcon && (
          <div
            className="box_emoji"
            style={{ display: "block" }}
            ref={refContaienr}
          >
            <div className="tit_emo">
              <SwiperContainer
                className={"myEmoji1"}
                buttonClassName={"myem"}
                iconLeft={faAngleLeft}
                iconRight={faAngleRight}
                slidesPerView={8}
                breakpoints={{
                  0: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                  },
                  960: {
                    slidesPerView: 6,
                    spaceBetween: 12,
                  },
                  1400: {
                    slidesPerView: 8,
                    spaceBetween: 16,
                  },
                }}
                list={renderTopIconElement}
              />
            </div>
            <div className="cont_emo scrollY">
              <ul>{renderIconElement()}</ul>
            </div>
          </div>
        )}

        <ErrorMessage error={stateError} />
      </div>
    </>
  );
}

const tempData = {
  topIcons: [
    {
      image: tempTop1,
      icons: [
        {
          code: "icon1",
          image: temp1,
          src: "src/assets/images/icon2.png",
        },
        {
          code: "icon2",
          image: temp2,
          src: "src/assets/images/icon3.png",
        },
        {
          code: "icon3",
          image: temp3,
          src: "src/assets/images/icon4.png",
        },
        {
          code: "icon4",
          image: temp4,
          src: "src/assets/images/icon5.png",
        },
        {
          code: "icon5",
          image: temp5,
          src: "src/assets/images/icon6.png",
        },
        {
          code: "icon6",
          image: temp6,
          src: "src/assets/images/icon7.png",
        },
        {
          code: "icon7",
          image: temp7,
          src: "src/assets/images/icon8.png",
        },
        {
          code: "icon8",
          image: temp8,
          src: "src/assets/images/icon9.png",
        },
      ],
    },
    {
      image: tempTop2,
      icons: [
        {
          code: "icon11",
          image: temp8,
          src: "src/assets/images/icon9.png",
        },
        {
          code: "icon21",
          image: temp7,
          src: "src/assets/images/icon8.png",
        },
        {
          code: "icon31",
          image: temp6,
          src: "src/assets/images/icon7.png",
        },
        {
          code: "icon41",
          image: temp5,
          src: "src/assets/images/icon6.png",
        },
        {
          code: "icon51",
          image: temp4,
          src: "src/assets/images/icon5.png",
        },
        {
          code: "icon61",
          image: temp3,
          src: "src/assets/images/icon4.png",
        },
        {
          code: "icon71",
          image: temp2,
          src: "src/assets/images/icon3.png",
        },
        {
          code: "icon81",
          image: temp1,
          src: "src/assets/images/icon2.png",
        },
        {
          code: "icon91",
          image: temp1,
          src: "src/assets/images/icon2.png",
        },
        {
          code: "icon101",
          image: temp2,
          src: "src/assets/images/icon3.png",
        },
        {
          code: "icon111",
          image: temp3,
          src: "src/assets/images/icon4.png",
        },
        {
          code: "icon121",
          image: temp4,
          src: "src/assets/images/icon5.png",
        },
      ],
    },
  ],
};
