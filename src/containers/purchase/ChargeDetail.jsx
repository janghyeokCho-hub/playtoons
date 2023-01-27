import ImageBackground from '@/components/dashboard/ImageBackground'
import React from 'react'
import { ReactComponent as StripeLogo } from '@IMAGES/stripe_logo.svg'

export default function ChargeDetail() {
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="head_con view-m">
          <button type="button" className="btn_back"><span className="icon"><i className="fa-solid fa-angle-left"></i></span></button>
        </div>

        <div className="hd_titbox2">
          <h2 className="m_tit1 c-black">PlayCoin</h2>
          <p className="t1">注文番号 : 48493A321F312</p>
          <p className="d1">2022/06/01 19:21</p>
        </div>

        <div className="lft_purch">
          <div className="area_payment">
            <div className="box_thumb ai-c">
              <div className="thumb">
                {/* <!-- 노이미지 일때만 noimg_line --> */}
                <ImageBackground type={"span"} className={`bs100 noimg_line`} hash={require("@IMAGES/img_noimg_horizontal.jpg")} />
              </div>
              <div className="txt">
                <p className="h1 mb0 c-blue fz_m1">+10,000PC</p>
              </div>
            </div>
          </div>

          <div className="box_purchase">
            <div className="col line">
              <div className="lft">
                <p className="h1">チャージ方法</p>
              </div>
              <div className="rgh">
                <div className="icon"><span><StripeLogo /></span></div>
              </div>
            </div>
            <div className="col">
              <div className="lft">
                <p className="h1">クーポン割引</p>
              </div>
              <div className="rgh">
                <p className="t1">友達紹介イベントクーポン</p>
                <p className="t2">-500円</p>
              </div>
            </div>
            <div className="col">
              <div className="lft">
                <p className="h1">お支払い金額</p>
              </div>
              <div className="rgh">
                <p className="t1">1,200円</p>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}
