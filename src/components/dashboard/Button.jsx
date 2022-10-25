import React, { useEffect } from 'react';
import { useState } from 'react';
import Lottie from 'react-lottie';
import * as LoadingData from '@/assets/loading.json';
import { useImperativeHandle, forwardRef } from 'react';

/**
*
   loading lottie 구현된 버튼
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default forwardRef( function Button(props, ref) {
  const { className, text, onClick } = props;
  const [ stateStatus, setStateStatus ] = useState(undefined);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleClick = (event) => {
    if( stateStatus === undefined ){
      setStateStatus('loading');
      onClick?.(event);
    }
  };
  
  useImperativeHandle(ref, () => ({
    setStatus: (status) => {
      setStateStatus(status);
    }
  }));

  useEffect(() => {
    return () => {
      setStateStatus(undefined);
    }
  }, []);
  

  return (
    <div className={className} onClick={handleClick}>
      <div className="pull_width relative" >
        <span className={`${stateStatus === undefined ? '' : 'c_transparent'}`}>{text}</span>
        {
          stateStatus === 'loading' && 
            <span className='lottie'>
              <Lottie 
                options={defaultOptions}
                height={40}
                width={40}
                />
              </span>
        }
      </div>
    </div>
  )
})
