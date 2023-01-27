import React from 'react'

export default function Failed() {
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox2">
          <h2 className="m_tit1">お支払いの確認</h2>
          <p className="t_chk c-red"><i className="fa-regular fa-circle-xmark"></i>お支払いできませんでした。</p>
        </div>

        <div className="area_payment comp">
          <div className="titbox mb0">
            <p className="t1">注文番号 : 48493A321F312</p>
          </div>

          <div className="box_paycomp1 ty1">
            <p className="c2">お支払い中、不明なエラーが発生しました。もう一度お試しください。</p>
          </div>
        </div>

        <div className="btn-bot mty1">
          <a href="#" className="btn-pk n blue2 wid1"><span className="view-m">元のページへ</span>戻る</a>
        </div>


      </div>
    </div>
  )
}
