import { getPostTypeListFromServer } from "@/services/dashboardService";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import ErrorMessage from "../dashboard/ErrorMessage";

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
export default forwardRef( function Type(props, ref) {
  const {name, callback, onClick, selected, disabled} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const [stateDisabled, setStateDisabled] = useState(undefined);
      

  //==============================================================================
  // function
  //==============================================================================
  const initCheckecInList = () => {
    stateList?.forEach((item, i) => {
      item.checked = false;
    });
  };

  const getChecked = (item) => {
    const tempId = selected === undefined ? 0 : selected;
    return item.id === tempId;
  };

  const setCheckedToList = (list) => {
    return list.map( (item, i) => {
      return {
        ...item,
        checked: getChecked(item)
      }
    } );
  };

  const setCheckedInItemToTypeId = (typeId) => {
    for( let i = 0; i < stateList.length; i++ ){
      const item = stateList[i];
      item.checked = typeId === stateList[i].id;
    }
  };

  const setSelectedInStateList = (typeId) => {
    const typeList = document.getElementsByName('typeId');
    typeList.forEach((item) => {
      item.checked = typeId === item.getAttribute('data-id');
    });
    for( let i = 0; i < typeList.length; i++ ){
    }

    setCheckedInItemToTypeId(typeId);
  };

  const setFristSelectedInStateList = () => {
    const typeList = document.getElementsByName('typeId');
    typeList.forEach((item) => {
      item.checked = '0' === item.getAttribute('data-index');
    });

    setCheckedInItemToTypeId( typeList[0].getAttribute('data-id') );
  };


  //==============================================================================
  // api
  //==============================================================================

  const getType = async () => {
    const {status, data} = await getPostTypeListFromServer();
    
    if( status === 200 ){
      setStateList( setCheckedToList(data?.types) );
    }
    else{
      //error 처리
      setStateError(data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================

  const handleClickItem = (event) => {
    if( stateDisabled ){
      event.preventDefault();
      return false;
    }

    initCheckecInList();
    const item = stateList[event.target.getAttribute('data-index')];
    item.checked = true;
    onClick?.( item );
  };

  //==============================================================================
  // hook & render
  //==============================================================================

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
          
          <span className={`${stateDisabled ? 'inp_disabled' : ''} ${item.checked ? 'inp_checked' : ''}`}>{item.name}</span>
        </label>
      );
    });
  };
  
  useImperativeHandle(ref, () => ({
    getTypeList: () => {
      return stateList;
    },
    setSelected: (typeItem) => {
      setStateDisabled(true);
      setSelectedInStateList(typeItem?.id);
    },
    setSelectedForEmptySeries: () => {
      setFristSelectedInStateList();
    },
    setDisabled: (disabled) => {
      setStateDisabled(disabled);
    },
  }));

  

  useEffect(() => {
    if( stateList !== undefined ){
      callback?.(stateList[0]);
    }
  }, [stateList]);

  useEffect(() => {
    setStateDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    getType();
  }, [selected]);


  return (
    <>
      {
        renderTypeListElements()
      }
      <ErrorMessage error={stateError} />
    </>
  );
})
