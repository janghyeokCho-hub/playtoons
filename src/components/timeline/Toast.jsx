import {
  faCircleCheck, faCircleInfo, faCircleXmark
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Toast(props) {
  const { type = '', message = '', show } = props;
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
  

  return (
    <>
      <div
        className={`toast_msg ${type}`}
        style={show ? active : hidden}
      >
        <FontAwesomeIcon icon={getIcon()} />
        <span>{` ${message}`}</span>
      </div>
    </>
  )
}
