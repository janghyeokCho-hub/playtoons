import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import CurationItems from "./CurationItems";

const Cover = ({ curation }) => {
  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1">{curation?.title}</h2>

          {
            curation?.id !== '41' && (
              <Link to={``} class="rgh btn-pk n blue2"><span class="ico_arr_link">すべてみる <FontAwesomeIcon icon={faAngleRight} className="fa-solid" /></span></Link>
            )
          }
        </div>
        <div className="lst_comic1 long">
          <CurationItems curationNum={curation?.id} />
        </div>
      </div>
    </div>
  );
};

export default Cover;
