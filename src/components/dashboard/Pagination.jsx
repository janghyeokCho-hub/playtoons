import React, { useEffect } from 'react';
import { useState } from 'react';
import '@/css/test.css';          //test 용 css 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/pro-solid-svg-icons';

/**
*
   pagination component

  const handleClickPage = (pageNumber) => {
    navigate(`/dashboard/series/${pageNumber}`);
  };
   
  <Pagination 
    itemsPerPage={stateData.meta.itemsPerPage} 
    totalPages={stateData.meta.totalPages}
    currentPage={stateData.meta.currentPage} 
    handle={handleClickPage} />
*
* @version 1.0.0      현재 테스트용으로 tpagination 클래스 적용 test.css 에 class 정의
* @author 2hyunkook
* @param itemsPerPage limit ex) 10
* @param totalPages   총 페이지 수 ex) 10
* @param currentPage  현재 페이지 ex) 1
* @param handle       페이지 이동 이벤트 처리 func
* @return
*/
export default function Pagination(props) {
  const [statePage, setStatePage] = useState(null);
  const { handle } = props;

  const handleClickPage = (event) => {
    const pageNumber = parseInt( event.currentTarget.getAttribute('value') );

    //현재 페이지 이벤트, 1번 페이지 left 이벤트, 마지막 페이지 right 이벤트 제거
    if( pageNumber === statePage?.currentPage || pageNumber === 0 || pageNumber > statePage?.totalPages ){
      return;
    }

    handle?.(pageNumber);
  };
  
  const getElements = () => {
    let list = [];

    //push arrow left
    list.push(
      <li 
        key={'left'} 
        className={`tpagination ${statePage?.currentPage === 1 ? 'disable' : 'arrow'}`} 
        value={`${statePage?.currentPage - 1}`}
        onClick={handleClickPage} >
          <FontAwesomeIcon icon={faAngleLeft} />
      </li>
    );
    
    for( let i = 1; i < statePage?.totalPages + 1; i++  ){
      list.push(
        <li 
        key={i} 
        className={`tpagination ${i === statePage.currentPage && 'current'}`} 
        value={`${i}`} 
        onClick={handleClickPage} >
          { i }
        </li> 
      );     
    }

    //push arrow right
    list.push(
      <li 
        key={'right'} 
        className={`tpagination ${statePage?.currentPage === statePage?.totalPages ? 'disable' : 'arrow'}`} 
        value={`${statePage?.currentPage + 1}`}
        onClick={handleClickPage} >
          <FontAwesomeIcon icon={faAngleRight} />
      </li>
    );
    return list;
  };

  useEffect(() => {
    setStatePage({
      ...props
    });
  }, []);
  

  return (
    <ul className='tpagination'>
      {
        getElements()
      }
    </ul>
  )
};
