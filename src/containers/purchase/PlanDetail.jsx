import React from 'react'
import { ReactComponent as StripeLogo } from '@IMAGES/stripe_logo.svg'
import ImageBackground from '@/components/dashboard/ImageBackground'
import Image from '@/components/dashboard/Image'

export default function PlanDetail() {
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
            <div className="box_thumb">
              <div className="thumb">
                {/* <!-- 노이미지 일때만 noimg_line --> */}
                <ImageBackground type={"span"} className={`bs150`} hash={require("@IMAGES/img_mainplan1.jpg")} />
              </div>
              <div className="txt">
                <p className="h1">大学のリンゴ一個の重さで10メートルの素材</p>
                <p className="t1">ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら
                公開できればと思います。ご支援いただいた分は作業環境・技術向上に
                使わせていただきます。よろしくお願いいたします。</p>
                <p className="c1">1200PC/月</p>
                <div className="btns">
                  <a href="#" className="btn-pk n blue mw100p"><span>作品一覧へ</span></a>
                </div>
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
            <div className="col line">
              <div className="lft">
                <p className="h1">お支払い金額</p>
              </div>
              <div className="rgh">
                <p className="t1">1,200円</p>
              </div>
            </div>
            <div className="col">
              <div className="lft">
                <p className="h1">プラン開始日</p>
              </div>
              <div className="rgh">
                <p className="t1">2022年12月26日</p>
              </div>
            </div>
            <div className="col">
              <div className="lft">
                <p className="h1">次回のお支払い日</p>
              </div>
              <div className="rgh">
                <p className="t1">2023年01月25日</p>
              </div>
            </div>
          </div>

        </div>

        <div className="rgh_purch inr-mc1">
          <div className="box_profile">
            <ImageBackground type={"div"} className={"pf_thumb"} hash={require("@IMAGES/longad_bg_m.jpg")}  />
            <div className="pf_txt">
              <div className="icon"><Image hash={require("@IMAGES/img_profile.png")} /></div>
              <p className="h1">七語つきみ@TFO7</p>
              <p className="t1">はみんぐです。アニメーター、
              イラスト、MV制作🥀🥀 音楽、
              ファッション、夜と光の絵…</p>
            </div>
          </div>
          <a href="#" className="btn-pk n gray_purchase w100p">プラン解除</a>
        </div>
        
      </div>
    </div>
  )
}
