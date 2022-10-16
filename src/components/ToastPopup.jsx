import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons";
import FadeIn from "react-fade-in";

const ToastPopup = ({ type, message, visible }) => {
  let icon;
  if (type === "success") {
    icon = <FontAwesomeIcon icon={faCircleCheck} />;
  } else if (type === "error") {
    icon = <FontAwesomeIcon icon={faCircleXmark} />;
  } else if (type === "information") {
    icon = <FontAwesomeIcon icon={faCircleInfo} />;
  }

  return (
    <FadeIn visible={visible}>
      <div className={`toast_msg ${type}`}>
        {icon}
        <span>{message}</span>
      </div>
    </FadeIn>
  );
};

export default ToastPopup;
