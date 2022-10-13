import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import "@/css/test.css";
import { useRef } from "react";

/**
* Dropdown 리스트를 만든다
* ex) 
      const typeDataList = {
        "result": 0,
        "types": [
          {
            "id": "1",
            "code": "webtoon",
            "name": "ウェブトゥーン"
          },
        ]
      };
      <Dropdown 
        name={'typeId'}
        className={''}
        dataList={typeDataList} 
        selected={selectedItem} 
        handleItemClick={handleItemClick}/>
* @version 1.0.0
* @author 이현국
* @param dataList 아이템 리스트
* @param selected 선택된 아이템
*/
function Dropdown(props, ref) {
  const { name, dataList, selected, className, handleItemClick } = props;
  const [ isShowDropdown, setShowDropdown ] = useState(false);
  const [ stateSelectedItem, setSelectedItem ] = useState(undefined);
  const refInput = useRef();

  const handleToggle = () => {
    if (dataList !== undefined && dataList.length > 0) {
      setShowDropdown(!isShowDropdown);
    }
  };

  const handleOptionClicked = (item) => () => {
    setSelectedItem(item);
    setShowDropdown(false);
    refInput.current.value = item.id;
    handleItemClick?.(item);
  };

  const renderLiElements = () => {
    return dataList?.map((item, index) => {
      return (
        <li 
          key={index} 
          value={item.id}
          onClick={handleOptionClicked(item)} >
            <a href="#">
              { item.name }
            </a>
        </li>
      );
    });
  };

  useEffect(() => {
    //select 아이템 
    setSelectedItem(
      dataList?.map((item, index) => {
        return selected?.id === item?.id && item;
      })
    );
  }, []);

  return (
    <>
      <div className={`btn_select1 ${className}`}>
        <button
          type="button"
          className="select_tit"
          onClick={handleToggle} 
          >
          {stateSelectedItem?.name}
        </button>
        <div
          className={`select_list dropdown_ani dropdown_div ${isShowDropdown ? 'dropdown_on' : 'dropdown_close'}`}
          
        >
          <ul>
            {
              renderLiElements()
            }
          </ul>
        </div>

        <input ref={refInput} type='hidden' name={name} />
      </div>
    </>
  );
}

export default forwardRef(Dropdown);
