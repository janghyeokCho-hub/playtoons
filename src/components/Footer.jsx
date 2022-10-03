import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="inr-c">
        <div className="foo_logo">PlayToons</div>
        <p className="copy">&copy;Rocketstaff All Right Reserved.</p>

        <div className="rgh">
          <a href="#">利用規約</a>
          <a href="#">会社情報</a>
          <a href="#">プライバシーポリシー</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
