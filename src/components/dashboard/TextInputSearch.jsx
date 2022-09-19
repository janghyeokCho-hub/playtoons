import React, { useState, useImperativeHandle, forwardRef }  from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/pro-light-svg-icons";


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

  useImperativeHandle(ref, () => ({
    setStatusInInput: (value) => {
      setStatus(value);
    }
  }));

  return (
    <div
      className={`${props.className}_container`} >
      <div>
        <FontAwesomeIcon 
              icon={faMagnifyingGlass}
              style={{ 
                width: "20px", 
                height:"20px", 
                marginRight: "8px", 
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translate(0, -50%)",
                color: "var(--bright-gray)" }}
              />
        <input 
          type={"text"}
          name={props.name}
          className={`${props.className} ${status?.type === INPUT_STATUS.ERROR && "error"}`}
          placeholder={props.placeholder}
          />
      </div>
     { 
      status?.type === INPUT_STATUS.ERROR &&
        <ErrorMessage error={status?.error} />
      }
    </div>
  )
}

export default forwardRef(Input);