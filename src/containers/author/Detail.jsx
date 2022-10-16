import React from "react";
import { useParams } from "react-router-dom";
import Series from "@COMPONENTS/author/detail/Series";
import Post from "@COMPONENTS/author/detail/Post";

const Detail = () => {
  const { type } = useParams("type");
  const { id } = useParams("id");

  return (
    <div className="contents">
      <div className="inr-c">
        {type === "series" && <Series id={id} />}
        {type === "post" && <Post id={id} />}
      </div>
    </div>
  );
};

export default Detail;
