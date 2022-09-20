import React from 'react';

export default function SlickItemRecentlySalesProduct(props) {
  return (
    <div class="cx swiper-slide"><a href="#">
      <div class="cx_thumb"><span><img src={props?.image} alt="사진" /></span></div>
      <div class="cx_txt">
        <p class="h1">{props?.title}</p>
        <p class="t1">{props?.date}</p>
      </div>
    </a></div>
  )
}
