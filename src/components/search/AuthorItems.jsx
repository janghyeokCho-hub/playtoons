import React from "react";
import { useSelector } from "react-redux";
import AuthorItem from "./AuthorItem";

const AuthorItems = () => {
  const authors = useSelector(({ search }) => search.authors);
  const authorsMeta = useSelector(({ search }) => search.authorsMeta);
  return (
    <div className="slider_profile">
      {authors?.length > 0 &&
        authors?.map((author, index) => (
          <AuthorItem key={`author_${index}`} author={author} />
        ))}
    </div>
  );
};

export default AuthorItems;
