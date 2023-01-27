import Image from '@/components/dashboard/Image'
import ImageBackground from '@/components/dashboard/ImageBackground'
import React from 'react'

export default function SubscribeList() {
  return (
    <div class="area_schmain inr-c">
      <div class="hd_titbox">
        <h2 class="m_tit1 mb0">支援リスト</h2>
      </div>
      <div class="main_sch">
        <div class="lft">
          <a href="#" class="btn-pk n blue bdrs">すべて 41</a>
          <a href="javascript:;" class="btn-pk n blue2 bdrs">支援中 32</a>				
          <a href="javascript:;" class="btn-pk n blue2 bdrs">期限切れ 9</a>
        </div>
      </div>

      <div class="slider_profile subscribe">
        <div class="box_profile"><a href="#">
          <ImageBackground type={"div"} className={"pf_thumb"} hash={require("@IMAGES/visual_author_bg.jpg")} />
          <div class="pf_txt">
            <div class="icon"><Image hash={require("@IMAGES/img_profile.png")} /></div>
            <p class="h1 mb10">七語つきみ@TFO7</p>
            <div class="ta-c"><a href="#" class="btn-pk s blue2">支援解除</a></div>

            <div class="line_subscribe">
              <p class="s0"><span class="i-txt">支援中</span></p>
              <p class="s1">ダイヤモンドプランダイヤモンイヤモンン…</p>
              <p class="s2">1,000CP/月</p>
              <p class="s3">ひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だ…</p>
              <button type="button" onclick="moreView(this);">もっと見る</button>
            </div>
          </div>
        </a></div>
        <div class="box_profile"><a href="#">
          <ImageBackground type={"div"} className={"pf_thumb"} hash={require("@IMAGES/visual_author_bg.jpg")} />
          <div class="pf_txt">
            <div class="icon"><Image hash={require("@IMAGES/img_profile.png")} /></div>
            <p class="h1 mb10">七語つきみ@TFO7</p>
            <div class="ta-c"><a href="#" class="btn-pk s blue2">支援解除</a></div>

            <div class="line_subscribe">
              <p class="s0"><span class="i-txt">支援中</span></p>
              <p class="s1">ダイヤモンドプランダイヤモンイヤモンン…</p>
              <p class="s2">1,000CP/月</p>
              <p class="s3">ひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だ…</p>
              <button type="button" onclick="moreView(this);">もっと見る</button>
            </div>
          </div>
        </a></div>
        <div class="box_profile"><a href="#">
          <ImageBackground type={"div"} className={"pf_thumb"} hash={require("@IMAGES/visual_author_bg.jpg")} />
          <div class="pf_txt">
            <div class="icon"><Image hash={require("@IMAGES/img_profile.png")} /></div>
            <p class="h1 mb10">七語つきみ@TFO7</p>
            <div class="ta-c"><a href="#" class="btn-pk s blue">支援解除</a></div>

            <div class="line_subscribe">
              <p class="s0"><span class="i-txt gray">支援中</span><span>2022/09/12</span></p>
              <p class="s1">ダイヤモンドプランダイヤモンイヤモンン…</p>
              <p class="s2">1,000CP/月</p>
              <p class="s3">ひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だひと月だけでも嬉しいです！タイムラプスや未だ…</p>
              <button type="button" onclick="moreView(this);">もっと見る</button>
            </div>
          </div>
        </a></div>
        <div class="box_profile"><a href="#">
          <ImageBackground type={"div"} className={"pf_thumb"} hash={require("@IMAGES/visual_author_bg.jpg")} />
          <div class="pf_txt">
            <div class="icon"><Image hash={require("@IMAGES/img_profile.png")} /></div>
            <p class="h1 mb10">七語つきみ@TFO7</p>
            <div class="ta-c"><a href="#" class="btn-pk s blue2">支援解除</a></div>

            <div class="line_subscribe">
              <p class="s0"><span class="i-txt">支援中</span></p>
              <p class="s1">ダイヤモンドプランダイヤモンイヤモンン…</p>
              <p class="s2">1,000CP/月</p>
              <p class="s3">ひと月だけでも嬉しいです！タイムラプスや未だ…</p>
              <button type="button" onclick="moreView(this);">もっと見る</button>
            </div>
          </div>
        </a></div>
      </div>
    </div>
  )
}
