import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/pro-light-svg-icons';

/**
*
  const handleChange = (page) => {
    getPostList(page);
  };

  <Pagination
    className={''}
    page={stateData?.meta.currentPage}
    itemsCountPerPage={stateData?.meta.itemsPerPage}
    totalItemsCount={stateData?.meta.totalItems}
    callback={handleChange}
    />

*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Pagination1(props) {
  const { className, itemsCountPerPage, totalItemsCount, totalPages, callback, page } = props;
  const [ statePage, setStatePage] = useState(page);

  const handleChange = (page) => {
    setStatePage(page);
    callback?.(page);
  };

  useEffect(() => {
    setStatePage(page);
  }, [page]);
  

  return (
    <>
      {
        (totalPages !== undefined && totalPages > 1 ) &&
        <Pagination 
              activePage={statePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={10}
              prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
              nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
              innerClass={`pagination ${className}`}
              itemClassPrev={'arrow'}
              itemClassNext={'arrow'}
              itemClassFirst={'none'}
              itemClassLast={'none'}
              onChange={handleChange}
              />

      }
    </>
  )
}
