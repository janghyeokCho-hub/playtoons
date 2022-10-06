import { getPostCategoryListFromServer } from '@/services/dashboardService';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from './Select';

export default function Category(props, ref) {
  const {name, className, typeId, handleClickItem} = props;
  const [stateTypeId, setStateTypeId] = useState(typeId);
  const [stateList, setStateList] = useState(undefined);

  const getCategory = async () => {
    const {status, data} = await getPostCategoryListFromServer(stateTypeId);
    console.log('getCategory', stateTypeId, status, data);
    
    if( status === 200 ){
      setStateList( data?.categories );
    }
    else{
      
    }
    
  };


  useEffect(() => {
    setStateTypeId(typeId);
  }, [typeId]);

  useEffect(() => {
    getCategory();
  }, [stateTypeId]);

  return (
    <>
      <Select
        name={name}
        className={`select1 wid1 ${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem} />
    </>
  );
}
