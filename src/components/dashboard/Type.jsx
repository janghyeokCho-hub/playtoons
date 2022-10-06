import { getPostTypeListFromServer } from "@/services/dashboardService";
import React, { useEffect } from "react";
import { useState } from "react";
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
  const {name, className, callback} = props;
  const [stateList, setStateList] = useState(undefined);


  const getType = async () => {
    const {status, data} = await getPostTypeListFromServer();
    
    if( status === 200 ){
      setStateList( data?.types );
      callback?.(data.types[0]);
    }
    else{
      //error 처리
    }
  };

  const handleClickItem = (option) => {
    const item = stateList[option.getAttribute('value')];
    callback?.( item );
  };


  useEffect(() => {
    getType();
  }, []);

  return (
    <>
      <Select 
        name={name}
        className={`${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem}
        />
    </>
  );
}
