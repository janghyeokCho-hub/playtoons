import React from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/pro-solid-svg-icons';

/**
*
  const getSalesProductList = () => {
    return data?.sales_product_list?.map((item, i) => {
      return <SwiperSlide key={i} className={"cx"}>
                <a href="#">
                  <div class="cx_thumb"><span><img src={item.image} alt="사진" /></span></div>
                  <div class="cx_txt">
                    <p class="h1">{item.title}</p>
                    <p class="t1">{item.date}</p>
                  </div>
                </a>
            </SwiperSlide>
    });
  };

  <SwiperContainer 
    className={"mySwiper1"}
    list={getSalesProductList} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function SwiperContainer(props) {

  return (
    <Swiper
      className={`swiper-container ${props?.className}`}
      slidesPerView={4}
      spaceBetween={10}
      observer={true}
      observeParents={true}
      navigation={{
        nextEl: '.swiper-button-next.my1',
        prevEl: '.swiper-button-prev.my1',
      }}
      breakpoints={{
        0: {
          slidesPerView: 2.3,
          spaceBetween: 8,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {
        props?.list?.()
      }
      {/* add class slide_st */}
      <button type="button" class="swiper-button-prev my1"><i class="fa-solid fa-circle-chevron-left"></i><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
      <button type="button" class="swiper-button-next my1"><i class="fa-solid fa-circle-chevron-right"></i><FontAwesomeIcon icon={faCircleChevronRight} /></button>
    </Swiper>
  )
}
