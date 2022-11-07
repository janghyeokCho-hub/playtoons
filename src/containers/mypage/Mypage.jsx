import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PurchaseItems from "@COMPONENTS/mypage/purchase/PurchaseItems";
import ReviewItems from "@COMPONENTS/mypage/review/ReviewItems";
import InquiryItems from "@COMPONENTS/mypage/inquiry/InquiryItems";

const Mypage = () => {
  const location = useLocation();
  const type = location.state?.type;
  const [selectTab, setSelectTab] = useState(type || "PURCHASE");
  return (
    <>
      <div className="hd_tabbox">
        <div className="tabs ty1">
          <ul className="inr-c">
            <li
              className={selectTab === "PURCHASE" ? "on" : ""}
              onClick={() => setSelectTab("PURCHASE")}
            >
              <Link to="">
                <span>購入一覧</span>
              </Link>
            </li>
            <li
              className={selectTab === "REVIEW" ? "on" : ""}
              onClick={() => setSelectTab("REVIEW")}
            >
              <Link to="">
                <span>レビューリスト</span>
              </Link>
            </li>
            <li
              className={selectTab === "INQUIRY" ? "on" : ""}
              onClick={() => setSelectTab("INQUIRY")}
            >
              <Link to="">
                <span>お問合せ一覧</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {selectTab === "PURCHASE" && <PurchaseItems />}
      {selectTab === "REVIEW" && <ReviewItems />}
      {selectTab === "INQUIRY" && <InquiryItems />}
    </>
  );
};

export default Mypage;
