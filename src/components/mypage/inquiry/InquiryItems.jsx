import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import { ko, ja, es } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import {
  faAngleRight,
  faShare,
  faStar,
} from "@fortawesome/pro-solid-svg-icons";
import Inquiry from "./Inquiry";

const InquiryItems = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>お問合せ期限</strong>
        </h2>

        <div className="inp_cal">
          <div>
            <label htmlFor="calendar_first1">開始日</label>
            <DatePicker
              locale={ko}
              className="inp_txt calendar datepicker_first"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label htmlFor="calendar_last1">終了日</label>
            <DatePicker
              locale={ko}
              className="inp_txt calendar datepicker_last"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>

      <div className="tbl_basic mtbl_ty1">
        <table className="list">
          <caption>목록</caption>
          <colgroup>
            <col className="num" />
            <col className="imgs2" />
            <col />
            <col className="wid4" />
            <col className="wid4" />
            <col className="wid3" />
            <col className="wid5 hide-m" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>販売者</th>
              <th>作成日</th>
              <th></th>
              <th className="hide-m"></th>
            </tr>
          </thead>
          <tbody>
            <Inquiry />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryItems;
