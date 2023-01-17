import { MOBILE_WIDTH } from "@/common/constant";
import { useWindowSize } from "@/hook/useWindowSize";
import { faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import TimelineItem from "./TimelineItem";

export default function TimelineItems({ items }) {
  SwiperCore.use([Navigation, Autoplay]);
  const [ stateTimeout, setStateTimeout ] = useState(undefined);
  const [ stateIsMobile, setStateMobile ] = useState(false);
  const windowSize = useWindowSize();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const itemSize = items.length;

  const setTimeoutToState = (stateTimeout) => {
    setStateTimeout(stateTimeout);
  };

  //TODO get swiper object
  const handlePrev = (event) => {
    const index = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-swiper-slide-index');
    if( index === 0 ){

    }
    
  };
  
  const handleNext = (event) => {
    const index = document.getElementsByClassName('swiper-slide-active')[0].getAttribute('data-swiper-slide-index');
    if( index === (itemSize - 1) ){
  
    }
    
    
  };

  useEffect(() => {
    setStateMobile( windowSize.width <= MOBILE_WIDTH );
  }, [windowSize.width]);

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
                <TimelineItem item={item} isActive={isActive} stateTimeout={stateTimeout} setStateTimeout={setTimeoutToState} size={itemSize} />
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
      spaceBetween={24}
      slidesPerView={stateIsMobile ? 1 : 1.1}
      touchRatio={stateIsMobile ? 1 : 0}
      direction="vertical"
      navigation={{
        prevEl: prevRef?.current,
        nextEl: nextRef?.current,
      }}
    >
      <div className="rgh">
        <button ref={prevRef} type="button" className="btn01 slide_st" onClick={handlePrev} >
          <span className="i">
            <FontAwesomeIcon icon={faChevronUp} />
          </span>
        </button>
        <button ref={nextRef} type="button" className="btn01 slide_st" onClick={handleNext}>
          <span className="i">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>
      {renderItems(items)}
    </Swiper>
  );
};

