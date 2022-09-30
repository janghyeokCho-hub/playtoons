import React from 'react';
import { useState } from 'react';
import { faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useImperativeHandle, forwardRef } from 'react';


export default forwardRef( function ArrowRight(props, ref) {
  const { className, callback, value, } = props;
  const [stateRotate , setStateRotate] = useState(false);
  
  const handleClickArrow = (event) => {
    callback?.(value, stateRotate);
    setStateRotate(prev => !prev);
  };

  useImperativeHandle(ref, () => ({
    init: () => {
      setStateRotate(false);
    },
    getValue: () => {
      return value;
    },
  }));

  return (
    <FontAwesomeIcon 
      className={`${className} ${stateRotate ? 'dsi_rotate' : ''}`} 
      icon={faAngleRight}  
      onClick={handleClickArrow}
      />
  )
})
