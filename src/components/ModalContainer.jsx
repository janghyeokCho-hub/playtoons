import React from 'react';
import { useSelector } from 'react-redux';

import Modal from "@/components/Modal";

export default function ModalContainer() {
  const alertModal = useSelector((state) => state.alertModal);

  return (
    <>
      {
        alertModal.show && 
        <Modal  
            show={alertModal.show}
            contents={alertModal.contents} 
            callback={alertModal.callback} 
            /> 
      }
    </>

  )
}
//px.animaapp.com
