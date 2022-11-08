import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko, ja, es } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import Purchase from "./Purchase";

const PurchaseItems = () => {
  //ico_calender.svg
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>購入期限</strong>
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
            <col className="wid4" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>価格</th>
              <th>日時</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Purchase />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseItems;
