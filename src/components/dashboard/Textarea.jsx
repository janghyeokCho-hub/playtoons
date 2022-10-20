import React, { useState } from 'react';
import ErrorMessage from '@COMPONENTS/dashboard/ErrorMessage';
import { useEffect } from 'react';
import { useImperativeHandle, forwardRef } from 'react';
import { useRef } from 'react';

export default forwardRef( function Textarea(props, ref) {
  const {type, name, className, defaultValue} = props;
  const [stateError, setStateError] = useState(undefined);
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
    // setStateError(error);
  }, []);

  return (
    <>
      <textarea ref={refInput} type={type} name={name} className={className} defaultValue={defaultValue || ''} onChange={() => setStateError(undefined)} />
      
      <ErrorMessage error={stateError} />
    </>
  )
})