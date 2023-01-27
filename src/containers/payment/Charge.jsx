import { convertMoneyStyleString, getStringOfPriceWithCurrency } from '@/common/common';
import Button from '@/components/dashboard/Button';
import Checkbox from '@/components/payment/Checkbox';
import Coupon from '@/components/payment/Coupon';
import PaymentPrice from '@/components/payment/PaymentPrice';
import { setPaymentChargeAction } from '@/modules/redux/ducks/payment';
import { ReactComponent as StripeLogo } from '@IMAGES/stripe_logo.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function Charge() {
  const [ statePrice, setStatePrice ] = useState(undefined);
  const [ stateBalance, setStateBalance ] = useState(53200);
  const [ stateCoupon, setStateCoupon ] = useState(0);
  const [ stateCheck, setStateCheck ] = useState(false);
  const [ stateCheckError, setStateCheckError ] = useState(undefined);
  const [ stateButtonStatus, setStateButtonStatus ] = useState(undefined);
  const reduxUpload = useSelector(({payment}) => payment.chargeUpload);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  //==============================================================================
  // function
  //==============================================================================
  /**
     유효 PC
  */
  const getStringOfBalance = () => {
    if( stateBalance === undefined ){
      return 0;
    }
    
    return convertMoneyStyleString(stateBalance);
  };

  /**
     충전 PC
  */
  const getStringOfChargePC = () => {
    if( statePrice === undefined ){
      return 0;
    }
    
    return convertMoneyStyleString(statePrice?.amount + statePrice?.bonusAmount);
  };

  /**
     충전 후 유효 PC
  */
  const getStringOfTotalPC = () => {
    if( stateBalance === undefined || statePrice === undefined  ){
      return 0;
    }
    
    return convertMoneyStyleString( stateBalance + (statePrice?.amount + statePrice?.bonusAmount) );
  };

  const handleCheck = (e) => {
    if( e.target.checked === true ){
      setStateCheckError(undefined);
    }

    setStateCheck(e.target.checked);
  };

  const handleCharge = (event, setStatus) => {
    if( stateCheck === false ){
      setStateCheckError("確認してください。");
      setStatus(undefined);
      return;
    }

    setStatus("loading");
    dispatch( setPaymentChargeAction(statePrice) );
  };
  //==============================================================================
  // api
  //==============================================================================

  //==============================================================================
  // hook
  //==============================================================================
  useEffect(() => {
    if(reduxUpload){
      console.log('done', reduxUpload);
    }
  }, [reduxUpload]);
  

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="head_con view-m">
          <button type="button" className="btn_back"><span className="icon"><i className="fa-solid fa-angle-left"></i></span></button>
          <button type="button" className="btn_share"><span className="icon"><i className="fa-solid fa-share"></i></span></button>
        </div>

        <div className="hd_titbox2 hide-m">
          <h2 className="m_tit1">PlayCoin<span className="fw500">をチャージする</span></h2>
        </div>

        <div className="cont_payment">
          <PaymentPrice
            onChange={(currency) => setStatePrice(currency)}
          />

          <Coupon />

          
          <div className="area_payment total">
            <h2 className="tit1 view-m">お支払い金額</h2>
            <ul className="col list2">
              <li className="c-black"><span>保有PC</span><span>{getStringOfBalance()}</span></li>
              <li className="c-black"><span>チャージPC</span><span>{getStringOfChargePC()}</span></li>
              <li className="c-black"><span>チャージ後保有PC</span><span>{getStringOfTotalPC()}</span></li>
            </ul>
            <ul className="col list1">
              <li><span>金額</span><span>{getStringOfPriceWithCurrency(statePrice?.price, t, i18n)}</span></li>
              <li><span>クーポン割引</span><span>{getStringOfPriceWithCurrency(stateCoupon, t, i18n)}</span></li>
            </ul>
            <div className="col ta-c">
              <p className="tit2 hide-m">次の金額をお支払いします。</p>
              <p className="c1"><span className="view-m">合計金額</span><span>{getStringOfPriceWithCurrency(statePrice?.price - stateCoupon, t, i18n)}</span></p>

              
              {/* <!-- PC --> */}
              <Checkbox className={"inp_checkbox hide-m"} text={"注文内容と注意事項を確認しました。"} onChange={handleCheck} error={stateCheckError} />
              <Button className={"btn-pk n blue w100p hide-m"} text={"お支払い"} status={stateButtonStatus} onClick={(e, setStatus) => handleCharge(e, setStatus)} />
              {/* <button type="button" className="btn-pk n blue w100p hide-m"><span>お支払い</span></button> */}
            </div>
          </div>

          
          <div className="area_payment pay">
            <h2 className="tit1">お支払い方法</h2>
            <div className="col lst_radio">
              <div className="on">
                <label className="inp_radio"><input type="radio" name="radio01" defaultChecked/><span>Stripe決済</span></label>
                <div id="radio_con1" className="col_view">
                  <div className="box_radio">
                    <div><StripeLogo /></div>
                    <p>カード決済やスマホウォレット決済が簡単に！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- 모바일 --> */}
          <div className="btn-bot view-m">
            <Checkbox className={"inp_checkbox"} text={"注文内容と注意事項を確認しました。"} onChange={handleCheck} error={stateCheckError} />
            <Button className={"btn-pk n blue w100p"} text={"お支払い"} status={stateButtonStatus} onClick={(e, setStatus) => handleCharge(e, setStatus)} />
          </div>
        </div>


      </div>
    </div>
  )
}
