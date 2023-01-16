import Image from "@/components/dashboard/Image";
import React from "react";

export default function Purchase(props){
  const { item } = props;

  return (
    <tr>
      <td className="hide-m">{item.id}</td>
      <td className="td_imgs2">
        <div className="cx_thumb">
          <span>
            <Image hash={item?.image} />
          </span>
        </div>
      </td>
      <td className="td_subject">{item?.title}</td>
      <td className="td_number3">{item?.price}</td>
      <td className="td_txt1">
        <span className="view-m">販売開始日：</span>{item?.date}
      </td>
      <td className="td_btns2 et_botm1">
        <div className="d-ib">
          <a href="#" className="btn-pk s blue2">
            <span>レビュー</span>
          </a>
          <a href="#" className="btn-pk s blue">
            <span>お問合せ</span>
          </a>
        </div>
      </td>
    </tr>
  );
};

