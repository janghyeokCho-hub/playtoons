import React from "react";
import Reply from "./Reply";

const ReplyItems = ({ reviews, meta }) => {
  if (!reviews?.length) {
    return <></>;
  }
  return (
    <>
      <div className="hd_titbox">
        <h2 className="h_tit1">
          レビュー <span className="num ml30">{reviews?.length}件</span>
        </h2>
      </div>
      <div className="lst_comm2">
        {reviews.map((item, index) => (
          <Reply key={`reply_${index}`} item={item} />
        ))}

        {meta.totalPages > 0 && meta.totalPages > meta.currentPage && (
          <div className="botm">
            <a href="#">レビューをもっと見る</a>
          </div>
        )}
      </div>
    </>
  );
};
export default ReplyItems;
