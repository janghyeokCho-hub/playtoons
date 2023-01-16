import React, { useState, useCallback } from "react";
import ReplyItems from "./ReplyItems";
import InquiryItems from "./InquiryItems";
import { getProductReviewList, getProductInquiryList } from "@API/storeService";
import { useEffect } from "react";

const Comments = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [inquiryMeta, setInquiryMeta] = useState(null);

  const getReviews = useCallback(async () => {
    const response = await getProductReviewList(id);
    if (response?.status === 200) {
      setReviews(response?.data?.reviews);
      setReviewMeta(response?.data?.meta);
    }
  }, [id]);

  const getInquiry = useCallback(async () => {
    const response = await getProductInquiryList(id);
    if (response?.status === 200) {
      setInquiries(response?.data?.inquiries);
      setInquiryMeta(response?.data?.meta);
    }
  }, [id]);

  useEffect(() => {
    getReviews();
    getInquiry();
  }, []);

  return (
    <div className="wrap_comment">
      <ReplyItems reviews={reviews} meta={reviewMeta} />
      <InquiryItems inquiries={inquiries} meta={inquiryMeta} />
    </div>
  );
};

export default Comments;
