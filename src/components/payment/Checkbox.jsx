import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ErrorMessage from "../dashboard/ErrorMessage";

export default function Checkbox(props) {
  const { className, onChange, text, error } = props;
  const [ stateError, setStateError ] = useState(undefined);

  useEffect(() => {
    setStateError(error);
  }, [error]);

  return (
    <>
      <label className={className} >
        <input type="checkbox" onChange={(e) => onChange?.(e)} />
        <span>{text}</span>
        <ErrorMessage error={stateError} />
      </label>

    </>
  );
}
