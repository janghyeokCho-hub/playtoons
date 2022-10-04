import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import "@/css/test.css";

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
        dataList={typeDataList} 
        selected={selectedItem} 
        handleItemClick={handleItemClick}/>
* @version 1.0.0
* @author 이현국
* @param dataList 아이템 리스트
* @param selected 선택된 아이템
*/
function Dropdown(props, ref) {
  const { dataList, selected } = props;
  const [ isShowDropdown, setShowDropdown ] = useState(false);
  const [ stateSelectedItem, setSelectedItem ] = useState(undefined);

  const handleToggle = () => {
    if (dataList !== undefined && dataList.length > 0) {
      setShowDropdown(!isShowDropdown);
    }
  };

  const handleOptionClicked = (item) => () => {
    setSelectedItem(item);
    setShowDropdown(false);

    props.handleItemClick?.(item);
  };

  const getLiElements = () => {
    return dataList?.map((item, index) => {
      return (
        <li 
          className="dropdown_li"
          key={index} 
          value={item.code}
          onClick={handleOptionClicked(item)} >
          { item.name }
        </li>
      );
    });
  };

  useEffect(() => {
    //select 아이템 
    setSelectedItem(
      dataList?.map((item, index) => {
        return selected?.code === item?.code && item;
      })
    );
  }, []);

  return (
    <div 
      className={"dropdown_container"}
      onClick={handleToggle}  >

      <FontAwesomeIcon
        icon={faChevronDown}
        className={"dropdown_down_ico"} />

      <div 
        className="dropdown_header"
        value={stateSelectedItem?.code}>
        {stateSelectedItem?.name}
      </div>
      {
        isShowDropdown === true && (
          <ul 
            className="dropdown_ul">
            {
              dataList !== undefined && getLiElements()
            }
          </ul>
        )
      }
    </div>
  );
}

export default forwardRef(Dropdown);
