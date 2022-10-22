import React, { useRef } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import RecentItem from "@COMPONENTS/author/RecentItem";

const RecentItems = ({ items }) => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="slider_profile">
      <>
        <Swiper
          className="swiper-container mySwiper1"
          slidesPerView={5}
          spaceBetween={30}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.8,
              spaceBetween: 12,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          onSlideChange={() => {}}
          onInit={(swiper) => {}}
          onSwiper={(swiper) => {
            // console.log('swiper', swiper);
          }}
          onUpdate={(swiper) => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">
            {items?.map((item, index) => (
              <SwiperSlide key={`recent_${index}`} className="swiper-slide">
                <RecentItem item={item} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <button
          ref={prevRef}
          type="button"
          className="swiper-button-prev my1 slide_st"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="swiper-button-next my1 slide_st"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </>
    </div>
  );
};

export default RecentItems;
