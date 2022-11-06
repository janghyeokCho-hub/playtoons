import {
  faCommentQuote,
  faHeart,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Hashtag = () => {
  return (
    <div class="area_schmain2 inr-c">
      <div class="lst_detail">
        <ul>
          <li class="item">
            <Link to="">
              <div class="thumb">
                <img src={require("@IMAGES/tmp_comic1.jpg")} alt="" />
              </div>
              <div class="txt">
                <p class="h1">
                  2話 :
                  シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                </p>
                <p class="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div class="botm">
                <div class="lst_tag">
                  <div class="i_tag">#アクション</div>
                  <div class="i_tag">#異世界</div>
                </div>

                <p class="d1">2022/09/12 12:00</p>
                <button type="button" class="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  1.2k
                </button>
                <button type="button" class="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  966
                </button>
              </div>
            </Link>
          </li>
          <li class="item">
            <Link to="">
              <div class="thumb">
                <img src={require("@IMAGES/tmp_comic1.jpg")} alt="" />
                <div class="area_lock">
                  {/*<!-- 잠금 -->*/}
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                  </div>
                </div>
              </div>
              <div class="txt">
                <p class="h1">
                  <span class="i-txt">支援</span>3話 : シェルターアーク
                </p>
                <p class="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div class="botm">
                <div class="lst_tag">
                  <div class="i_tag">#アクション</div>
                  <div class="i_tag">#異世界</div>
                </div>

                <p class="d1">2022/09/12 12:00</p>
                <button type="button" class="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  1.2k
                </button>
                <button type="button" class="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  966
                </button>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hashtag;
