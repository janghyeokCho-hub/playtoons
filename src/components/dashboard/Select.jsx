import React, { useEffect } from 'react';
import { useState } from 'react';

/**
*
   <Select 
    name={"typeId"}
    dataList={stateTypeList}
    disabled={true}
    disabledText={"編集不可"}
    handleItemClick={handleItemClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param name parameter name
* @param dataList option list
* @param disabled disabled
* @param handleItemClick option click
* @return
*/
export default function Select(props) {
  const {name, dataList, disabled, handleItemClick, disabledText} = props;
  const [stateDisabled, setStateDisabled] = useState(false);

  const getOptionElements = () => {
    return dataList?.map((item, index) => {
      return <option key={index} value={item.code} >{item.name}</option>;
    });
  };

  const handleClickSelect = () => {
    const objSelect = document.getElementById(name);
    
    handleItemClick?.(objSelect.options[objSelect.selectedIndex]);
  };

  useEffect(() => {
    setStateDisabled(disabled);
  }, []);

  return (
    <>
      {
        stateDisabled ? 
          <select name={name} id={name} className="select1 wid1" disabled>
            <option value="">{disabledText}</option>
          </select>
        : 
          <select name={name} id={name} className="select1 wid1" onChange={handleClickSelect} >
            {
              getOptionElements()
            }
          </select>
      }
    </>
  );
}
