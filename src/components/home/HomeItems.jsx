import React, { useState, useCallback, useEffect } from "react";
import { getHome as getHomeAPI } from "@/services/homeService";
import HomeItem from "./HomeItem";

const HomeItems = () => {
  const [items, setItems] = useState([]);

  const getHome = useCallback(async () => {
    const response = await getHomeAPI("home");
    if (response?.status === 200) {
      setItems(response.data?.contents);
    }
  }, []);

  useEffect(() => {
    getHome();
  }, []);
  return (
    <>
      {items?.map((item, index) => (
        <HomeItem key={`cover_${index}`} item={item} />
      ))}
    </>
  );
};

export default HomeItems;
