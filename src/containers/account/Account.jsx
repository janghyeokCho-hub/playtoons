import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import accountrecoverconfirm from "@IMAGES/accountrecoverconfirm.jpg";
import Login from "@COMPONENTS/auth/Login";
import Verify from "@COMPONENTS/account/Verify";
import VerifyCheck from "@COMPONENTS/account/VerifyCheck";
import Register from "@COMPONENTS/account/Register";
import Agreement from "@COMPONENTS/account/Agreement";
import Close from "@COMPONENTS/account/Close";
import Recover from "@COMPONENTS/account/Recover";
import RecoverCheck from "@COMPONENTS/account/RecoverCheck";
import RecoverConfirm from "@COMPONENTS/account/RecoverConfirm";
import UpdateEmail from "@COMPONENTS/account/UpdateEmail";
import UpdatePasswordCheck from "@COMPONENTS/account/UpdatePasswordCheck";
import UpdatePasswordConfirm from "@COMPONENTS/account/UpdatePasswordConfirm";

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
            <Route path={"close"} element={<Close />} />
            <Route path={"recover"} element={<Recover />} />
            <Route path={"recover-check"} element={<RecoverCheck />} />
            <Route path={"recover-confirm"} element={<RecoverConfirm />} />
            <Route path={"update-email"} element={<UpdateEmail />} />
            <Route
              path={"update-password-check"}
              element={<UpdatePasswordCheck />}
            />
            <Route
              path={"update-password-confirm"}
              element={<UpdatePasswordConfirm />}
            />
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
