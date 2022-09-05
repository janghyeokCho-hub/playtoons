export const modalTypes = {
  SHOW_MODAL : 'SHOW_MODAL',
  HIDE_MODAL : 'HIDE_MODAL'
}

export const showModal = (contents, callback) => {
  return {
    type: modalTypes.SHOW_MODAL,
    payload: {
      show: true,
      contents,
      callback
    }
    
  };
};

export const hideModal = () => {
  return {
    type: modalTypes.HIDE_MODAL
  };
};

export const modalAction = {
	showModal,
  hideModal
};

const initialState = {
  show : false,
  contents : <></>,
  callback : null
}
const alertModal = (state = initialState, action) => {
  const {type, payload} = action;
  switch( type ){
    case modalTypes.SHOW_MODAL:
      return {
        show : true,
        contents: payload.contents,
        callback: payload.callback
      };
      
    case modalTypes.HIDE_MODAL:
      return {
        show : false,
        contents: <></>,
        callback: null
      };
      
      default :
      return initialState;
    }//switch
  };
  export default alertModal;
  