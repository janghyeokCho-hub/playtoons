import { faAngleLeft, faAngleRight } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';

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
      //전체 페이지 수 구하기
      let pageList = [];
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }

      const prev = currentPage - 1;
      const prevPage = prev - 1;
      const next = currentPage + 1;
      const nextPage = next + 1;
      const SHOW_PAGE_NUMBER = 3;

      //화면에 보여질 페이지 숫자 리스트 구하기
      let showPages;
      if (currentPage === 1) {
        if (totalPages === 0) {
          showPages = [1];
        } else {
          showPages = pageList.splice(prev, 3);
        }
      } else if (currentPage === totalPages) {
        if( totalPages <= SHOW_PAGE_NUMBER ){
          showPages = pageList;
        }
        else{
          showPages = pageList.splice(currentPage - 3, SHOW_PAGE_NUMBER);
        }
      } else {
        showPages = pageList.splice(currentPage - 2, SHOW_PAGE_NUMBER);
      }

      return (
        <>
          {prevPage > 0 && (
            <li
              className="prev"
              onClick={() => callback?.(prevPage)}
            >
              <div>
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
            </li>
          )}
          {showPages &&
            showPages.map((page, index) => (
              <li
                key={`page_${index}`}
                className={`${page === currentPage ? "on" : ""}`}
                onClick={() => callback?.( page)}
              >
                <div>{page}</div>
              </li>
            ))}

          {itemCount > 0 && totalPages - nextPage > 0 && (
            <li
              className="next"
              onClick={() => callback?.( nextPage)}
            >
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
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
