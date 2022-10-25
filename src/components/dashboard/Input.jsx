import React, { useState } from 'react';
import ErrorMessage from '@COMPONENTS/dashboard/ErrorMessage';
import { useEffect } from 'react';
import { useImperativeHandle, forwardRef } from 'react';
import { useRef } from 'react';

export default forwardRef( function Input(props, ref) {
  const {type, name, className, defaultValue, onChange, onFocus, onBlur} = props;
  const [stateError, setStateError] = useState(undefined);
  const [stateValue, setStateValue] = useState(undefined);
  const refInput = useRef();

  const handleChnage = (event) => {
    setStateError(undefined);
    onChange?.(event);
  };
  
  useImperativeHandle(ref, () => ({
    setError: (msg) => {
      setStateError(msg);
      refInput.current.focus();
    },
    getValue: () => {
      return refInput.current.value;
    },
    setValue: (value) => {
      refInput.current.value = value;
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
      <input ref={refInput} type={type} name={name} className={className} defaultValue={stateValue} onChange={handleChnage} onFocus={onFocus} onBlur={onBlur} />
      
      <ErrorMessage error={stateError} />
    </>
  )
})
