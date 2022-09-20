import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarItem(props) {
  const { icon, selectedIcon, text, onClick, path : myPath } = props;
  const [isSelected, setSelected] = useState(false);
  const location = useLocation();
  

  const handleClick = (e) => {
    setSelected(!isSelected);

    if (onClick !== undefined) {
      onClick(e);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    if( path.indexOf(myPath) !== -1  ){
      setSelected(true);
    }
  }, []);
  

  return (
    <li className={`${isSelected && "on "}s1`} onClick={handleClick}><a href="#"><span>{text}</span></a></li>
  );
}


