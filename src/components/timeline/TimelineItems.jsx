import { faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import TimelineItem from "./TimelineItem";

export default function TimelineItems({ items }) {
  SwiperCore.use([Navigation, Autoplay]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [ stateTimeout, setStateTimeout ] = useState(undefined);
  

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
                <TimelineItem item={item} isActive={isActive} stateTimeout={stateTimeout} setStateTimeout={setStateTimeout} />
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
      slidesPerView={1}
      initialSlide={3}
      loop={true}
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

