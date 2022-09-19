import React, { useImperativeHandle, useState, forwardRef, useEffect } from "react";

function ToggleOn(props, ref) {
  const { selected } = props;
  const [isSelected, setSelected] = useState(false);
  
  const handleClick = () => {
    setSelected(!isSelected);
  }

  useImperativeHandle(ref, () => {
    return isSelected;
  });

  useEffect(() => {
    if( selected !== undefined ){
      setSelected(selected);
    }
  }, []);
  

  return (
    <div className={`toggle_container ${isSelected && ('select')}`} onClick={handleClick}>
      <div className={`toggle_oval ${isSelected && 'select'}`} ></div>
    </div>
  );
}

export default forwardRef(ToggleOn);
