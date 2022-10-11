import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { useState } from 'react';
import { useRef } from 'react';
import { setTagToServer } from '@/services/dashboardService';
import { useImperativeHandle, forwardRef } from 'react';
import { removeItemInList } from '@/common/common';

//test 
import '@/css/test.css';

/**
* Tag Component
   <Tag 
    ref={refTag}
    name={"tags"}
    className={"inp_txt sch"}
    placeholder={text.tag_name} />
*
* @version 1.0.0
* @author 2hyunkook
* @param className
* @param placeholder
* @return
*/
export default forwardRef( function Tag(props, ref) {
  const { placeholder, className, name } = props;
  const [ stateList, setStateList ] = useState([]);
  const refInput = useRef();
  const refContainer = useRef();
  

  const checkExistInStateList = (keyword) => {
    for(let i = 0; i < stateList?.length; i++){
      if( stateList[i] === keyword ){
        return true;
      }
    }

    return false;
  };


  //==============================================================================
  // api
  //==============================================================================

  const setTag =  async (keyword) => {
    const params = {
      'name' : keyword
    };
    
    const {status, data: result} = await setTagToServer(JSON.stringify(params));
    console.log('setTag', status, result);
    
    //409 이미 태그가 존재함.
    if( status === 201 || status === 409 ){
      //태그 state에 추가
      setStateList([
        ...stateList,
        `${keyword}`
      ]);
    }
    else{
      
    }
  };


  //==============================================================================
  // handle event
  //==============================================================================

  const handleFocus = (event) => {
    refContainer.current.classList.add("input_focus");
  };
  
  const handleBlur = (event) => {
    refContainer.current.classList.remove("input_focus");
  };

  const handleClickItem = (event) => {
    console.log('Item', event);
    const tag = event.target.getAttribute('data-id');
    setStateList( removeItemInList(stateList, tag) );
  };

  const handleClickSearch = (event) => {
    const keyword = refInput.current.value;

    //list에서 같은 값이 있는지 확인
    if( checkExistInStateList(keyword) === false ){
      //태그 검색
      setTag(keyword);
    }
    else{
      console.log("동일한 태그가 있습니다.");
    }
  };

  const handleEnter = (event) => {
    if( event.keyCode === 13 ){
      handleClickSearch?.(event);
      event.preventDefault();
    }
  };

  //==============================================================================
  // render & hook
  //==============================================================================

  const renderTagList = () => {
    return stateList?.map( (item, index) => {
      return <div className="i_tag mt10 pointer" key={index} onClick={handleClickItem} data-id={item}>#{item}</div>
    });
  };

  useImperativeHandle(ref, () => ({
    getTagList: () => {
      return stateList;
    },
    getTagsJsonObject: () => {
      let json = [];

      stateList.forEach((item) => {
        json.push(item);
      });

      return json;
    },
  }));

  return (
    <>
      <div className={className} ref={refContainer}>
        <button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClickSearch} /></button>
        <input ref={refInput} type="text" className="" name={name} placeholder={placeholder} onKeyDown={handleEnter} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
      <div className="txt1">
        <div className="lst_tag">
          {
            renderTagList()
          }
        </div>
      </div>
    </>
  );
})
