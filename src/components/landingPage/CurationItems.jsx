import React, { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import SwiperContainer from "@COMPONENTS/dashboard/Swiper";
import Curation from "./Curation";

const CurationItems = ({ curationNum }) => {
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

  const renderItems = (items) => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={`render_${index}`} className="cx">
          <Curation item={item} />
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      {items && (
        <SwiperContainer
          className={"mySwiper1"}
          slidesPerView={5}
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
          list={() => renderItems(items)}
        />
      )}
    </>
  );
};

export default CurationItems;
