import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <footer id="footer" class="footer">
      <div class="inr-c">
        <div class="foo_logo">PlayToons</div>
        <p class="copy">&copy;Rocketstaff All Right Reserved.</p>

        <div class="rgh">
          <a href="#">利用規約</a>
          <a href="#">会社情報</a>
          <a href="#">プライバシーポリシー</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
