import { getDateYYYYMMDD, getDateYYYYMMDDHHmm as getDateYYYYMMDDhhmm, showOneButtonPopup, showTwoButtonPopup } from "@/common/common";
import ArrowRightView from "@/components/dashboard/ArrowRightView";
import Image from "@/components/dashboard/Image";
import { hideModal } from "@/modules/redux/ducks/modal";
import { deleteShopReviewIdToServer } from "@/services/mypageService";
import {
  faShare,
  faStar
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";

export default function Review(props){
  const { item, callback } = props;
  const [ stateRoate, setStateRotate ] = useState(false);
  const dispatch = useDispatch();

  const deleteReview = async () => {
    const {status, data} = await deleteShopReviewIdToServer(item.id);
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
    showTwoButtonPopup(dispatch, `${item.id}のレビューを削除しますか？`, () => deleteReview(), null, "削除");
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
        <td className="td_subject">
          <span className="">
            {
              item.authorResponse && 
              <></>
                // <span className="btn-pk s blue2">回答</span>
            }
            {` ${item.product.name || '大学のリンゴ一個の重さで10メートルの'}`}
          </span>
        </td>
        <td className="td_star">
          <div className="t_star">
            <span className={`s${item.reviewScore || 0}`}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </td>
        <td className="td_txt0">
          <span className="view-m">販売開始日：</span>{getDateYYYYMMDD(item.startAt)}
        </td>
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
              <span>{getDateYYYYMMDDhhmm(item.respondedAt)}時</span>
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

