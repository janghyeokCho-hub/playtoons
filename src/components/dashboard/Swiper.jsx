import React, { useRef } from 'react';
import { Swiper } from 'swiper/react';
import SwiperCore, { Navigation, } from 'swiper';
import "@/css/swiper.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/pro-solid-svg-icons';

/**
*
  const getSalesProductList = () => {
    return data?.sales_product_list?.map((item, i) => {
      return <SwiperSlide key={i} className={"cx"}>
                <a href="#">
                  <div className="cx_thumb"><span><img src={item.image} alt="사진" /></span></div>
                  <div className="cx_txt">
                    <p className="h1">{item.title}</p>
                    <p className="t1">{item.date}</p>
                  </div>
                </a>
            </SwiperSlide>
    });
  };

  <SwiperContainer 
    className={"mySwiper1"}
    slidesPerView={4}
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
    list={getSalesProductList} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function SwiperContainer(props) {
  SwiperCore.use([Navigation]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <Swiper
        className={`swiper-container ${props?.className}`}
        slidesPerView={props?.slidesPerView}
        spaceBetween={10}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        breakpoints={props?.breakpoints}
        onSlideChange={() => {

        }}
        onInit={(swiper) => {
          
        }}
        onSwiper={(swiper) => {
          // console.log('swiper', swiper);
        }} 
        onUpdate={(swiper) => {
          nextRef?.current?.classList?.add("slide_st");
          prevRef?.current?.classList?.add("slide_st");
        }}>
          
        {
          props?.list?.()
        }
        
      </Swiper>
      
      {/* .lst_comic1 .swiper-button-next 이런식으로 common.css에 정의되어 있어야 스타일이 먹음*/}
      <button ref={prevRef} type="button" className="swiper-button-prev my1 hide-m"><FontAwesomeIcon icon={faCircleChevronLeft} /></button>
      <button ref={nextRef} type="button" className="swiper-button-next my1 hide-m"><FontAwesomeIcon icon={faCircleChevronRight} /></button>
    </>
  )
}
