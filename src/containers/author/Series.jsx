import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import ImgComic2 from "@IMAGES/tmp_comic2.jpg";

const Series = () => {
  const navigate = useNavigate();

  return (
    <div className="lst_series">
      <ul>
        <li>
          <a href="#">
            <div class="thumb">
              <SpanImg bgImg={require("@IMAGES/tmp_comic2.jpg")}></SpanImg>
            </div>
            <div class="txt">
              <p class="t1">ウェブトゥーンウェブトゥーンウェブトゥーン</p>
              <p class="h1">
                阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート
              </p>
              <button type="button" class="btn-pk s blue2">
                <FontAwesomeIcon icon={faObjectUnion} />
                233
              </button>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <SpanImg bgImg={require("@IMAGES/tmp_comic2.jpg")}></SpanImg>
            </div>
            <div class="txt">
              <p class="t1">ウェブトゥーンウェブトゥーンウェブトゥーン</p>
              <p class="h1">
                阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート
              </p>
              <button type="button" class="btn-pk s blue2">
                <FontAwesomeIcon icon={faObjectUnion} />
                233
              </button>
            </div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="thumb">
              <SpanImg bgImg={require("@IMAGES/tmp_comic2.jpg")}></SpanImg>
            </div>
            <div class="txt">
              <p class="t1">ウェブトゥーンウェブトゥーンウェブトゥーン</p>
              <p class="h1">
                阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート
              </p>
              <button type="button" class="btn-pk s blue2">
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

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Series;
