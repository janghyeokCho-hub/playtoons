import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faShare } from "@fortawesome/pro-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteShopInquiryIdToServer, deleteShopReviewIdToServer } from "@/services/mypageService";
import { hideModal } from "@/modules/redux/ducks/modal";
import { getDateYYYYMMDD, getDateYYYYMMDDHHmm, showOneButtonPopup, showTwoButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import ArrowRightView from "@/components/dashboard/ArrowRightView";

export default function Inquiry(props){
  const { item, callback } = props;
  const [ stateRoate, setStateRotate ] = useState(false);
  const dispatch = useDispatch();

  const deleteReview = async () => {
    const {status, data} = await deleteShopInquiryIdToServer(item.id);
    console.log('deleteReview', status, data);
    
    dispatch( hideModal() );
    if( status === 200 ){
      callback?.(item);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  const handleArrow = (event) => {
    setStateRotate(!stateRoate);
  };

  const handleDelete = (event) => {
    showTwoButtonPopup(dispatch, `${item.id}のお問合せを削除しますか？`, () => deleteReview(), null, "削除");
  };

  return (
    <>
      <tr className="tr_q">
        <td className="hide-m">{item.id}</td>
        <td className="td_imgs2">
          <div className="cx_thumb">
            <span>
              <Image hash={item.product.thumbnailImage} />
            </span>
          </div>
        </td>
        <td className="td_subject">{item.product.name}</td>
        <td className="td_txt0 t-dot">
          <span className="view-m">作成者 : </span>
          {item.account.name || item.account.email}
        </td>
        <td className="td_txt0">{getDateYYYYMMDD(item.startAt)}</td>
        <td className="td_btns2 ta-r et_botm1">
          <div className="d-ib">
            <div className="btn-pk s blue2 mw100p" onClick={handleDelete}>
              <span>削除</span>
            </div>
          </div>
        </td>
        <td className="hide-m ta-c">
        <button type="button" className="arr" onClick={handleArrow}>
            <ArrowRightView rotate={stateRoate}  />
          </button>
        </td>
      </tr>
      {/* 작가 응답 */}
      <tr className="tr_a" style={{display: `${stateRoate ? 'table-row' : 'none'}`}}>
        <td className="hide-m"></td>
        <td colSpan="5" className="ta-l">
          <div className="tx_a1" style={{borderBottomStyle: `${item.authorResponse ? 'solid' : 'none'}`}}>
            <button
              type="button"
              className="arr view-m"
              onClick={handleArrow}
            ></button>
            <p className="t1">
              {item.content}
            </p>
          </div>
          <div className="tx_a2" style={{display: `${item.authorResponse && stateRoate ? 'block' : 'none'}`}}>
            <span className="re view-m">
              <FontAwesomeIcon icon={faShare} />
            </span>
            <p className="t2">
              <span className="i-txt">販売者</span>
              <span>{getDateYYYYMMDDHHmm(item.respondedAt)}時</span>
            </p>
            <p className="t1">
            {item.authorResponse}
            </p>
          </div>
        </td>
        <td className="hide-m ta-c"></td>
      </tr>
    </>
  );
};

