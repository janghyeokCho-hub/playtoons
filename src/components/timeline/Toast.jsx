import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons";
import { useEffect } from 'react';

export default function Toast(props) {
  const { type, message, show } = props;
  const [ stateIsShow, setStateShow ] = useState(show);
  const active = {
    opacity: "1",
    transition: "opacity 500ms",
  };
  const hidden = {
    opacity: "0",
    visibility: "hidden",
    transition: "opacity 500ms , visibility 500ms",
  };

  const getIcon = () => {
    if( type === "success" ){
      return faCircleCheck;
    } else if( type === "error" ){
      return faCircleXmark;
    } else {
      return faCircleInfo;
    }
  };
  
  useEffect(() => {
    setStateShow(show);
    setTimeout(() => {
      setStateShow(false);
    }, 1500);
  }, [show]);

  return (
    <>
      <div
        className={`toast_msg ${type}`}
        style={stateIsShow ? active : hidden}
        onClick={() => setStateShow(false)}
      >
        <FontAwesomeIcon icon={getIcon()} />
        <span>{message}</span>
      </div>
    </>
  )
}
