import React from 'react'

export default function CompletedCharge() {
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox2">
          <h2 className="m_tit1">お支払いの確認</h2>
          <p className="t_chk"><i className="fa-light fa-circle-check"></i>お支払いを完了しました。</p>
        </div>

        <div className="area_payment comp">
          <div className="titbox">
            <p className="t1 mb0">注文番号 : 48493A321F312</p>
          </div>

          <div className="box_paycomp1">
            <div className="lft">
              <p className="c1">+10,000PC</p>
              <p className="c2">PlayCoinのチャージが完了しました。</p>
            </div>
            <div className="rgh hide-m">
              <a href="#" className="btn-pk n blue">お支払い詳細へ</a>
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
