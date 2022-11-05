import React, { useState, useEffect, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import Curation from "./Curation";

const CurationItems = ({ curationNum }) => {
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
        <SwiperSlide
          key={`swiper_slide_${index}`}
          className="item swiper-slide"
        >
          <Curation item={item} />
        </SwiperSlide>
      );
    });
  }, [items]);

  return (
    <>
      <div className="lst_banner">
        <Swiper
          className="swiper-container mySwiper1"
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={12}
          centeredSlides={true}
          loop={true}
          observer={true}
          observeParents={true}
          touchRatio={0}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          navigation={{
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
          }}
          onUpdate={() => {
            nextRef?.current?.classList?.add("slide_st");
            prevRef?.current?.classList?.add("slide_st");
          }}
        >
          <div className="swiper-wrapper">{renderItems}</div>
        </Swiper>

        <div className="swiper-pagination my1"></div>

        <button ref={prevRef} type="button" className="swiper-button-prev my1">
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button ref={nextRef} type="button" className="swiper-button-next my1">
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </>
  );
};

export default CurationItems;
