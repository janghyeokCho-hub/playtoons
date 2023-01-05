import { showPopup } from '@/common/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import CommentPopup from './CommentPopup';

export default function CommentButton(props) {
  const { className, icon, item, onClick } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    onClick?.("loading");
    showPopup(
      dispatch,
      "",
      <CommentPopup item={item} />,
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
        <span>{item?.reactionCount}</span>
      </button>
    </>
  );
}
