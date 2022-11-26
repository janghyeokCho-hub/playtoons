import React from "react";
import Author from "./Author";
import { useSelector } from "react-redux";

const AuthorItems = ({ curationNum }) => {
  const items = useSelector(({ landing }) => landing.curations[curationNum]);

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
