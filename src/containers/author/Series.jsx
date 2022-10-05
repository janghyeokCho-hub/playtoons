import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import ImgComic2 from "@IMAGES/tmp_comic2.jpg";

const Series = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="lst_series">
      <ul>
        <li>
          <a href="#">
            <div className="thumb">
              <img src={ImgComic2} alt="만화책" />
            </div>
            <div className="txt">
              <p className="t1">ウェブトゥーンウェブトゥーンウェブトゥーン</p>
              <p className="h1">
                阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート
              </p>
              <button type="button" className="btn-pk s blue2">
                <FontAwesomeIcon icon={faObjectUnion} />
                233
              </button>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div className="thumb">
              <img src={ImgComic2} alt="만화책" />
            </div>
            <div className="txt">
              <p className="t1">ウェブトゥーン</p>
              <p className="h1">阿修羅ゲート</p>
              <button type="button" className="btn-pk s blue2">
                <FontAwesomeIcon icon={faObjectUnion} />
                233
              </button>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div className="thumb">
              <img src={ImgComic2} alt="만화책" />
            </div>
            <div className="txt">
              <p className="t1">ウェブトゥーン</p>
              <p className="h1">阿修羅ゲート</p>
              <button type="button" className="btn-pk s blue2">
                <FontAwesomeIcon icon={faObjectUnion} />
                233
              </button>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Series;
