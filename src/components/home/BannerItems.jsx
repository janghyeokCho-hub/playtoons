import React, { useState, useEffect, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons";
import Banner from "./Banner";

const BannerItems = ({ curationNum }) => {
  SwiperCore.use([Navigation, Pagination]);
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
        <SwiperSlide key={index} className="item swiper-slide">
          <Banner item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <Swiper
        className="swiper-container mySwiper0"
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: ".swiper-button-next.my1",
          prevEl: ".swiper-button-prev.my1",
        }}
        pagination={{
          el: ".swiper-pagination.my1",
          clickable: true,
          dynamicBullets: true,
        }}
        onUpdate={() => {
          nextRef?.current?.classList?.add("slide_st");
          prevRef?.current?.classList?.add("slide_st");
        }}
      >
        <div className="swiper-wrapper">{renderItems}</div>
      </Swiper>

      <div className="swiper-pagination my1"></div>

      <button
        ref={prevRef}
        type="button"
        className="swiper-button-prev my1 hide-m"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        ref={nextRef}
        type="button"
        className="swiper-button-next my1 hide-m"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export default BannerItems;
