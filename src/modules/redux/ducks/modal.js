export const modalTypes = {
  SHOW_MODAL : 'SHOW_MODAL',
  HIDE_MODAL : 'HIDE_MODAL'
}

export const MODAL_DESIGN_TYPE = {
  DEFAULT: 0,
  CLOSE_BUTTON: 1,
  CONFIRM_BUTTON: 2,
  TWO_BUTTON: 3,
};


export const showModal = (contents, callback, type) => {
  return {
    type: modalTypes.SHOW_MODAL,
    payload: {
      show: true,
      contents,
      callback,
      type
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
  callback : null,
  type: MODAL_DESIGN_TYPE.DEFAULT,
}
const alertModal = (state = initialState, action) => {
  const {type, payload} = action;
  switch( type ){
    case modalTypes.SHOW_MODAL:
      return {
        show : true,
        contents: payload.contents,
        callback: payload.callback,
        type: payload.type,
      };
      
    case modalTypes.HIDE_MODAL:
      return {
        show : false,
        contents: <></>,
        callback: null,
        type: MODAL_DESIGN_TYPE.DEFAULT,
      };
      
      default :
      return initialState;
    }//switch
  };
  export default alertModal;
  