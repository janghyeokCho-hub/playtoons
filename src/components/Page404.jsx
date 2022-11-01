import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div class="contents">
      <div class="wrap_404">
        <div class="txt">
          <p class="h1">お探しのページは見つかりませんでした。</p>
          <p class="t1">URLが間違っているか、ページが存在しません。</p>
          <div class="btn-bot">
            <Link to="/" class="btn-pk n blue2">
              ホームに戻る
            </Link>
          </div>
        </div>
        <div class="imgs">
          <img src={require("@IMAGES/img_404.png")} alt="404" />
        </div>
      </div>
    </div>
  );
};

export default Page404;
