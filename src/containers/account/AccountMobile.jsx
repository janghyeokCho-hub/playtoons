import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/pro-light-svg-icons";
import LoginMobile from "@COMPONENTS/auth/LoginMobile";
import RegisterMobile from "@COMPONENTS/account/RegisterMobile";
import VerifyCheckMobile from "@/components/account/VerifyCheckMobile";
import AgreementMobile from "@COMPONENTS/account/AgreementMobile";
import RecoverMobile from "@COMPONENTS/account/RecoverMobile";
import CloseMobile from "@COMPONENTS/account/CloseMobile";
import RecoverCheckMobile from "@COMPONENTS/account/RecoverCheckMobile";
import RecoverConfirmMobile from "@COMPONENTS/account/RecoverConfirmMobile";

const AccountMobile = () => {
  const navigate = useNavigate();
  return (
    <Container className="container-center-horizontal">
      <Header>
        <BackIconDiv onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            width={12}
            height={24}
            size="xl"
          />
        </BackIconDiv>
      </Header>

      <Routes>
        <Route path={"*"} element={<LoginMobile />} />
        <Route path={"register"} element={<RegisterMobile />} />
        <Route path={"verify-check"} element={<VerifyCheckMobile />} />
        <Route path={"agreement"} element={<AgreementMobile />} />
        <Route path={"close"} element={<CloseMobile />} />
        <Route path={"recover"} element={<RecoverMobile />} />
        <Route path={"recover-check"} element={<RecoverCheckMobile />} />
        <Route path={"recover-confirm"} element={<RecoverConfirmMobile />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 40px;
  background-color: var(--white);
  border-bottom: 1px solid rgba(221, 225, 229, 1);
  display: flex;
`;

const BackIconDiv = styled.div`
  cursor: pointer;
  margin-left: 15px;
  align-self: center;
  height: 24px;
  width: 24px;
  display: flex;
`;

export default AccountMobile;
