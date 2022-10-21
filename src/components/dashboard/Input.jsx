import React, { useState } from 'react';
import ErrorMessage from '@COMPONENTS/dashboard/ErrorMessage';
import { useEffect } from 'react';
import { useImperativeHandle, forwardRef } from 'react';
import { useRef } from 'react';

export default forwardRef( function Input(props, ref) {
  const {type, name, className, defaultValue} = props;
  const [stateError, setStateError] = useState(undefined);
  const [stateValue, setStateValue] = useState(undefined);
  const refInput = useRef();

  
  useImperativeHandle(ref, () => ({
    setError: (msg) => {
      setStateError(msg);
    },
    getValue: () => {
      return refInput.current.value;
    },
    isEmpty: () => {
      return refInput.current.value === '';
    },
    focus: () => {
      refInput.current.focus();
    },
  }));

  useEffect(() => {
    setStateValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <input ref={refInput} type={type} name={name} className={className} defaultValue={stateValue} onChange={() => setStateError(undefined)} />
      
      <ErrorMessage error={stateError} />
    </>
  )
})
