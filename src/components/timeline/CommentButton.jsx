import { showPopup } from '@/common/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import CommentPopup from './CommentPopup';

export default function CommentButton(props) {
  const { className, icon, onClick } = props;
  const dispatch = useDispatch();
  const reduxTimeline = useSelector(({timeline}) => timeline.timeline);

  const handleClick = () => {
    onClick?.("loading");
    showPopup(
      dispatch,
      "",
      <CommentPopup />,
      () => onClick?.("init"),
      "comment"
    );
  };

  return (
    <>
      <button
        type="button"
        className={`${className}`}
        onClick={() => handleClick()}
      >
        <span className="i">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{reduxTimeline?.reactionCount}</span>
      </button>
    </>
  );
}
