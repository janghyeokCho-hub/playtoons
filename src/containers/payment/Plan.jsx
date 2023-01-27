import { getDateYYYYMMDD, getStringOfPlaycoin, showOneButtonPopup } from "@/common/common";
import { PAYMENT_METHOD } from "@/common/constant";
import ImageBackground from "@/components/dashboard/ImageBackground";
import PaymentMethod from "@/components/payment/PaymentMethod";
import { getAuthorBalanceFromServer, setPaymentSubscribeToServer } from "@/services/paymentService";
import { faAngleLeft, faShare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default  function Plan(){
  const [ stateMethod, setStateMethod ] = useState(PAYMENT_METHOD.point);
  const [ stateIsMonthly, setStateIsMonthly ] = useState(false);
  const [ stateDate, setStateDate ] = useState(new Date());
  const [ stateBalance, setStateBalance ] = useState(undefined);
  const reduxItem = useSelector(({payment}) =>  payment.planItem);
  const reduxAuthors = useSelector(({post}) =>  post.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //==============================================================================
  // function
  //==============================================================================
  const getTotalPrice = () => {
    //쿠폰
    const tempCoupon = "0";
    if( Number.isNaN(reduxItem.plan.price) && Number.isNaN(tempCoupon)  ){
      console.error('Price must be type of number');
    } else {
      return parseInt(reduxItem.plan.price) - parseInt(tempCoupon);
    }
  };

  const getPaymentAtNext = () => {
    const tempDate = new Date(stateDate);
    return getDateYYYYMMDD( tempDate.setMonth(stateDate.getMonth() + (stateIsMonthly ? 12 : 1)) );
  };
  //==============================================================================
  // api
  //==============================================================================

  const getAuthorBalance = async () => {
    const {status, data} = await getAuthorBalanceFromServer(reduxAuthors[0].id);
    console.log('getAuthorBalance', status, data);
    
    if( status === 200 ){
      setStateBalance(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  const setPaymentSubscribe = async (id) => {
    const json = {
      subscribeTierId: id,
      type: "none"
    };
    const {status, data} = await setPaymentSubscribeToServer(json);
    console.log('getAuthorBalance', status, data);
    
    if( status === 200 ){
      
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  //==============================================================================
  // handler
  //==============================================================================

  const handleChangeCheck = () => {
    setStateIsMonthly(!stateIsMonthly);
  };

  const handleChangeCharge = (method) => {
    setStateMethod(method);
  };

  const handleClickCharge = useCallback((e) => {
    console.log('charge', stateMethod);

    navigate(`/payment/charge`);
    
  }, [reduxItem, stateMethod]);

  const handleClickPayment = useCallback(() => {
    setPaymentSubscribe(reduxItem.plan.id);
  }, [reduxItem, stateMethod]);

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    getAuthorBalance();
  }, []);

  //==============================================================================
  // render
  //==============================================================================


  return (
    <div className="contents">
      <div className="inr-c">
        <div className="head_con view-m">
          <button type="button" className="btn_back">
            <span className="icon">
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </button>
          <button type="button" className="btn_share">
            <span className="icon">
              <FontAwesomeIcon icon={faShare} />
            </span>
          </button>
        </div>

        <div className="hd_titbox2 hide-m">
          <h2 className="m_tit1">注文内容を確認</h2>
        </div>

        <div className="cont_payment">
          <div className="area_payment">
            <div className="titbox view-m">
              <p className="h1">
                <strong>大学のリンゴ一個の重さで10メートルの素材</strong>
              </p>
              <p className="t1">注文番号 : 48493A321F312</p>
            </div>

            <div className="box_thumb">
              <div className="thumb">
                <ImageBackground className="plan" hash={reduxItem.plan.thumbnailImage} />
              </div>
              <div className="txt">
                <p className="h1">{reduxItem.plan.name}</p>
                <div className="t_profile">
                  <ImageBackground
                    className="im"
                    hash={reduxItem.author.profileImage}
                  />
                  <p>{reduxItem.author.name || reduxItem.author.nickname}</p>
                </div>
                <p className="c1">{getStringOfPlaycoin(reduxItem.plan.price)}</p>
              </div>
            </div>
          </div>

          {/* 2023.01.19 현재 쿠폰 비표시 */}
          {/* <div className="area_payment">
            <h2 className="tit1">クーポン使用</h2>
            <div className="col">
              <h3 className="tit2">クーポン選択</h3>
              <select name="" id="" className="select1 w100p">
                <option value="">使用可能なクーポン1枚</option>
              </select>
            </div>
            <div className="col">
              <h3 className="tit2">クーポンコードを入力</h3>
              <div className="inp_btn">
                <input
                  type="text"
                  className="inp_txt w100p"
                  placeholder="クーポンコードを入力"
                />
                <button type="button" className="btn-pk n blue2">
                  適用する
                </button>
              </div>
            </div>
          </div> */}

          <PaymentMethod 
            className={"pay"}
            item={reduxItem}
            method={stateMethod}
            balance={stateBalance}
            onClick={handleClickCharge}
            onChange={handleChangeCharge}
            />

          <div className="area_payment total">
            <h2 className="tit1 view-m">お支払い金額</h2>
            <ul className="col list2">
              <li>
                <span>支援期限</span>
                <span>{getDateYYYYMMDD(stateDate)} ~ {getDateYYYYMMDD(getPaymentAtNext())}</span>
              </li>
              <li>
                <span>次回のお支払い</span>
                <span>{getDateYYYYMMDD(getPaymentAtNext())}</span>
              </li>
            </ul>
            <ul className="col list1">
              <li>
                <span>金額</span>
                <span>{getStringOfPlaycoin(reduxItem.plan.price)}</span>
              </li>
              {/* 쿠폰 사용시 오픈 */}
              {/* <li>
                <span>クーポン割引</span>
                <span>-123,456PC</span>
              </li> */}
            </ul>
            <div className="col ta-c">
              <p className="tit2 hide-m">次の金額をお支払いします。</p>
              <p className="c1">
                <span className="view-m">合計金額</span>
                <span>{ getStringOfPlaycoin(getTotalPrice()) }</span>
              </p>

              {/*<!-- 1. 모바일에서 안보임 -->*/}
              <label className="inp_checkbox hide-m">
                <input type="checkbox" defaultChecked={stateIsMonthly} onChange={() => handleChangeCheck()} />
                <span>毎月のお支払いに同意します。</span>
              </label>
              <button type="button" className="btn-pk n blue w100p hide-m" onClick={handleClickPayment}>
                <span>お支払い</span>
              </button>
            </div>
          </div>

          <div className="btn-bot view-m">
            {/*<!-- 1. 모바일에서 위치변경 -->*/}
            <label className="inp_checkbox">
              <input type="checkbox" defaultChecked={stateIsMonthly} onChange={() => handleChangeCheck()} />
              <span>毎月のお支払いに同意します。</span>
            </label>
            <button type="button" className="btn-pk n blue w100p" onClick={handleClickPayment}>
              <span>お支払い</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

