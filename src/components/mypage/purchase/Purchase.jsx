import { getDateYYYYMMDD, getStringOfPrice, handleClickStopPropagation } from "@/common/common";
import Image from "@/components/dashboard/Image";
import React from "react";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Purchase(props){
  const { item } = props;
  const navigate = useNavigate();

  const handleClickItem = useCallback((event) => {
    
    navigate(`/purchase/detail/${item.id}`);
  }, [item]);

  return (
    <tr onClick={handleClickItem}>
      <td className="hide-m">{item.id}</td>
      <td className="td_imgs2">
        <div className="cx_thumb">
          <span>
            <Image hash={item?.thumbnailImage} />
          </span>
        </div>
      </td>
      <td className="td_subject">{item?.name}</td>
      <td className="td_number3">{getStringOfPrice(item?.price)}</td>
      <td className="td_txt1">
        <span className="view-m">販売開始日：</span>{getDateYYYYMMDD(item.startAt, "/")}
      </td>
      <td className="td_btns2 et_botm1">
        <div className="d-ib">
          <Link to={`/mypage/review/${item.id}`} className="btn-pk s blue2" onClick={handleClickStopPropagation}>
            <span>レビュー</span>
          </Link>
          <Link to={`/mypage/inquiry/${item.id}`} className="btn-pk s blue" onClick={handleClickStopPropagation}>
            <span>お問合せ</span>
          </Link>
        </div>
      </td>
    </tr>
  );
};

