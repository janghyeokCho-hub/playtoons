import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronUp,
  faCommentQuote,
  faHeart,
  faShare,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";

const Timeline = () => {
  return (
    <div className="contents">
      <div className="wrap_timeline">
        <div className="rgh">
          <button type="button" className="btn01">
            <span className="i">
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          </button>
          <button type="button" className="btn01">
            <span className="i">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </button>
        </div>

        <div className="col active">
          <div className="bt_bar">
            <div className="bar">
              <span style={{ width: "20%" }}></span>
            </div>
          </div>
          <div className="thumb">
            <ImgSpan bgImg={require("@IMAGES/tmp_comic3.png")}></ImgSpan>
          </div>
          <div className="cont">
            <p className="t1">
              PlayToons「プレイトゥーンズ」は、
              <br />
              クリエイターと支援者を繋ぐコミュニティです。
            </p>
            <div className="t_profile">
              <ImgSpan
                className="im"
                bgImg={require("@IMAGES/img_profile.png")}
              ></ImgSpan>
              <p>Studio reBornStudio reBorn</p>
            </div>
            <button type="button" className="btn-pk n blue">
              フォロー
            </button>
          </div>

          <div className="bt_top">
            <button type="button" className="btn01 view-m">
              <span className="i">
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
              <span className="hidden">prev</span>
            </button>
            <button type="button" className="btn01" onclick="boxDrop(this);">
              <span className="i">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </button>
            <div className="box_drop">
              <ul>
                <li>
                  <a href="#" onclick="showComm(this); return false;">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </a>
                </li>
                <li>
                  <a href="#" onclick="showDrop('popDelete'); return false;">
                    <FontAwesomeIcon icon={faTrash} />
                    削除
                  </a>
                </li>
                {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
              </ul>
            </div>
          </div>
          <div className="bt_botm">
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span>1.2k</span>
            </button>
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faCommentQuote} />
              </span>
              <span>766</span>
            </button>
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faShare} />
              </span>
              <span className="hidden">share</span>
            </button>
          </div>
        </div>

        <div className="col">
          <div className="bt_bar">
            <div className="bar">
              <span style={{ width: "20%" }}></span>
            </div>
          </div>
          <div className="thumb">
            <ImgSpan bgImg={require("@IMAGES/tmp_comic3.png")}></ImgSpan>
          </div>
          <div className="cont">
            <p className="t1">
              PlayToons「プレイトゥーンズ」は、
              <br />
              クリエイターと支援者を繋ぐコミュニティです。
            </p>
            <div className="t_profile">
              <ImgSpan
                className="im"
                bgImg={require("@IMAGES/img_profile.png")}
              ></ImgSpan>
              <p>Studio reBornStudio reBorn</p>
            </div>
            <button type="button" className="btn-pk n blue">
              フォロー
            </button>
          </div>

          <div className="bt_top">
            <button type="button" className="btn01 view-m">
              <span className="i">
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
              <span className="hidden">prev</span>
            </button>
            <button type="button" className="btn01" onclick="boxDrop(this);">
              <span className="i">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
            </button>
            <div className="box_drop">
              <ul>
                <li>
                  <a href="#" onclick="showComm(this); return false;">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </a>
                </li>
                <li>
                  <a href="#" onclick="showDrop('popDelete'); return false;">
                    <FontAwesomeIcon icon={faTrash} />
                    削除
                  </a>
                </li>
                {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
              </ul>
            </div>
          </div>
          <div className="bt_botm">
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span>1.2k</span>
            </button>
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faCommentQuote} />
              </span>
              <span>766</span>
            </button>
            <button type="button" className="btn01">
              <span className="i">
                <FontAwesomeIcon icon={faShare} />
              </span>
              <span className="hidden">share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Timeline;
