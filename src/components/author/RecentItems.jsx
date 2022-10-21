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
    return items.map((author, index) => (
      <SwiperSlide key={`recent_${index}`} className="cx">
        <RecentItem item={author} />
      </SwiperSlide>
    ));
  }, [items]);

  return (
    <div className="slider_profile">
      {items && (
        <>
          <Swiper
            className="swiper-container mySwiper1"
            slidesPerView={5}
            spaceBetween={10}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }}
            breakpoints={{
              960: {
                slidesPerView: 1.75,
                spaceBetween: 8,
              },
              961: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1400: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            onUpdate={() => {
              nextRef?.current?.classList?.add("slide_st");
              prevRef?.current?.classList?.add("slide_st");
            }}
          >
            {renderItems}
          </Swiper>

          <button
            ref={prevRef}
            type="button"
            className="swiper-button-prev my1 hide-m"
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="swiper-button-next my1 hide-m"
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </>
      )}
    </div>
  );
};

export default RecentItems;
