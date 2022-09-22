import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";

export default function ImagePreviewContainer(props) {
  const { children : src, handleClick } = props;

  return (
    <div className={"fileview"}>
      <div><img src={src} alt="preview" /></div>
      <button type="button" class="btn_del" title="削除">
        <FontAwesomeIcon 
              icon={faCircleXmark}
              onClick={handleClick}
              />
        </button>
    </div>
  )
}

