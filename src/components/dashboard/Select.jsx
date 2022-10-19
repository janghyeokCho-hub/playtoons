import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

/**
*
  <Select 
    name={"typeId"}
    className={"select1 wid1"}
    dataList={stateTypeList}
    disabled={true}
    disabledText={"編集不可"}
    selected={item.code}
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
export default forwardRef( function Select(props, ref) {
  const {name, className, dataList, disabled, handleItemClick, disabledText } = props;
  const [stateDisabled, setStateDisabled] = useState(false);
  const refSelect = useRef();

  const getName = (item) => {
    return item.name === undefined ? item.title : item.name;
  };

  const getOptionElements = () => {
    return dataList?.map((item, index) => {
      return <option key={index} value={item.id} >{getName(item)}</option>;
    });
  };

  const handleClickSelect = () => {
    const select = refSelect.current;
    
    handleItemClick?.(select.options[select.selectedIndex]);
  };

  // ref.current로 접근하여 사용
  useImperativeHandle(ref, () => ({
    setSelected: (id) => {
      const select = refSelect.current;
      if( select !== null ){
        dataList?.map((item, index) => {
          if( item.id === id ){
            select.selectedIndex = index;
            select.options[index].setAttribute("selected", true);
            return index;
          }
        });
      }
    }
  }));

  useEffect(() => {
    setStateDisabled(disabled);
  }, []);

  return (
    <>
      {
        stateDisabled ? 
          <select name={name} id={name} className={className} disabled>
            <option value="">{disabledText}</option>
          </select>
        : 
          <select ref={refSelect} name={name} id={name} className={className} onChange={handleClickSelect} >
            {
              getOptionElements()
            }
          </select>
      }
    </>
  );
} );
