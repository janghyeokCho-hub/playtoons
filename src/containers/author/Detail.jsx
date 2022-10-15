import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Series from "@COMPONENTS/author/detail/Series";

const Detail = () => {
  const navigate = useNavigate();
  const { type } = useParams("type");
  const { id } = useParams("id");
  console.log(type, id);

  return (
    <div className="contents">
      <div className="inr-c">{type === "series" && <Series id={id} />}</div>
    </div>
  );
};

export default Detail;
