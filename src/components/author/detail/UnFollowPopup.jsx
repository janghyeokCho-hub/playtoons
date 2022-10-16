import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
const UnFollowPopup = ({ onClose }) => {
  return (
    <div className="popup_dim">
      <div id="popFollow" class="layerPopup pop_follow">
        <div class="popup">
          <div class="pop_head">
            <h2 class="title">フォロー解除</h2>
            <button
              type="button"
              class="btn_pop_close b-close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} />
            </button>
          </div>
          <div class="pop_cont">
            <p class="ta-c">フォローを解除しますか？</p>
          </div>
          <div class="pop_botm">
            <button
              type="button"
              class="btn-pk blue2 b-close"
              onClick={onClose}
            >
              キャンセル
            </button>
            <button type="button" class="btn-pk blue">
              解除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnFollowPopup;
