import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

/**
*
   <Select 
    name={"typeId"}
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
  const {name, dataList, disabled, handleItemClick, disabledText } = props;
  const [stateDisabled, setStateDisabled] = useState(false);
  const refSelect = useRef();

  const getOptionElements = () => {
    return dataList?.map((item, index) => {
      return <option key={index} value={item.code} >{item.name}</option>;
    });
  };

  const handleClickSelect = () => {
    const select = refSelect.current;
    
    handleItemClick?.(select.options[select.selectedIndex]);
  };

  // ref.current로 접근하여 사용
  useImperativeHandle(ref, () => ({
    setSelected: (code) => {
      const select = refSelect.current;
      
      dataList?.map((item, index) => {
        if( item.code === code ){
          select.selectedIndex = index;
          select.options[index].setAttribute("selected", true);
          return index;
        }
      });
    }
  }));

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
          <select ref={refSelect} name={name} id={name} className="select1 wid1" onChange={handleClickSelect} >
            {
              getOptionElements()
            }
          </select>
      }
    </>
  );
} );