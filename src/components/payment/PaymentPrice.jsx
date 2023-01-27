import { getStringOfPlaycoin, getStringOfPriceWithCurrency, showOneButtonPopup } from "@/common/common";
import { CURRENCY_LIST } from "@/common/constant";
import { getPaymentPriceFromServer } from "@/services/paymentService";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function PaymentPrice(props) {
  const { className = "area_payment", onChange } = props;
  const [stateData, setStateData] = useState(undefined);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  //==============================================================================
  // function
  //==============================================================================
  const getCurrency = () => {
    for (let i = 0; i < CURRENCY_LIST.length; i++) {
      if (i18n.language === CURRENCY_LIST[i].name) {
        return CURRENCY_LIST[i].code;
      }
    }
  };
  //==============================================================================
  // api
  //==============================================================================
  const getPaymentPrice = async () => {
    const { status, data } = await getPaymentPriceFromServer(getCurrency());
    console.log("getPaymentPrice", status, data);

    if (status === 200) {
      onChange?.(data.prices[0]);
      setStateData(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    getPaymentPrice();
  }, []);

  //==============================================================================
  // render
  //==============================================================================
  const renderCurrency = () => {
    return stateData?.prices?.map((item, index) => {
      return (
        <label className="inp_radio" key={index}>
          {
            index === 0 ? (
              <input
                type="radio"
                name="radio10"
                defaultChecked
                onChange={() => onChange?.(item)}
              />
            ) : (
              <input
                type="radio"
                name="radio10"
                onChange={() => onChange?.(item)}
              />
            )
          }
          <span>
            <span className="l">{getStringOfPlaycoin(item.amount + item.bonusAmount)}</span>
            <span className="r">{getStringOfPriceWithCurrency(item.price, t, i18n)}</span>
          </span>
        </label>
      );
    });
  };

  return (
    <div className={className}>
      <h2 className="tit1">チャージ金額を選択</h2>
      <div className="lst_radiotx">{renderCurrency()}</div>
    </div>
  );
}
