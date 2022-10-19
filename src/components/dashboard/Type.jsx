import { getPostTypeListFromServer } from "@/services/dashboardService";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Select from "./Select";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Type
    name={'typeId'}
    className={'select1 wid1'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Type(props, ref) {
  const {name, className, callback, selected, disabled, disabledText} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const refSelect = useRef();

  //==============================================================================
  // function
  //==============================================================================

  const getSelectedItem = (option) => {
    const id = option.getAttribute('value');
    let selected = undefined;
    for( let i = 0; i < stateList.length; i++ ){
      if( stateList[i].id === id ){
        selected = stateList[i];
        break;
      }
    }
    return selected;
  };

  //==============================================================================
  // api
  //==============================================================================

  const getType = async () => {
    const {status, data} = await getPostTypeListFromServer();
    
    if( status === 200 ){
      console.log('first', selected);
      setStateList( data?.types );
      callback?.(data.types[0]);
    }
    else{
      //error 처리
      setStateError( String(status, data) );
    }
  };
  //==============================================================================
  // event
  //==============================================================================
  const handleClickItem = (option) => {
    callback?.( getSelectedItem(option) );
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    if( selected !== undefined ){
      refSelect.current.setSelected(selected);
    }
  }, [selected, stateList]);

  return (
    <>
      <Select 
        ref={refSelect}
        name={name}
        className={`${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem}
        disabled={disabled}
        disabledText={disabledText}
        />
      
      <ErrorMessage error={stateError} />
    </>
  );
}
