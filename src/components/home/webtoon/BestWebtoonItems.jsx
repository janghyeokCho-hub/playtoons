import React, { useState, useEffect, useRef, useMemo } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import BestWebtoon from "./BestWebtoon";

const BestWebtoonItems = () => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([]);

  const renderItems = useMemo(() => {
    const tempItems = [
      {
        thumbnailImage: "tmp_landing_log1_1.png",
        backgroundColor: "#F8E323",
      },
      {
        thumbnailImage: "tmp_landing_log1_2.png",
        backgroundColor: "#38AADE",
      },
      {
        thumbnailImage: "tmp_landing_log1_3.png",
        backgroundColor: "#7CDB62",
      },
      {
        thumbnailImage: "tmp_landing_log1_3.png",
        backgroundColor: "#7CDB62",
      },
    ];
    return tempItems.map((item, index) => {
      return (
        <SwiperSlide key={index} className="cx swiper-slide">
          <BestWebtoon item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <div className="lst_banner">
        <Swiper
          className="swiper-container mySwiper2"
          slidesPerView={3}
          spaceBetween={48}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: ".swiper-button-next.bt_mainSlider10",
            prevEl: ".swiper-button-prev.bt_mainSlider10",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              spaceBetween: 16,
            },
            961: {
              slidesPerView: 2.1,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          onUpdate={() => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">{renderItems}</div>
        </Swiper>

        <button
          ref={prevRef}
          type="button"
          className="swiper-button-prev bt_mainSlider10"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button
          ref={nextRef}
          type="button"
          className="swiper-button-next bt_mainSlider10"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </>
  );
};

export default BestWebtoonItems;
