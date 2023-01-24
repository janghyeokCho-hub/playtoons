import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setContainer } from "@/modules/redux/ducks/container";
import Search from "@COMPONENTS/search/Search";
import Store from "@COMPONENTS/search/Store";
import { setSearch } from "@/modules/redux/ducks/search";

const App = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectTab, setSelectTab] = useState("SEARCH");

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container search",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: null,
      isDetailView: false,
      activeMenu: null,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  useEffect(() => {
    if (params?.keyword) {
      dispatch(setSearch(params?.keyword));
    }
  }, [dispatch, params.keyword]);
  return (
    <>
      <div className="hd_tabbox">
        <div className="tabs ty1">
          <ul className="inr-c">
            <li
              className={selectTab === "SEARCH" ? "on" : ""}
              onClick={() => setSelectTab("SEARCH")}
            >
              <Link to="">
                <span>探索</span>
              </Link>
            </li>
            <li
              className={selectTab === "STORE" ? "on" : ""}
              onClick={() => setSelectTab("STORE")}
            >
              <Link to="">
                <span>マケットプレイス</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {selectTab === "SEARCH" && <Search />}
      {selectTab === "STORE" && <Store />}
    </>
  );
};

export default App;
