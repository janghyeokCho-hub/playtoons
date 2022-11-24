import React from "react";
import BannerItems from "@COMPONENTS/home/BannerItems";
import TypeItems from "@COMPONENTS/home/TypeItems";
import HomeItems from "@COMPONENTS/home/HomeItems";

const Home = () => {
  return (
    <div className="contents">
      <div className="lst_banner long">
        <BannerItems curationNum={5} />
      </div>

      <TypeItems />
      <HomeItems />
    </div>
  );
};

export default Home;
