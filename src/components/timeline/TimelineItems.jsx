import React, { useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import TimelineItem from "./TimelineItem";

const TimelineItems = ({ items }) => {
  SwiperCore.use([Navigation]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const renderItems = (items) => {
    return (
      <div className="swiper-wrapper">
        {items?.map((item, index) => {
          return (
            <SwiperSlide
              key={`recent_${index}`}
              className="swiper-slide"
              virtualIndex={index}
            >
              {({ isActive }) => (
                <TimelineItem item={item} isActive={isActive} />
              )}
            </SwiperSlide>
          );
        })}
      </div>
    );
  };

  return (
    <Swiper
      className="swiper-container-vertical"
      spaceBetween={50}
      slidesPerView={2}
      direction="vertical"
      navigation={{
        prevEl: prevRef?.current,
        nextEl: nextRef?.current,
      }}
    >
      <div className="rgh">
        <button ref={prevRef} type="button" className="btn01 slide_st">
          <span className="i">
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </button>
        <button ref={nextRef} type="button" className="btn01 slide_st">
          <span className="i">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>
      {renderItems(items)}
    </Swiper>
  );
};

export default TimelineItems;
