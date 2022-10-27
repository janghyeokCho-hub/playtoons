import { getPostCategoryListFromServer } from '@/services/dashboardService';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import Select from './Select';

/**
*
   <Category 
    name={'categoryId'}
    className={'select1 wid1'}
    typeId={stateType?.id} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Category(props, ref) {
  const {name, className, typeId, selected, handleClickItem, disabled, disabledText} = props;
  const [stateTypeId, setStateTypeId] = useState(typeId);
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const refSelect = useRef();

  const getCategory = async () => {
    const {status, data} = await getPostCategoryListFromServer(stateTypeId);
    
    if( status === 200 ){
      setStateList( data?.categories );
    }
    else{
      setStateError( String(status, data) );
    }
  };


  useEffect(() => {
    if( selected !== undefined ){
      refSelect.current.setSelected(selected);
    }
  }, [stateList]);

  useEffect(() => {
    setStateTypeId(typeId);
  }, [typeId]);

  useEffect(() => {
    if( stateTypeId !== undefined ){
      getCategory();
    }
  }, [stateTypeId]);

  return (
    <>
      <Select
        ref={refSelect}
        name={name}
        className={`${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem} 
        selected={selected}
        disabled={disabled}
        disabledText={disabledText}
        />

      <ErrorMessage error={stateError} />
    </>
  );
}
