import React from "react";
import CurationItems from "./CurationItems";

const Cover = ({ curation }) => {
  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1">{curation?.title}</h2>
        </div>
        <div className="lst_comic1 long">
          <CurationItems curationNum={curation?.id} />
        </div>
      </div>
    </div>
  );
};

export default Cover;
