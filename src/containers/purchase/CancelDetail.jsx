import ImageBackground from '@/components/dashboard/ImageBackground'
import React from 'react'
import {ReactComponent as StripeLogo} from '@IMAGES/stripe_logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLoader } from '@fortawesome/pro-solid-svg-icons'

export default function CancelDetail() {
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
          <div className="area_payment pos-r">
            <div className="box_thumb ai-c">
              {/* <!-- 노이미지 일때만 border 클래스 --> */}
              <div className="thumb">
                <ImageBackground type={"span"} className={`bs100 noimg_line`} hash={require("@IMAGES/img_noimg_horizontal.jpg")} />
              </div>
              <div className="txt">
                <p className="h1 mb0 c-blue fz_m1">+10,000PC</p>
              </div>
            </div>

            <div className="rgh_purch typ1">
              <div className="box_message">
                <div className="icon">
                  <FontAwesomeIcon className="fa-solid fa-loader" icon={faLoader} />
                  {/* <!-- <i className="fa-duotone fa-loader"></i> --> */}
                </div>
                <div>
                  <p className="t1">メッセージ未定</p>
                  <p className="t2">ストライプページに移動中です。</p>
                </div>
              </div>
              {/* <!-- 모바일에서 위치 변경 --> */}
              <a href="#" className="btn-pk n gray_purchase w100p hide-m">注文を取り消し</a>
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

        {/* <!-- 모바일에서 위치 변경 --> */}
        <div className="btn-bot mty1 inr-mc1 view-m">
          <a href="#" className="btn-pk n gray_purchase w100p">注文を取り消し</a>
        </div>

        
      </div>
    </div>
  )
}
