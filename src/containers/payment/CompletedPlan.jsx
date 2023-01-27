import ImageBackground from '@/components/dashboard/ImageBackground'
import React from 'react'

export default function CompletedPlan() {
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox2">
          <h2 className="m_tit1">お支払いの確認</h2>
          <p className="t_chk"><i className="fa-light fa-circle-check"></i>お支払いを完了しました。</p>
        </div>

        <div className="area_payment comp">
          <div className="titbox">
            <p className="t1">注文番号 : 48493A321F312</p>
          </div>

          <div className="box_thumb minh_ty1">
            <div className="thumb">
              <ImageBackground type={"span"} className={"b_line"} hash={require("@IMAGES/img_mainplan1.jpg")} />
            </div>
            <div className="txt">
              <p className="h1">ダイヤモンドプラン</p>
              <div className="t_profile">
                <ImageBackground type={"span"} className={"im"} hash={require("@IMAGES/img_profile.png")} />
                <p>七語つきみ@TFO7</p>
              </div>
              <p className="c1">1200PC/月</p>
              <div className="lst_exe"></div>
              <div className="btns hide-m">
                <a href="#" className="btn-pk n blue mw100p"><span>お支払い詳細へ</span></a>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-bot mty1">
          <a href="#" className="btn-pk n blue2 wid1"><span className="view-m">元のページへ</span>戻る</a>
          <a href="#" className="btn-pk n blue view-m wid1 mt10">お支払い詳細へ</a>
        </div>


      </div>
    </div>
  )
}
