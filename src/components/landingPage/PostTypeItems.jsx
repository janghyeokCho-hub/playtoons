import React, { useState, useEffect } from "react";

import { getPostTypes as getPostTypesAPI } from "@API/postService";
import PostType from "./PostType";
const PostTypeItems = () => {
  const postTypeColor = [
    "#2F83FF",
    "#FFA82F",
    "#9058FD",
    "#FFBE28",
    "#FFDC2F",
    "#FFA82F",
  ];
  const postTypeImg = [
    require("@IMAGES/img_landing_main1.png"),
    require("@IMAGES/img_landing_main2.png"),
    require("@IMAGES/img_landing_main3.png"),
    require("@IMAGES/img_landing_main4.png"),
    require("@IMAGES/img_landing_main5.png"),
    require("@IMAGES/img_landing_main6.png"),
  ];

  const [items, setItems] = useState([]);

  const getPostTypes = async () => {
    const response = await getPostTypesAPI();
    if (response.status === 200) {
      setItems(response.data.types);
    }
  };
  useEffect(() => {
    if (!items?.length) {
      getPostTypes();
    }
  }, [items]);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <PostType
            key={`postType_${index}`}
            item={item}
            bgColor={postTypeColor[index]}
            bgImg={postTypeImg[index]}
          />
        ))}
    </>
  );
};

export default PostTypeItems;
