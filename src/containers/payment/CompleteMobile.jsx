import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CompleteMobile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("준비중입니다.");
    navigate("/");
  }, []);

  return <></>;
};

export default CompleteMobile;
