import React, { useState, useImperativeHandle, forwardRef }  from 'react';

import {INPUT_STATUS} from '@COMMON/constant';
import ErrorMessage from './ErrorMessage';

/**
 *
  refInput.current.setStatusInInput({type: INPUT_STATUS.DEFAULT});
  refInput.current.setStatusInInput({type: INPUT_STATUS.ERROR, error: "error"});

  <TextInput 
    inputType={"text"}  // or "textarea"
    className={"input_title"}
    name={"title"}
    ref={refInput}
    />
 * @param {*} props 
 * @param {*} ref 
 * @returns 
 */
function Input(props, ref) {
  const [status, setStatus] = useState({});

  const getTextInput = (inputType) => {
    const type = inputType === "textarea" ? "textarea" : "text";

    return (
      <input 
        type={`${type}`}
        name={props.name}
        className={`${props.className} ${status?.type === INPUT_STATUS.ERROR && "error"}`}
        />
    );
  };

  useImperativeHandle(ref, () => ({
    setStatusInInput: (value) => {
      setStatus(value);
    }
  }));

  return (
    <div
      className={`${props.className}_container`} >
      <div>
        {
          getTextInput(props.inputType)
        }
      </div>
     { 
      status?.type === INPUT_STATUS.ERROR &&
        <ErrorMessage error={status?.error} />
      }
    </div>
  )
}

export default forwardRef(Input);