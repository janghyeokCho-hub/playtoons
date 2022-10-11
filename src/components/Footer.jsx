import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EulaPopup from "@COMPONENTS/EulaPopup";
const Footer = () => {
  const [isEulaPopupShow, setIsEulaPopupShow] = useState(false);

  return (
    <>
      <footer id="footer" className="footer">
        <div className="inr-c">
          <div className="foo_logo">PlayToons</div>
          <p className="copy">&copy;Rocketstaff All Right Reserved.</p>

          <div className="rgh">
            <Link to="#" onClick={() => setIsEulaPopupShow(!isEulaPopupShow)}>
              利用規約
            </Link>
            <a href="#">会社情報</a>
            <a href="#">プライバシーポリシー</a>
          </div>
        </div>
      </footer>
      {isEulaPopupShow && (
        <EulaPopup
          handleClose={() => setIsEulaPopupShow(false)}
          readonly={true}
        />
      )}
    </>
  );
};

export default Footer;
