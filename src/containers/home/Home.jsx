import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHome } from "@/modules/redux/ducks/home";
import BannerItems from "@COMPONENTS/home/BannerItems";
import TypeItems from "@COMPONENTS/home/TypeItems";
import HomeItems from "@COMPONENTS/home/HomeItems";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHome());
  }, [dispatch]);

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
