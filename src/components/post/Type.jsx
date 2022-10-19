import { getPostTypeListFromServer } from "@/services/dashboardService";
import React, { useEffect } from "react";
import { useImperativeHandle, forwardRef } from 'react';
import { useState } from "react";
import ErrorMessage from "../dashboard/ErrorMessage";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Type
    name={'typeId'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default forwardRef( function Type(props, ref) {
  const {name, callback, selected, disabled} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
      

  const initCheckecInList = () => {
    stateList?.forEach((item, i) => {
      item.checked = false;
    });
  };

  const getChecked = (item, i) => {
    if( selected === undefined ){
      return i === 0 ? true : false;
    }
    else{
      return item.id === selected;
    }
    
  };

  const setCheckedToList = (list) => {
    return list.map( (item, i) => {
      return {
        ...item,
        // checked: i === 0 ? true : false
        checked: getChecked(item, i)
      }
    } );
  };

  const getType = async () => {
    const {status, data} = await getPostTypeListFromServer();
    
    if( status === 200 ){
      setStateList( setCheckedToList(data?.types) );
      callback?.(data.types[0]);
    }
    else{
      //error 처리
      setStateError( String(status, data) );
    }
  };

  const handleClickItem = (event) => {
    if( disabled ){
      event.preventDefault();
      return false;
    }

    initCheckecInList();
    const item = stateList[event.target.getAttribute('data-index')];
    item.checked = true;
    callback?.( item );
  };

  const renderTypeListElements = () => {
    return stateList?.map((item, index) => {
      return (
        <label className="inp_txchk" key={index}>
          <input
            type="radio"
            name={name}
            data-id={item.id}
            data-index={index}
            defaultValue={item.id}      //code or id
            defaultChecked={item.checked}
            onClick={handleClickItem}
          />
          
          <span className={`${disabled ? 'inp_disabled' : ''}`}>{item.name}</span>
        </label>
      );
    });
  };
  
  useImperativeHandle(ref, () => ({
    getTypeList: () => {
      return stateList;
    },
  }));

  useEffect(() => {
    getType();
  }, [selected]);


  return (
    <>
      {
        renderTypeListElements()
      }
      <ErrorMessage error={stateError} />
    </>
  );
})
