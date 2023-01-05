import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faPenToSquare,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReplyControlBox = ({
  item,
  setIsEdit,
  setIsDeletePopupShow,
  setIsReportPopupShow,
  setIsReplyControlShow,
}) => {
  const userInfo = useSelector(({ login }) => login.userInfo);
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      setIsReplyControlShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="box_drop comment" ref={ref}>
      <ul>
        {
          item.accountId === userInfo.id ? (
            <>
              <li onClick={() => {
                setIsEdit(true);
                setIsReplyControlShow(false);
                }}>
                <a className="pointer">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  {` 修正`}
                </a>
              </li>
              <li onClick={() => setIsDeletePopupShow(true)}>
                <a className="pointer">
                  <FontAwesomeIcon icon={faTrash} />
                  {` 削除`}
                </a>
              </li>
            </>
          ) : (
            <li onClick={() => setIsReportPopupShow(true)}>
              <a className="pointer">
                <FontAwesomeIcon icon={faFlag} />
                {` 通報`}
              </a>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default ReplyControlBox;
