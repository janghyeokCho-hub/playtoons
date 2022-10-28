import React, { useState, useEffect, useMemo, useRef } from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import Curation from "./Curation";

const CurationItems = ({ curationNum }) => {
  SwiperCore.use([Navigation]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [items, setItems] = useState([]);

  const getCurationList = async (curationNum) => {
    const response = await getCurationListAPI(curationNum);
    if (response.status === 200) {
      setItems(response.data.posts);
    }
  };

  useEffect(() => {
    if (!items?.length) {
      getCurationList(curationNum);
    }
  }, [items, curationNum]);

  const renderItems = useMemo(() => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={`render_${index}`} className="cx">
          <Curation item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      {items && (
        <>
          <Swiper
            className="swiper-container mySwiper1"
            slidesPerView={5}
            spaceBetween={10}
            observer={true}
            observeParents={true}
            touchRatio={0}
            navigation={{
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }}
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              961: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1280: {
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
            {renderItems}
          </Swiper>
          <button
            ref={prevRef}
            type="button"
            className={`swiper-button-prev bt_mainSlider4 hide-m`}
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className={`swiper-button-next bt_mainSlider4 hide-m`}
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </>
      )}
    </>
  );
};

export default CurationItems;
