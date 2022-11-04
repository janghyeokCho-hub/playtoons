import React, { useEffect, useMemo } from 'react';
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
    page={stateData?.meta.page}
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
  const { className, meta, callback, page } = props;
  const [ statePage, setStatePage] = useState(page);


  const pagination = useMemo(() => {
    if (meta) {
      const { currentPage, totalPages, itemCount } = meta;
      let pageList = [];
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }

      const prev = currentPage - 1;
      const prevPage = prev - 1;
      const next = currentPage + 1;
      const nextPage = next + 1;

      let showPages;
      if (currentPage === 1) {
        if (totalPages === 0) {
          showPages = [1];
        } else {
          showPages = pageList.splice(prev, 3);
        }
      } else if (currentPage === totalPages) {
        showPages = pageList.splice(currentPage - 3, 3);
      } else {
        showPages = pageList.splice(currentPage - 2, 3);
      }

      return (
        <>
          {prevPage > 0 && (
            <li
              className="prev"
              onClick={() => callback?.(prevPage)}
            >
              <a href="#">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </li>
          )}
          {showPages &&
            showPages.map((page, index) => (
              <li
                key={`page_${index}`}
                className={`${page === currentPage ? "on" : ""}`}
                onClick={() => callback?.( page)}
              >
                <a href="#">{page}</a>
              </li>
            ))}

          {itemCount > 0 && totalPages - nextPage > 0 && (
            <li
              className="next"
              onClick={() => callback?.( nextPage)}
            >
              <a href="#">
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </li>
          )}
        </>
      );
    } else {
      return <></>;
    }
  }, [meta]);


  const handleChange = (page) => {
    setStatePage(page);
    callback?.(page);
  };

  useEffect(() => {
    setStatePage(page);
  }, [page]);

  

  return (
    <>
      {/* {
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

      } */}
      <div className="pagenation">
        <ul>{pagination}</ul>
      </div>
    </>
  )
}
