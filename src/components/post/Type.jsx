import { getPostTypeListFromServer } from "@/services/dashboardService";
import React, { useEffect } from "react";
import { useState } from "react";

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
export default function Type(props, ref) {
  const {name, callback} = props;
  const [stateList, setStateList] = useState(undefined);

  const initCheckecInList = () => {
    stateList?.forEach((item, i) => {
      item.checked = false;
    });
  };

  const setCheckedToList = (list) => {
    return list.map( (item, i) => {
      return {
        ...item,
        checked: i === 0 ? true : false
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
    }
  };

  const handleClickItem = (event) => {
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
          <span>{item.name}</span>
        </label>
      );
    });
  };

  useEffect(() => {
    getType();
  }, []);

  return (
    <>
      {
        renderTypeListElements()
      }
    </>
  );
}
