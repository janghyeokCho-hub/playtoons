import { PAYMENT_METHOD } from '@/common/constant';

export default function PaymentMethod(props) {
  const { className = "", item, method, balance, onClick, onChange } = props;

  const isOnMethod = (type) => {
    return method === type ? 'on' : '';
  };
  
  return (
    <div className={`area_payment ${className}`}>
      <h2 className="tit1">お支払い</h2>
      <div className="col lst_radio">
        <div className={`${isOnMethod(PAYMENT_METHOD.point)}`}>
          <label className="inp_radio">
            <input
              type="radio"
              name="radio01"
              data-name="radio_con1"
              defaultChecked
              onChange={() => onChange?.(PAYMENT_METHOD.point)}
            />
            <span>ポイント</span>
          </label>
          {
            isOnMethod(PAYMENT_METHOD.point) && 
              <div id="radio_con1" className="col_view">
                <p className="tit2">保有Playcoin</p>
                <div className="inp_btn">
                  <p className="c1">{"2,144,003,102"}PC</p>
                  <button type="button" className="btn-pk n blue" onClick={(e) => onClick?.(e)}>
                    チャージ
                  </button>
                </div>
              </div>
          }
        </div>

        <div className={`${isOnMethod(PAYMENT_METHOD.stripe)}`}>
          <label className="inp_radio">
            <input
              type="radio"
              name="radio01"
              onChange={() => onChange?.(PAYMENT_METHOD.stripe)}
            />
            <span>Stripe</span>
          </label>
          {
            isOnMethod(PAYMENT_METHOD.stripe) && 
              <div id="radio_con1" className="col_view">
                <p className="tit2 view-m">Playcoin</p>
                <div className="inp_btn">
                  <p className="c1 view-m"></p>
                  <p className="tit2 mb0 hide-m">Playcoin</p>
                  <button type="button" className="btn-pk n blue" onClick={(e) => onClick?.(e)}>
                    チャージ
                  </button>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
