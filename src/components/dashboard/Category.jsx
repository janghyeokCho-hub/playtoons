import { getPostCategoryListFromServer } from '@/services/dashboardService';
import React, { useEffect } from 'react';
import { useState } from 'react';
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
        className={`${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem} />
    </>
  );
}