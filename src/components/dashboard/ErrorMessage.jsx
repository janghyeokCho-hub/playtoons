import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import "@/css/test.css";

export default ( function ErrorMessage(props) {
  const { error } = props;

  return (
    <>
      {
        error !== undefined &&
          <div className={`error_message_container ${props.className}`}>
            <FontAwesomeIcon 
              icon={faCircleXmark}
              className={"error_message_ico"} />
            <div className="error_message_text">{error}</div>
          </div>
      }
    </>
  )
});
