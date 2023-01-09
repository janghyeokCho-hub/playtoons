import { useSelector } from 'react-redux';

import Modal from "@/components/Modal";

export default function ModalContainer() {
  const alertModal = useSelector(({alertModal}) => alertModal);

  return (
    <>
      {
        <Modal  
            show={alertModal.show}
            title={alertModal.title} 
            contents={alertModal.contents} 
            className={alertModal.className} 
            /> 
      }
    </>

  )
}
//px.animaapp.com
