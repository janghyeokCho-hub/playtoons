import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import { useState } from 'react';
import { useEffect } from 'react';


/**
*
  <ToolTip 
    title={"Title"} 
    text={"text something123142"}
    handleClick={handleClickEvent} />
*
* @version 1.0.0
* @author 2hyunkook
* @param title title
* @param text contents text
* @param handleClick icon 클릭시 수행하고 싶은 event
* @return
*/
export default function ToolTip(props) {
  const {title, text, handleClick} = props;
  const [isShow, setShow] = useState(false);

  const onClick = (e) => {
    handleClick?.(e);
    setShow(prev => !prev);
  }

  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  return (
    <div className="relative" onClick={onClick}>
      {
        isShow && 
        <div className="tooltip-popup">
          <div className="tooltip-title">{title}</div>
          <div className="tooltip-text">{text}</div>
        </div>
      }
      <FontAwesomeIcon 
        icon={faCircleInfo}
        className={"fa-circle-info"}
        />
    </div>
  )
}
