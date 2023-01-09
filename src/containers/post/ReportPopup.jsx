import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { reportReaction } from "@API/reactionService";
import { showToast } from "@/common/common";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ReportPopup({ onClose, content, postId }) {
  const [stateValue, setStateValue] = useState("spam");
  const [stateContent, setStateContent] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setStateValue(event.target.value);
  };

  const handleReport = async () => {
    //sexual, violence, terror, spam, hateful, harmful, rating, child_abuse, abuse, copyright, other
    const params = {
      type: stateValue,
      content: stateContent,
    };

    const response = await reportReaction({ id: postId, params });
    if (response.status === 201) {
      showToast(dispatch, "success", "通報しました。", true);
      onClose();
    } else {
      showToast(dispatch, "error", response.data, true);
    }
  };

  return (
    <div className="popup_dim">
      <div className="layerPopup pop_report">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">通報</h2>
            <button
              type="button"
              className="btn_pop_close b-close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} fontSize={24} />
            </button>
          </div>
          <div className="pop_cont">
            <p className="ta-c">通報する理由を選択してください。</p>

            <fieldset onChange={(e) => handleChange(e)}>
              <label className="inp_radio">
                <input type="radio" name="radio" value="spam" defaultChecked />
                <span>スパム</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="hateful" />
                <span>迷惑行為</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="harmful" />
                <span>出会い目的</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="other" />
                <span>その他</span>
              </label>
            </fieldset>
            <textarea
              className={`textarea1${stateValue === 'other' ? ' show' : ''}`}
              placeholder="詳細(任意)"
              onChange={(e) => setStateContent(e.target.value)}
            ></textarea>
          </div>
          <div className="pop_botm">
            <button
              type="button"
              className="btn-pk blue"
              onClick={handleReport}
            >
              通報する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
