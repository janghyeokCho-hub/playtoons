import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import "@/css/test.css";

function ErrorMessage(props) {
  return (
    <div className="error_message_container">
      <FontAwesomeIcon 
        icon={faCircleXmark}
        className={"error_message_ico"} />
      <div className="error_message_text">{props.error}</div>
    </div>
  )
}


export default ErrorMessage;