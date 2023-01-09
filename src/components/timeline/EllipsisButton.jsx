import { showPopup, showToast } from "@/common/common";
import { hideModal } from "@/modules/redux/ducks/modal";
import { setPostIdReportToServer } from "@/services/timelineService";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportPopup from "../dashboard/ReportPopup";

export default function EllipsisButton(props) {
  const { onClick } = props;
  const [ stateIsShow, setStateShow ] = useState(false);
  const reduxTimeline = useSelector(({timeline}) => timeline.timeline);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();


  const setReport = async (type, content) => {
    let params = {
      type: type,
      content: content,
    };

    const { status, data } = await setPostIdReportToServer(reduxTimeline.id, params);

    if (status === 201) {
      showToast(dispatch, 'success', '通報しました。', true);
      dispatch( hideModal() );
      onClick?.(stateIsShow);
      setStateShow(false);
    } else {
      showToast(dispatch, data);
    }
  };

  const handleClickButton = () => {
    onClick?.(stateIsShow);
    setStateShow(!stateIsShow);
  }

  const handleClickReport = () => {
    showPopup(dispatch, '通報', <ReportPopup callback={(type, content) => setReport(type, content)} /> );
  };
  
  return (
    <>
      <button
        type="button"
        className="btn01"
        onClick={() => handleClickButton()}
      >
        <span className="i">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </span>
      </button>
      {
        //author Id 확인 필요
        stateIsShow && (
          <div className="box_drop">
            <ul>
              {
                reduxAuthors?.[0].id === reduxTimeline?.authorId &&  
                  <li>
                    <Link to={`/post/edit/${reduxTimeline?.id}`}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                      修正
                    </Link>
                  </li>
              }
              <li>
                <a 
                  className="pointer"
                  onClick={handleClickReport}>
                  <FontAwesomeIcon icon={faTrash} />
                  通報
                </a>
              </li>
            </ul>
          </div>
        )
      }
    </>
  )
}
