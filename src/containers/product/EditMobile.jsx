import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EditMobile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("준비중입니다.");
    navigate("/");
  }, []);
  return <></>;
};

export default EditMobile;
