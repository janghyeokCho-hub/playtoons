import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PostItem from "./PostItem";

const PostItems = () => {
  SwiperCore.use([Navigation, Pagination]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const posts = useSelector(({ search }) => search.posts);
  const postsMeta = useSelector(({ search }) => search.postsMeta);

  const renderItems = useMemo(() => {
    return posts.map((item, index) => {
      return (
        <SwiperSlide key={`slide_${index}`} className="cx swiper-slide">
          <PostItem item={item} />
        </SwiperSlide>
      );
    });
  }, [posts]);
  return (
    <div className="lst_comic1 long">
      <Swiper
        className="swiper-container mySwiper1"
        slidesPerView={5}
        spaceBetween={10}
        grid={{ rows: 1 }}
        observer={true}
        observeParents={true}
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 14,
            grid: {
              rows: 2,
            },
          },
          961: {
            slidesPerView: 4,
            spaceBetween: 20,
            grid: {
              rows: 1,
            },
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 48,
            grid: {
              rows: 1,
            },
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
    </div>
  );
};

export default PostItems;
