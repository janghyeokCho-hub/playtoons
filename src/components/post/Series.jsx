import { getPostTypeListFromServer } from "@/services/dashboardService";
import { getPostSeriesMine as getPostSeriesMineFromServer } from "@/services/postService";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "@COMPONENTS/dashboard/Select";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Series
    name={'seriesId'}
    className={'select1 wid1'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Series(props, ref) {
  const {name, className, callback} = props;
  const [stateList, setStateList] = useState(undefined);
  const myAuthors = useSelector( ({post}) => post?.authorMine?.authors );

  const getSelectedItem = (option) => {
    const id = option.getAttribute('value');
    let selected = undefined;
    for( let i = 0; i < stateList.length; i++ ){
      if( stateList[i].id === id ){
        selected = stateList[i];
        break;
      }
    }
    return selected;
  };

  const getSeries = async () => {
    let form = new FormData();
    form.append( 'authorId', myAuthors[0].id );
    const {status, data} = await getPostSeriesMineFromServer(form);
    
    if( status === 200 ){
      setStateList( data?.series );
      callback?.(data.series[0]);
    }
    else{
      //error 처리
    }
  };

  const handleClickItem = (option) => {
    callback?.( getSelectedItem(option) );
  };


  useEffect(() => {
    getSeries();
  }, []);

  return (
    <>
      <Select 
        name={name}
        className={`${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem}
        />
    </>
  );
}