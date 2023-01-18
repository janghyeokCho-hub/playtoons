import { forwardRef, useImperativeHandle, useState } from 'react';
import ArrowRightView from './ArrowRightView';


export default forwardRef( function ArrowRight(props, ref) {
  const { className, callback, value, index } = props;
  const [stateRotate , setStateRotate] = useState(false);
  
  const handleClickArrow = (event) => {
    callback?.(value, !stateRotate, index);
    setStateRotate(prev => !prev);
  };

  useImperativeHandle(ref, () => ({
    init: () => {
      setStateRotate(false);
    },
    setRotate: (isRotate) => {
      setStateRotate(isRotate);
    },
    getValue: () => {
      return value;
    },
  }));

  return (
    <ArrowRightView 
      className={className} 
      rotate={stateRotate}  
      onClick={handleClickArrow}
      />
  )
})
