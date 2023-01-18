import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ArrowRightView(props) {
  const { className = "", onClick, rotate } = props;

  const handleClick = (event) => {
    onClick?.(event, rotate);
  };
  

  return (
    <FontAwesomeIcon 
      className={`transition ${className} ${rotate ? 'dsi_rotate' : ''}`} 
      icon={faAngleRight}  
      onClick={(e) =>  handleClick(e)}
      />
  )
};
