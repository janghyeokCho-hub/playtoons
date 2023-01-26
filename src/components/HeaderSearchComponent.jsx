import { setDim } from '@/modules/redux/ducks/dim';
import {
  faCircleXmark, faMagnifyingGlass
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeaderSearchComponent(props) {
  const { isMobile } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { isShow } = useSelector(({ dim }) => dim);

  const handleChange = useCallback(() => {
    dispatch(setDim({ dimType: "SEARCH", isShow: !isShow }));
  }, [dispatch, isShow]);

  const handleEnter = useCallback(() => {
    navigate(`/search/${searchRef?.current?.value}`);
  }, [navigate, searchRef]);

  const handleSearchTextClear = useCallback(() => {
    if (searchRef?.current) {
      searchRef.current.value = "";
      handleSearchTextFocus();
    }
  }, [searchRef]);

  const handleSearchTextFocus = useCallback(() => {
    if (searchRef?.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  return (
    <>
      {(isMobile && (
        <>
          {isShow && (
            <div className={`box_hd_sch ${isShow ? "open" : ""}`}>
              <input
                ref={searchRef}
                type="text"
                className="inp_txt"
                placeholder={t(`header.searchPlaceholder`)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleEnter();
                  }
                }}
              />
              <button
                type="button"
                className="btn_hd_del"
                onClick={handleSearchTextClear}
              >
                <span>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
              </button>
              {/*<!-- 삭제버튼 추가 -->*/}
              <button type="button" className="btns" onClick={handleChange}>
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </button>
            </div>
          )}
        </>
      )) || (
        <div className="box_hd_sch">
          <input
            ref={searchRef}
            type="text"
            className="inp_txt"
            placeholder={t(`header.searchPlaceholder`)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleEnter();
              }
            }}
          />
          <button
            type="button"
            className="btn_hd_del"
            onClick={handleSearchTextClear}
          >
            <span>
              <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </button>
          {/*<!-- 삭제버튼 추가 -->*/}
          <button
            type="button"
            className="btns"
            onClick={handleSearchTextFocus}
          >
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </button>
        </div>
      )}

      <button
        type="button"
        className="mo_btns view-m"
        onClick={() => handleChange()}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </>
  );
}
