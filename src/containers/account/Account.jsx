import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import accountrecoverconfirm from "@IMAGES/accountrecoverconfirm.jpg";
import Login from "@COMPONENTS/auth/Login";
import Verify from "@COMPONENTS/account/Verify";
import VerifyCheck from "@COMPONENTS/account/VerifyCheck";
import Register from "@COMPONENTS/account/Register";
import Agreement from "@COMPONENTS/account/Agreement";

const Account = () => {
  return (
    <div className="container-center-horizontal">
      <div className="authlogin screen">
        <Container backgroundImage={accountrecoverconfirm}>
          <Routes>
            <Route path={"*"} element={<Login />} />
            <Route path={"register"} element={<Register />} />
            <Route path={"verify"} element={<Verify />} />
            <Route path={"verify-check"} element={<VerifyCheck />} />
            <Route path={"agreement"} element={<Agreement />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  background: ${(props) => `url(${props.backgroundImage})` || ""} no-repeat
    center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default Account;
