import React, { useRef, useMemo } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import RecentItem from "@COMPONENTS/author/RecentItem";

const RecentItems = ({ items, postType }) => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const renderItems = useMemo(() => {
    return items?.map((author, index) => (
      <SwiperSlide key={`recent_${index}`} className="swiper-slide">
        <RecentItem item={author} />
      </SwiperSlide>
    ));
  }, [items]);

  return (
    <div className="slider_profile">
      {items?.length > 0 && (
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
            <div className="swiper-wrapper">{renderItems}</div>
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
      )}
    </div>
  );
};

export default RecentItems;
