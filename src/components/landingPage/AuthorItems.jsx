import React, { useState, useEffect } from "react";

import { getCurationList as getCurationListAPI } from "@/services/curationService";
import Author from "./Author";

const AuthorItems = () => {
  const [items, setItems] = useState([]);

  const getCurationList = async () => {
    const response = await getCurationListAPI(3);
    if (response.status === 200) {
      setItems(response.data.authors);
    }
  };
  useEffect(() => {
    if (!items?.length) {
      getCurationList();
    }
  }, [items]);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <Author key={`author_${index}`} item={item} />
        ))}
    </>
  );
};

export default AuthorItems;
