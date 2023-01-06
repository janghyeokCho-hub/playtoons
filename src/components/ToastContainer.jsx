import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from './timeline/Toast';

/**
   ToastContainer Component
* @date 2023.01.06 11:55
* @version 1.0.0
* @author 2hyunkook
*/
export default function ToastContainer(){
  const reduxToast = useSelector(({alertModal}) => alertModal.toast);
  const [ stateIsShow, setStateShow ] = useState(false);

  useEffect(() => {
    if( reduxToast ){
      setStateShow(true);
      setTimeout(() => {
        setStateShow(false);
      }, [1500]);
    } else {
      setStateShow(false);
    }
  }, [reduxToast]);

  return (
    <>
      <Toast
         type={reduxToast?.type} 
         message={reduxToast?.message} 
         show={stateIsShow}
      />  
    </>
  );
}