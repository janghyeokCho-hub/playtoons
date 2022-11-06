import React, { useRef, useState } from "react";
import styled from "styled-components";
import All from "@COMPONENTS/store/All";
import AssetSchool from "@COMPONENTS/store/AssetSchool";
import API from "@COMPONENTS/store/API";
import SearchPopup from "@COMPONENTS/SearchPopup";

const Store = () => {
  const [selectTab, setSelectTab] = useState("TAB1");
  const [searchText, setSearchText] = useState(null);
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <div className="contents">
      <div className="tab_imgs">
        <ul className="inr-c">
          <li
            className={selectTab === "TAB1" ? "on" : ""}
            onClick={() => setSelectTab("TAB1")}
          >
            <ImgA href="#" bgImg={require("@IMAGES/img_tab1.png")}>
              <span>すべて</span>
            </ImgA>
          </li>
          <li
            className={selectTab === "TAB2" ? "on" : ""}
            onClick={() => setSelectTab("TAB2")}
          >
            <ImgA href="#" bgImg={require("@IMAGES/img_tab2.png")}>
              <span>텍스트확인</span>
            </ImgA>
          </li>
          <li
            className={selectTab === "TAB3" ? "on" : ""}
            onClick={() => setSelectTab("TAB3")}
          >
            <ImgA href="#" bgImg={require("@IMAGES/img_tab3.png")}>
              <span>ePub</span>
            </ImgA>
          </li>
          <li
            className={selectTab === "TAB4" ? "on" : ""}
            onClick={() => setSelectTab("TAB4")}
          >
            <ImgA href="#" bgImg={require("@IMAGES/img_tab3.png")}>
              <span>API</span>
            </ImgA>
          </li>
        </ul>
      </div>
      {isSearchPopupShow && (
        <SearchPopup
          handleClose={() => setIsSearchPopupShow(!isSearchPopupShow)}
          onSearch={handleSearch}
        />
      )}
      {selectTab === "TAB1" && (
        <All openSearch={() => setIsSearchPopupShow(true)} />
      )}
      {selectTab === "TAB2" && (
        <AssetSchool openSearch={() => setIsSearchPopupShow(true)} />
      )}

      {selectTab === "TAB4" && <API />}
    </div>
  );
};

const ImgA = styled.a`
  background-image: url(${(props) => props.bgImg});
`;

export default Store;
