import { ReactComponent as StripeLogo } from '@IMAGES/stripe_logo.svg'

export default function Charge() {
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
          <div className="area_payment">
            <h2 className="tit1">チャージ金額を選択</h2>
            <div className="lst_radiotx">
              <label className="inp_radio"><input type="radio" name="radio10" checked/><span><span className="l">1,000PC</span><span className="r">1,000円</span></span></label>
              <label className="inp_radio"><input type="radio" name="radio10"/><span><span className="l">3,000PC</span><span className="r">3,000円</span></span></label>
              <label className="inp_radio"><input type="radio" name="radio10"/><span><span className="l">5,000PC</span><span className="r">5,000円</span></span></label>
              <label className="inp_radio"><input type="radio" name="radio10"/><span><span className="l">10,000PC</span><span className="r">10,000円</span></span></label>
              <label className="inp_radio"><input type="radio" name="radio10"/><span><span className="l">50,000PC</span><span className="r">50,000円</span></span></label>
              <label className="inp_radio"><input type="radio" name="radio10"/><span><span className="l">100,000PC</span><span className="r">100,000円</span></span></label>
            </div>
          </div>

          <div className="area_payment">
            <h2 className="tit1">クーポン使用</h2>
            <div className="col">
              <h3 className="tit2">クーポン選択</h3>
              <select name="" id="" className="select1 w100p">
                <option value="">選択してください</option>
              </select>
            </div>
            <div className="col">
              <h3 className="tit2">クーポンコードを入力</h3>
              <div className="inp_btn">
                <input type="text" className="inp_txt w100p"/>
                <button type="button" className="btn-pk n blue2">適用する</button>
              </div>
            </div>
          </div>

          
          <div className="area_payment total">
            <h2 className="tit1 view-m">お支払い金額</h2>
            <ul className="col list2">
              <li className="c-black"><span>保有PC</span><span>531,200</span></li>
              <li className="c-black"><span>チャージPC</span><span>5,000</span></li>
              <li className="c-black"><span>チャージ後保有PC</span><span>536,200</span></li>
            </ul>
            <ul className="col list1">
              <li><span>金額</span><span>10,000円</span></li>
              <li><span>クーポン割引</span><span>500円</span></li>
            </ul>
            <div className="col ta-c">
              <p className="tit2 hide-m">次の金額をお支払いします。</p>
              <p className="c1"><span className="view-m">合計金額</span><span>9,500円</span></p>

              
              {/* <!-- 1. 모바일에서 안보임 : 위치변경--> */}
              <label className="inp_checkbox hide-m"><input type="checkbox"/><span>毎月のお支払いに同意します。</span></label>
              <button type="button" className="btn-pk n blue w100p hide-m"><span>お支払い</span></button>
            </div>
          </div>

          
          <div className="area_payment pay">
            <h2 className="tit1">お支払い方法</h2>
            <div className="col lst_radio">
              <div className="on">
                <label className="inp_radio"><input type="radio" name="radio01" checked/><span>Stripe決済</span></label>
                <div id="radio_con1" className="col_view">
                  <div className="box_radio">
                    <div><StripeLogo /></div>
                    <p>カード決済やスマホウォレット決済が簡単に！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- 1. 모바일에서 위치변경 --> */}
          <div className="btn-bot view-m">
            <label className="inp_checkbox"><input type="checkbox"/><span>注文内容と注意事項を確認しました。</span></label>
            <button type="button" className="btn-pk n blue w100p"><span>お支払い</span></button>
          </div>
        </div>


      </div>
    </div>
  )
}
